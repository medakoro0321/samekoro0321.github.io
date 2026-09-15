// -タイピングアニメーション-

let text = "<h2 class=\"title\"> 🦈さめころのホームページへようこそ! </h2>"
let textDesc = "/* WELCOME TO SAMEKORO's HOMEPAGE. */"
let textSubtitle = "Console.WriteLine(\"There\'s a version of me at the bottom of the ocean. \n He looks peaceful — still, weightless, finally free. \n Maybe I\'ll join him someday, hoping the current carries me away from this darkened world.\");"
const target = document.getElementById("main_title");
const targetDesc = document.getElementById("main_description");
const targetSubtitle = document.getElementById("main_subtitle");
const targetSubtitleDesc = document.getElementById("main_subtitle_description");
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
                const errorChar = "NullReferenceException: Object 'self' is not found in this WORLD. \n     at Soul.Escape(World darkened_world) in /root/me.cs:line 3 \n     at Me.JoinHim() — target instance unreachable"
                targetSubtitleDesc.innerHTML = errorChar.replaceAll('\n', '<br>');
            }
            break;
    }
}

typing();
