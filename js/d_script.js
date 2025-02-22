// ハンバーガーメニューの切り替え
function toggleMenu() {
  var rightBox = document.querySelector('.right-box');
  var menuIcon = document.querySelector('.menu-icon img');
  var overlay = document.getElementById('overlay');

  rightBox.classList.toggle('active');
  overlay.classList.toggle('visible');

  // アイコンの切り替え
  if (rightBox.classList.contains('active')) {
      menuIcon.src = 'image/close.png';
  } else {
      menuIcon.src = 'image/menu.png';
  }
}

function closeMenu() {
  var rightBox = document.querySelector('.right-box');
  var menuIcon = document.querySelector('.menu-icon img');
  var overlay = document.getElementById('overlay');

  rightBox.classList.remove('active');
  overlay.classList.remove('visible');
  menuIcon.src = 'image/menu.png';
}

// ---/ハンバーガーメニュー---

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
    } 
    else if (['rjcw','wkj','稚内'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcw.json';
    } 
    else if (['rjer','ris','利尻'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjer.json';
    } 
    else if (['rjcr','rbj','礼文'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcr.json';
    } 
    else if (['rjcm','mmb','女満別'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcm.json';
    } 
    else if (['rjck','kuh','釧路'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjck.json';
    } 
    else if (['rjcb','obo','帯広'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcb.json';
    } 
    else if (['rjec','akj','旭川'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjec.json';
    } 
    else if (['rjco','okd','丘珠'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjco.json';
    } 
    else if (['rjcc','cts','新千歳'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcc.json';
    }     
    else if (['rjch','hkd','函館'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjch.json';
    } 
    else if (['rjeo','oir','奥尻'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjeo.json';
    } 
    else if (['rjcn','shb','中標津'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjcn.json';
    } 
    else if (['rjeb','meb','紋別'].includes(departureAirport)) {
      filePath = 'd_fs/hk/d_rjeb.json';
    } 
    // /北海道
    
    //東北
    // 青森
    else if (['rjsa','aoj','青森'].includes(departureAirport)) {
      filePath = 'd_fs/ao/d_rjsa.json';
    } 
    else if (['rjsm','msj','三沢'].includes(departureAirport)) {
      filePath = 'd_fs/ao/d_rjsm.json';
    } 
    // /青森












    else {
       // 全部のファイル
      filePath = 'd_allflights.json';
    }
  // /ファイル参照





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