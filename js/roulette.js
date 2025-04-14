document.addEventListener("DOMContentLoaded", () => {
    const r_select = document.getElementById("r_select");
    const r_result = document.getElementById("r_result");
    const r_button = document.getElementById("r_button");
  
    let r_data = {};
  
    // JSONを読み込む
    fetch("json/aircraft.json")
      .then(response => response.json())
      .then(data => {
        r_data = data;
  
        // セレクトボックスに機種を追加
        for (const model in data) {
          const option = document.createElement("option");
          option.value = model;
          option.textContent = model;
          r_select.appendChild(option);
        }
      })
      .catch(error => {
        console.error("JSONの読み込みに失敗しました:", error);
      });
  
    // ボタン押下でルーレット実行
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
  });
  