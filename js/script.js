// dialogs.js からセリフデータを読み込む（#1）
import { dialogs } from './dialogs.js';

$(function () {
    // メイン音楽ファイル設定（#2）
    const mainMusicCode = 'main_bgm';
    const mainMusicFile = './bgm/main.m4a';

    // 音楽ファイルをロード（#3）
    soundAdaptor.loadFile(mainMusicCode, mainMusicFile, {
        success: function (buffer, soundKeyCode, src) {
            console.log('Music loaded successfully:', src);
        },
        error: function (xmlObj, soundKeyCode, src) {
            console.log('Error loading music:', src);
        }
    });

    // 音楽再生制御変数（#4）
    let isMusicPlaying = false;
    let mainMusicSource = null;

    // 音楽コントロールボタン（#5）
    const musicControlBtn = $('#musicControlBtn');
    musicControlBtn.text('♪PLAY　※音量注意！');

    // 音楽再生/停止の制御（#6）
    musicControlBtn.on('click', function (ev) {
        ev.preventDefault();
        if (!isMusicPlaying) {
            isMusicPlaying = true;
            mainMusicSource = soundAdaptor.play(mainMusicCode);
            mainMusicSource.loop = true;            // ループ再生をON
            mainMusicSource.gain.value = 0.3;       // 音量を50%に設定
            musicControlBtn.text('×STOP');
        } else {
            isMusicPlaying = false;
            mainMusicSource.stop();                 // 音声を停止
            musicControlBtn.text('♪PLAY');
        }
    });
});

// タイプライター風にテキストを表示する関数（#7）
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

// 画像の表示/非表示処理（#8）
function setCharacterImage(elementId, imagePath) {
    const characterImage = document.getElementById(elementId);
    if (imagePath) {
        characterImage.src = imagePath;
        characterImage.style.display = "block"; // 画像を表示
    } else {
        characterImage.style.display = "none";  // 画像を非表示
    }
}

// セリフを順番に表示する関数（#9）
function displayDialogSequence(dialogSequence) {
    let currentIndex = 0;
    const textElement = document.getElementById("text");
    const textBox = document.querySelector('.text-area');
    const choicesContainer = document.getElementById("choice-container");
    const resetButton = document.getElementById("resetButton");

    // 選択肢とリセットボタンを非表示にする
    choicesContainer.style.display = 'none';
    resetButton.style.display = 'none';

    // 次のセリフを表示する関数（#10）
    function showNextDialog() {
        if (currentIndex < dialogSequence.length) {
            const { text, speaker, imagePath } = dialogSequence[currentIndex];
            textElement.innerHTML = ""; // テキストをクリア
            textBox.classList.remove('left', 'right'); // クラスをリセット
            textBox.classList.add(speaker);            // 左か右かのクラスを追加

            // 画像の表示/非表示処理
            if (speaker === 'left') {
                setCharacterImage("left-character-image", imagePath);
            } else {
                setCharacterImage("right-character-image", imagePath);
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

// 選択肢を選んだときの処理（#11）
function handleChoice(choice) {
    const dialogSequence = dialogs[choice];
    if (dialogSequence) {
        displayDialogSequence(dialogSequence);
    } else {
        console.error(`選択されたオプション '${choice}' に対応するセリフが見つかりません。`);
    }
}

// 各選択肢ボタンにイベントリスナーを追加（#12）
['nishikawa', 'murata', 'nishimura', 'makino', 'uda', 'kuwama', 'yamada', 'suzuki'].forEach(choice => {
    const button = document.getElementById(`choice-${choice}`);
    if (button) {
        button.addEventListener("click", () => handleChoice(choice));
    } else {
        console.error(`ボタン 'choice-${choice}' が見つかりません。`);
    }
});

// リセットボタンのイベントリスナーを設定（#13）
document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("choice-container").style.display = 'flex';
    document.getElementById("resetButton").style.display = 'none';
    document.getElementById("text").innerHTML = "僕もMFを卒業かあ…お世話になった皆さんに挨拶しないと";
});
