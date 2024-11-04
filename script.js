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
    const choicesContainer = document.getElementById("choices");
    const resetButton = document.getElementById("reset-button");

    // 選択肢とリセットボタンを非表示にする
    choicesContainer.style.display = 'none';
    resetButton.style.display = 'none';

    // 次のセリフを表示する関数
    function showNextDialog() {
        if (currentIndex < dialogSequence.length) {
            const { text, side, image } = dialogSequence[currentIndex];
            textElement.innerHTML = ""; // テキストをクリア
            textBox.className = `text-area ${side}`; // クラスを動的に設定

            // キャラクター画像を設定
            const characterElement = document.getElementById(`${side}-character-image`);
            characterElement.src = image;

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
['A', 'B', 'C', 'D', 'E', 'F'].forEach(choice => {
    document.getElementById(`choice-${choice}`).addEventListener("click", () => handleChoice(choice));
});

// リセットボタンのイベントリスナーを設定
document.getElementById("reset-button").addEventListener("click", () => {
    document.getElementById("choices").style.display = 'flex';
    document.getElementById("reset-button").style.display = 'none';
    document.getElementById("text").innerHTML = "僕もMFを卒業かあ…お世話になった皆さんに挨拶しないと";
});
