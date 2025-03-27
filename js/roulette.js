const wheelCanvas = document.getElementById('wheel');
const ctx = wheelCanvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const resultDiv = document.getElementById('result');

// 選択肢のリスト
const options = ['選択肢1', '選択肢2', '選択肢3', '選択肢4', '選択肢5'];

// ルーレットの設定
const numOptions = options.length;
const anglePerOption = 2 * Math.PI / numOptions;
const wheelRadius = 200;
const spinDuration = 3000; // 回転時間（ミリ秒）
let spinning = false;
let currentAngle = 0;
let spinAngle = 0;

// ルーレットを描画する関数
function drawWheel() {
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    ctx.translate(wheelRadius, wheelRadius);

    for (let i = 0; i < numOptions; i++) {
        const startAngle = i * anglePerOption;
        const endAngle = (i + 1) * anglePerOption;

        ctx.beginPath();
        ctx.arc(0, 0, wheelRadius, startAngle, endAngle, false);
        ctx.lineTo(0, 0);
        ctx.fillStyle = i % 2 === 0 ? '#f0f0f0' : '#c0c0c0'; // 色を交互に
        ctx.fill();
        ctx.stroke();

        // テキストを描画
        ctx.save();
        ctx.rotate(startAngle + anglePerOption / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText(options[i], wheelRadius - 50, 0);
        ctx.restore();
    }

    ctx.resetTransform();
}

// ルーレットを回す関数
function spinWheel() {
    if (spinning) return;
    spinning = true;
    
    const randomSpin = Math.random() * 2 * Math.PI + Math.PI * 2; // ランダムな回転角度

    // 回転アニメーション
    const startTime = Date.now();
    function animate() {
        const elapsed = Date.now() - startTime;
        if (elapsed < spinDuration) {
            const progress = elapsed / spinDuration;
            currentAngle = spinAngle * progress + randomSpin * (1 - progress);
            drawWheel();
            requestAnimationFrame(animate);
        } else {
            currentAngle = randomSpin;
            drawWheel();
            const resultIndex = Math.floor(((currentAngle % (2 * Math.PI)) / anglePerOption + numOptions) % numOptions);
            resultDiv.textContent = `結果: ${options[resultIndex]}`;
            spinning = false;
        }
    }
    animate();
}

// 初期描画
drawWheel();

// ボタンがクリックされた時にルーレットを回す
spinBtn.addEventListener('click', spinWheel);
