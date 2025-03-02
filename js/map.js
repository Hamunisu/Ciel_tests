document.addEventListener('DOMContentLoaded', (event) => {
  // 地図の初期化
  const map = L.map('map', {
    center: [35.682839, 139.759455], // 日本の中心に設定
    zoom: 5,
    dragging: true,       // ドラッグ可能にする
    scrollWheelZoom: true // スクロールホイールズームを有効にする
  });

  // OpenStreetMapタイルレイヤーの追加
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // 現在のピンを保持するための変数
  let currentMarkers = [];

  // 検索ボタンのクリックイベントリスナーの追加
  document.getElementById('searchButton').addEventListener('click', searchLocations);

  // エンターキーで検索を実行するイベントリスナーの追加
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchLocations();
    }
  });

  // ユーザーのクリックイベントを無効化
  map.on('click', function(e) {
    e.preventDefault();
  });

  // 検索を実行する関数
  function searchLocations() {
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;

    // 既存のピンを削除
    currentMarkers.forEach(marker => map.removeLayer(marker));
    currentMarkers = [];

    // 出発地のジオコーディング
    if (departure) {
      geocodeLocation(departure, 'D', map);
    }

    // 到着地のジオコーディング
    if (arrival) {
      geocodeLocation(arrival, 'A', map);
    }
  }

  // ジオコーディングを実行してマーカーを立てる関数
  function geocodeLocation(location, label, map) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const lat = data[0].lat;
          const lon = data[0].lon;

          // カスタムアイコンの設定
          const iconOptions = {
            iconUrl: label === 'D' ? 'image/departure.png' : 'image/arrival.png', // カスタムアイコンのパス
            iconSize: [40, 40], // アイコンのサイズ（1:1の比率）
            iconAnchor: [20, 40], // アイコンのアンカー（ポイント）
            popupAnchor: [0, -40] // ポップアップのアンカー（ポイント）
          };

          const customIcon = L.icon(iconOptions);

          // マーカーの追加
          const marker = L.marker([lat, lon], { icon: customIcon })
            .addTo(map)
            .bindPopup(`${label === 'D' ? 'Departure' : 'Arrival'}: ${location}`)
            .openPopup();

          // 現在のピンに追加
          currentMarkers.push(marker);
        } else {
          alert(`Location not found: ${location}`);
        }
      })
      .catch(error => {
        console.error('Geocoding error:', error);
        alert('Geocoding error. Please try again.');
      });
  }
});
