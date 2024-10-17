// dialogs.js からセリフを読み込む
import { dialogs } from './dialogs.js';

// タイプライター風にテキストを表示する関数
function typeWriter(text, element, callback, speed = 25) {
    let index = 0;
    element.innerHTML = ""; // テキストをクリア

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index); // 1文字ずつ表示
            index++;
            setTimeout(type, speed);
        } else {
            if (callback) callback(); // テキストの表示が終わったらコールバックを呼び出す
        }
    }

    type();
}

// 選択肢を選んだ後にテキストを順に表示する関数
function displayDialogSequence(dialogSequence) {
    let currentIndex = 0;
    const textElement = document.getElementById("text");
    const textarea = document.querySelector('.textarea');
    const choices = document.getElementById("choices");
    const resetButton = document.getElementById("resetButton");

    // 選択肢を非表示にし、リセットボタンを非表示に
    choices.style.display = 'none';
    resetButton.style.display = 'none';

    function showNextDialog() {
        if (currentIndex < dialogSequence.length) {
            const dialog = dialogSequence[currentIndex];
            textElement.innerHTML = ""; // テキストをクリア
            textarea.classList.remove('left', 'right'); // クラスをリセット
            textarea.classList.add(dialog.side); // 左か右かのクラスを追加

            // キャラクター画像を dialogs.js から指定
            if (dialog.side === 'left') {
                document.getElementById('left-character').src = dialog.image;
            } else {
                document.getElementById('right-character').src = dialog.image;
            }

            // キャラクターのセリフをタイプライター風に表示
            typeWriter(dialog.text, textElement, () => {
                currentIndex++;
                setTimeout(showNextDialog, 1000); // 次のセリフを1秒後に表示
            });
        } else {
            // テキストの表示が完了したら「一覧に戻る」ボタンを表示
            resetButton.style.display = 'block';
        }
    }

    showNextDialog(); // 最初のセリフを表示
}

// 選択肢を選んだ後の処理
function handleChoice(choice) {
    const dialogSequence = dialogs[choice]; // 選択された選択肢のセリフを取得
    if (dialogSequence) {
        displayDialogSequence(dialogSequence);
    } else {
        console.error(`選択されたオプション '${choice}' に対応するセリフが見つかりません。`);
    }
}

// ボタンのクリックイベントリスナーを追加
document.querySelector("#A").addEventListener("click", () => handleChoice('A'));
document.querySelector("#B").addEventListener("click", () => handleChoice('B'));
document.querySelector("#C").addEventListener("click", () => handleChoice('C'));
document.querySelector("#D").addEventListener("click", () => handleChoice('D'));
document.querySelector("#E").addEventListener("click", () => handleChoice('E'));
document.querySelector("#F").addEventListener("click", () => handleChoice('F'));

// リセットボタンのイベントリスナー
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("choices").style.display = 'flex';
    document.getElementById("resetButton").style.display = 'none';
    document.getElementById("text").innerHTML = "僕もMFを卒業かあ…お世話になった皆さんに挨拶しないと";
});
