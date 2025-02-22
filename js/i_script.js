// LOADING
function loadingAnimation() {
    window.addEventListener('load', function() {
        //ページ読み込み終了で非表示
        document.querySelector(".loading").style.display = "none";
    });
    document.addEventListener("DOMContentLoaded", function() {
        //5秒経過で強制的に非表示
        setTimeout(function(){ document.querySelector(".loading").style.display = "none"}, 5000);
    });
  }
  loadingAnimation();
// /LOADING

 // ハンバーガーメニューの切り替え
 function toggleMenu() {
  var rightBox = document.querySelector('.right-box');
  var menuIcon = document.querySelector('.menu-icon img');
  rightBox.classList.toggle('active');

  // アイコンの切り替え
  if (rightBox.classList.contains('active')) {
      menuIcon.src = 'image/close.png';
  } else {
      menuIcon.src = 'image/menu.png';
  }
}


// 入力履歴のクリア
function clearAllInputHistory() {
  document.getElementById('departure').value = ''; // Departureフィールドの値をクリア
  document.getElementById('arrival').value = ''; // Arrivalフィールドの値をクリア
}

// フライトプラン作成
async function fetchFlights(departureAirport) {
  let filePath;
  departureAirport = departureAirport.toLowerCase();
  if (['rjtt', 'hnd', '羽田'].includes(departureAirport)) {
      filePath = '../i_fs/i_rjtt.json'; 
  } else if (['rjbb', 'kix', '関西'].includes(departureAirport)) {
      filePath = '../i_fs/i_rjbb.json'; 
  } else {
      filePath = '../i_fs/i_allflights.json'; 
  }

  // パスのログ
  console.log("Fetching from:", filePath); 

  const response = await fetch(filePath);
  const data = await response.json();
  // 取得したデータのログを追加
  console.log("取得したフライト:", data.flights); 
  return data.flights; 
}

// フライト検索
async function searchFlights() {
  const departureInput = document.getElementById('departure').value.toLowerCase(); 
  const arrivalInput = document.getElementById('arrival').value.toLowerCase();
  console.log("出発地:", departureInput, "到着地:", arrivalInput);

  const flights = await fetchFlights(departureInput);
  const resultDiv = document.getElementById('result');

  if (!flights) {
      resultDiv.textContent = 'フライトデータの取得に失敗しました。';
      return;
  }

  const matchedFlight = flights.find(flight =>
      flight.arrival.map(a => a.toLowerCase()).includes(arrivalInput)
  );

  if (matchedFlight) {
      const flightNumbers = matchedFlight.flightNumber.split('\n');
      const airline = "CJA";
      const orig = departureInput.toUpperCase();
      const dest = arrivalInput.toUpperCase();
      let resultHtml = `フライトが見つかりました：<br>`;
      flightNumbers.forEach(flightNumber => {
          const simbriefURL = `https://dispatch.simbrief.com/options/custom?airline=${airline}&fltnum=${flightNumber}&orig=${orig}&dest=${dest}`;
          resultHtml += `<a href="${simbriefURL}" target="_blank" class="custom-button">CJA${flightNumber}便のフライト</a><br>`;
      });
      resultDiv.innerHTML = resultHtml; 
  } else {
      resultDiv.textContent = '一致する便が見つかりませんでした。'; 
  }
}

// Enterキーを押した際に検索を実行する関数
function handleEnterKey(event) {
  if (event.key === 'Enter') {
      searchFlights();
  }
}



    // ---フライト検索---