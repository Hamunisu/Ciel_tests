document.addEventListener("DOMContentLoaded", () => {
  // MSFSセレクトボックスやボタン
  const r_select = document.getElementById("r_select");
  const r_result = document.getElementById("r_result");
  const r_button = document.getElementById("r_button");

  // X-Planeセレクトボックスやボタン
  const r_x_select = document.getElementById("r_x_select");
  const r_x_result = document.getElementById("r_x_result");
  const r_x_button = document.getElementById("r_x_button");

  let r_data = {};  // MSFSのデータ
  let r_x_data = {};  // X-Planeのデータ

  // セレクトボックスに機種を追加する関数
  const loadAircraftData = (fileName, isXPlane = false) => {
    fetch(fileName)
      .then(response => response.json())
      .then(data => {
        if (isXPlane) {
          r_x_data = data;
          updateSelectBox(r_x_select, r_x_data);
        } else {
          r_data = data;
          updateSelectBox(r_select, r_data);
        }
      })
      .catch(error => {
        console.error("JSONの読み込みに失敗しました:", error);
      });
  };

  // セレクトボックスを更新する関数
  const updateSelectBox = (selectBox, data) => {
    selectBox.innerHTML = '';  // セレクトボックスをリセット
    for (const model in data) {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      selectBox.appendChild(option);
    }
  };

  // 初期表示でMSFSのデータを読み込む
  loadAircraftData("json/msfs_aircraft.json");

  // MSFSタブ切り替え
  document.getElementById('msfsBtn').addEventListener('click', () => {
    document.getElementById('msfsContent').style.display = 'block';  // MSFSを表示
    document.getElementById('xplaneContent').style.display = 'none';  // X-Planeを非表示
    loadAircraftData("json/msfs_aircraft.json");
  });

  // X-Planeタブ切り替え
  document.getElementById('xplaneBtn').addEventListener('click', () => {
    document.getElementById('xplaneContent').style.display = 'block';  // X-Planeを表示
    document.getElementById('msfsContent').style.display = 'none';  // MSFSを非表示
    loadAircraftData("json/xplane_aircraft.json", true);
  });

  // MSFS ルーレット実行
  r_button.addEventListener("click", () => {
    const selectedModel = r_select.value;

    if (selectedModel && r_data[selectedModel]) {
      const aircrafts = r_data[selectedModel];
      const randomIndex = Math.floor(Math.random() * aircrafts.length);
      const result = aircrafts[randomIndex];
      r_result.textContent = `機体番号: ${result}`;
    } else {
      r_result.textContent = "機種を選択してください。";
    }
  });

  // X-Plane ルーレット実行
  r_x_button.addEventListener("click", () => {
    const selectedModel = r_x_select.value;

    if (selectedModel && r_x_data[selectedModel]) {
      const aircrafts = r_x_data[selectedModel];
      const randomIndex = Math.floor(Math.random() * aircrafts.length);
      const result = aircrafts[randomIndex];
      r_x_result.textContent = `機体番号: ${result}`;
    } else {
      r_x_result.textContent = "機種を選択してください。";
    }
  });
});
