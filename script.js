// dialogs.js からセリフデータを読み込む
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
        } else if (callback) {
            callback(); // テキストの表示が終わったらコールバックを呼び出す
        }
    }

    type();
}

// セリフを順番に表示する関数
function displayDialogSequence(dialogSequence) {
    let currentIndex = 0;
    const textElement = document.getElementById("text");
    const textBox = document.querySelector('.text-area');
    const choicesContainer = document.getElementById("choice-container");
    const resetButton = document.getElementById("resetButton");

    // 選択肢とリセットボタンを非表示にする
    choicesContainer.style.display = 'none';
    resetButton.style.display = 'none';

    // 次のセリフを表示する関数
    function showNextDialog() {
        if (currentIndex < dialogSequence.length) {
            const { text, speaker, imagePath } = dialogSequence[currentIndex];
            textElement.innerHTML = ""; // テキストをクリア
            textBox.classList.remove('left', 'right'); // クラスをリセット
            textBox.classList.add(speaker); // 左か右かのクラスを追加

            // キャラクター画像を設定
            if (speaker === 'left') {
                document.getElementById('left-character-image').src = imagePath;
            } else {
                document.getElementById('right-character-image').src = imagePath;
            }

            // タイプライター風にセリフを表示
            typeWriter(text, textElement, () => {
                currentIndex++;
                setTimeout(showNextDialog, 1000); // 次のセリフを1秒後に表示
            });
        } else {
            // 全てのセリフが表示されたらリセットボタンを表示
            resetButton.style.display = 'block';
        }
    }

    showNextDialog();
}

// 選択肢を選んだときの処理
function handleChoice(choice) {
    const dialogSequence = dialogs[choice];
    if (dialogSequence) {
        displayDialogSequence(dialogSequence);
    } else {
        console.error(`選択されたオプション '${choice}' に対応するセリフが見つかりません。`);
    }
}

// 各選択肢ボタンにイベントリスナーを追加
['nishikawa', 'murata', 'nishimura', 'makino', 'uda', 'kuwama'].forEach(choice => {
    const button = document.getElementById(`choice-${choice}`);
    if (button) {
        button.addEventListener("click", () => handleChoice(choice));
    } else {
        console.error(`ボタン 'choice-${choice}' が見つかりません。`);
    }
});

// リセットボタンのイベントリスナーを設定
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("choice-container").style.display = 'flex';
    document.getElementById("resetButton").style.display = 'none';
    document.getElementById("text").innerHTML = "僕もMFを卒業かあ…お世話になった皆さんに挨拶しないと";
});

// BGMの初期設定
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    if (bgm) {
        bgm.volume = 0.5; // 音量を50%に設定
    } else {
        console.error("BGM要素が見つかりません。");
    }
});

// ポップアップ要素とボタンを取得
const popup = document.getElementById("popup");
const closePopupButton = document.getElementById("closePopup");

// ページ読み込み時にポップアップを表示
window.addEventListener("DOMContentLoaded", () => {
    popup.classList.add("show");
});

// 閉じるボタンがクリックされたときにポップアップを非表示にする
closePopupButton.addEventListener("click", () => {
    popup.classList.remove("show");
});
