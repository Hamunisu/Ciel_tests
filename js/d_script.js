//  LOADING
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



// ---ハンバーガーメニュー---

// 検索関連
function handleEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // デフォルトのエンターキー動作を防ぐ
    searchFlights(); // 検索関数を呼び出す
  }
}


  function clearAllInputHistory() {
  document.getElementById('departure').value = ''; // Departureフィールドの値をクリア
  document.getElementById('arrival').value = ''; // Arrivalフィールドの値をクリア
}

// ---検索関連---


  // フライトプラン作成
  async function fetchFlights(departureAirport) {
    let filePath;
    // 出発空港に基づいて参照するファイルを選択
    departureAirport = departureAirport.toLowerCase(); // 入力値を小文字に変換
    if (['rjtt', 'hnd','羽田'].includes(departureAirport)) {
      filePath = 'd_fs/d_rjtt.json';
    } else if (['rjoo','itm','伊丹'].includes(departureAirport)) {
      filePath = 'd_fs/d_rjoo.json';
    } else {
       // 全部のファイル
      filePath = 'd_allflights.json';
    }
  
    // 選択されたファイルを読み込む
    const response = await fetch(filePath);

  // JSONデータを解析する
    const data = await response.json(); 
    
    // flights配列を返す
    return data.flights; 
  }
  
  async function searchFlights() {
    // 出発空港の値を小文字に変換
    const departureInput = document.getElementById('departure').value.toLowerCase(); 
     // 到着空港の値を小文字に変換
    const arrivalInput = document.getElementById('arrival').value.toLowerCase();
     // 出発空港に基づいてファイルを読み込む
    const flights = await fetchFlights(departureInput);
     // 結果表示のためのディビジョンを取得
    const resultDiv = document.getElementById('result');
  
    // 入力された到着空港に一致する便を検索（大文字と小文字を区別せずに比較）
    const matchedFlight = flights.find(flight =>
      flight.arrival.map(a => a.toLowerCase()).includes(arrivalInput)
    );
  
    if (matchedFlight) {
      // すべてのフライト番号を取得
      const flightNumbers = matchedFlight.flightNumber.split('\n');
       //航空会社コード
      const airline = "CJA";
       // 出発地を大文字に変換
      const orig = departureInput.toUpperCase();
       // 到着地を大文字に変換
      const dest = arrivalInput.toUpperCase();
      // result用
      let resultHtml = `フライトが見つかりました：<br>`;
      flightNumbers.forEach(flightNumber => {
        
        // Simbriefリンク
        const simbriefURL = `https://dispatch.simbrief.com/options/custom?airline=${airline}&fltnum=${flightNumber}&orig=${orig}&dest=${dest}`;
        
        // ボタン
        resultHtml += `<a href="${simbriefURL}" target="_blank" class="custom-button">CJA${flightNumber}便のフライト</a><br>`;
      });
    // 結果を表示&SimBriefリンクを追加
      resultDiv.innerHTML = resultHtml; 
    } 
    else {
      // 便名設定がないもの
      resultDiv.textContent = '一致する便が見つかりませんでした。'; 
    }
  }
  
  // ---フライト検索---