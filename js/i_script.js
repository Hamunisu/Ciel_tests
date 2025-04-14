// JSONファイル読み込み
const fetchJSON = async (file) => {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error('JSONファイルの読み込みに失敗しました');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return null;
    }
  };
  
  // 入力文字列を正規化（前後の空白削除、NFKC正規化、大文字化）
  const normalizeString = (str) => str.trim().normalize('NFKC').toUpperCase();
  
  // 空港の入力（空港名またはICAOコード）からICAOコードを取得する関数
  const getIcaoFromInput = (input, airports) => {
    const norm = normalizeString(input);
    // 空港情報内で、ICAOコードまたは空港名（単一文字列、または配列）のいずれかに一致すればOK
    const airport = airports.find(a =>
      normalizeString(a.icao) === norm ||
      normalizeString(a.name) === norm ||
      (Array.isArray(a.name) && a.name.some(n => normalizeString(n) === norm))
    );
    return airport ? airport.icao : null;
  };
  
  // ICAOコードの妥当性をチェック
  const isIcaoValid = (departure, arrival, airports) => {
    const depValid = airports.some(a => normalizeString(a.icao) === normalizeString(departure));
    const arrValid = airports.some(a => normalizeString(a.icao) === normalizeString(arrival));
    return depValid && arrValid;
  };
  
  // route.json のデータから、出発・到着のICAOコードペアで便番号を検索
  const searchFlight = (depCode, arrCode, routeData) => {
    const key = `${depCode} ${arrCode}`;
    return routeData[key] ? routeData[key].flightNumber : null;
  };
  
  // 検索ボタンのイベント処理
document.getElementById("i_search").addEventListener("click", async () => {
    const depInput = document.getElementById("i_departure").value;
    const arrInput = document.getElementById("i_arrival").value;
    const resultDiv = document.getElementById("i_result");
  
    const airportsJSON = await fetchJSON('../i_fs/airports.json');
    const routeData = await fetchJSON('../i_fs/route.json');
    if (!airportsJSON || !routeData) {
      resultDiv.innerText = "JSONファイルの読み込みに失敗しました";
      return;
    }
    const airports = airportsJSON.airports;
  
    // 入力からICAOコードを取得（入力が既にICAOでも空港名でもOK）
    const depCode = getIcaoFromInput(depInput, airports);
    const arrCode = getIcaoFromInput(arrInput, airports);
  
    // 出発地と到着地両方に「RJ」が含まれている場合、国内線で検索するように表示
    if (depInput.includes("RJ") && arrInput.includes("RJ")) {
      resultDiv.innerHTML = "<p class='english'>国内線で検索してください</p>";
      return;  // 国内線で検索する場合はここで処理終了
    }
  
    if (!depCode || !arrCode) {
      resultDiv.innerText = "入力された空港が見つかりません";
      return;
    }
  
    if (!isIcaoValid(depCode, arrCode, airports)) {
      resultDiv.innerText = "入力された空港コードに誤りがあります";
      return;
    }
  
    const flightNumber = searchFlight(depCode, arrCode, routeData);
    const airline = "CJA";
    const simbriefURL = `https://dispatch.simbrief.com/options/custom?airline=${airline}&fltnum=${flightNumber}&orig=${depCode}&dest=${arrCode}`;
    
    if (flightNumber) {
      resultDiv.innerHTML = `<a href="${simbriefURL}" target="_blank" class="simbrief-link english japanese">${airline}${flightNumber}便のフライト</a>`;
    } else {
      resultDiv.innerHTML = `<a href="${simbriefURL}" target="_blank" class="simbrief-link english japanese">臨時便のフライト</a>`;
    }
  });
  
  // 入力フィールド：大文字化＆Enterキー対応
  ["i_departure", "i_arrival"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", e => { e.target.value = e.target.value.toUpperCase(); });
    input.addEventListener("keydown", e => { if (e.key === "Enter") document.getElementById("i_search").click(); });
  });  