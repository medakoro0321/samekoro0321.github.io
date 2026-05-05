function generatePlankton() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
    `;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let Planktons = [];
    let t = 0;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createPlankton() {
        if (Math.random() > 0.015) return;

        Planktons.push({
            x: Math.random() * canvas.width,
            y: canvas.height,
            len: Math.random() * 10 + 5, // 尻尾の長さ 5~15px
            speed: Math.random() * 2 + 1, // 速さ 1~3px/フレーム
            opacity: 1,
            angle: -Math.PI / 2,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // 背景をクリア
        t += 1;

        createPlankton();
        Planktons = Planktons.filter(ss => ss.opacity > 0); // 消えたプランクトンを掃除

        // 線を引く (頭から尻尾まで)
        Planktons.forEach(ss => {
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y); // 頭 (明るい側)
            ctx.lineTo(
                ss.x - Math.cos(ss.angle) * ss.len, // 尻尾のX
                ss.y - Math.sin(ss.angle) * ss.len // 尻尾のY
            );

            // 頭>尻尾でグラデーション (白→透明)
            const grad = ctx.createLinearGradient(
                ss.x, ss.y,
                ss.x - Math.cos(ss.angle) * ss.len, // グラデ開始 (頭)
                ss.y - Math.sin(ss.angle) * ss.len // グラデ終了 (尻尾)
            );
            grad.addColorStop(0, `rgba(255, 255, 255, 0.5)`);  // 頭: 白
            grad.addColorStop(1, 'transparent'); // 尻尾: 透明
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ss.x += Math.cos(ss.angle) * ss.speed; // x座標を更新
            ss.y += Math.sin(ss.angle) * ss.speed; // y座標を更新
        });

        requestAnimationFrame(draw); // 次フレームでdrawを呼び出す
    }

    window.addEventListener('resize', resize); // 画面サイズ変更時にリサイズ
    resize(); // 最初に1回呼んでcanvasサイズと星を初期化
    draw();   // アニメーション開始
}

let text = "<h2 class=\"title\"> 🦈さめころのホームページへようこそ! </h2>"
let textDesc = "/* WELCOME TO SAMEKORO's HOMEPAGE. */"
const target = document.getElementById("main_title");
const targetDesc = document.getElementById("main_description");
let i = 0;
let n = 0;
let isDescription = false;
let timeout = 60

function typing() {
    if (!isDescription) {
        if (i < text.length) {
            target.textContent += text.charAt(i);
            i++;
            setTimeout(typing, timeout);
        } else {
            isDescription = true;
            setTimeout(typing, timeout);
        }
    } else {
        if (n < textDesc.length) {
            targetDesc.textContent += textDesc.charAt(n);
            n++;
            setTimeout(typing, timeout);
        }
    }
    console.log(i,n , isDescription);
}

typing();
generatePlankton();
