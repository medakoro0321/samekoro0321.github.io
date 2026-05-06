// -プランクトン風アニメーション-
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
    resize(); // 最初に1回呼んでcanvasサイズを初期化
    draw();   // アニメーション開始
}

// -タイピングアニメーション-

let text = "<h2 class=\"title\"> 🦈さめころのホームページへようこそ! </h2>"
let textDesc = "/* WELCOME TO SAMEKORO's HOMEPAGE. */"
/*
 * 海の底に、もう一人の私がいる。
 * 穏やかで、静かで、重さもなく、やっと自由になれた姿で。
 * いつかそこへ行けたなら——
 * 流れがこの真っ黒な世界から、逃してくれるように。
 */
let textSubtitle = "Console.WriteLine(\"There\'s a version of me at the bottom of the ocean. \n He looks peaceful — still, weightless, finally free. \n Maybe I\'ll join him someday, hoping the current carries me away from this darkened world.\");"
const target = document.getElementById("main_title");
const targetDesc = document.getElementById("main_description");
const targetSubtitle = document.getElementById("main_subtitle");
let i = 0;
let status = 0;

function typing() {
    switch (status) {
        case 0:
            // 余白のため+5
            if (i < text.length + 5) {
                target.textContent += text.charAt(i);
                target.style.fontSize = "1em";
                i++;
                setTimeout(typing, 60);
            } else {
                status++;
                target.textContent = "🦈さめころのホームページへようこそ!"
                target.style.fontSize = "1.5em";

                i = 0;
                setTimeout(typing, 60);
            }
            break;
        case 1:
            if (i < textDesc.length + 5) {
                targetDesc.textContent += textDesc.charAt(i);
                i++;
                setTimeout(typing, 60);
            } else {
                status++;
                targetDesc.textContent = "WELCOME TO SAMEKORO's HOMEPAGE."
                targetDesc.style.color = "darkgray"
                i = 0;
                setTimeout(typing, 30);
            }
            break;
        case 2:
            if (i < textSubtitle.length + 5) {
                const char = textSubtitle.charAt(i);
                targetSubtitle.innerHTML += char === '\n' ? '<br>' : char;
                i++;
                setTimeout(typing, 30);
            } else {
                const finallychar = "There\'s a version of me at the bottom of the ocean. \n He looks peaceful — still, weightless, finally free. \n <span id='error'><span style='color: darkgray'>Maybe I\'ll join him someday, hoping the current carries me away from this darkened world.</span></span>"
                targetSubtitle.innerHTML = finallychar.replaceAll('\n', '<br>');
            }
            break;
    }
}

function addTag() {

}

typing();
generatePlankton();
