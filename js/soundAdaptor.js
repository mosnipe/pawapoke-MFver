var soundAdaptor = (function () {
    // Web Audio APIのコンテキストを保持
    var _context = null;
    // 読み込んだ音声バッファーを保持するオブジェクト
    var _buffers = {};

    // Web Audio APIの初期化
    function _initialize() {
        _context = new (window.AudioContext || window.webkitAudioContext)();
    }

    // iOSデバイス向けの無音再生（ユーザーの初回タップで音声再生を有効化するため）
    function _silentBeep() {
        var context = _context;
        var buf = context.createBuffer(1, 1, 22050);
        var src = context.createBufferSource();
        src.buffer = buf;
        src.connect(context.destination);
        src.start(0);
    }

    // 指定の音声バッファーを再生する
    function _playBeep(buffer) {
        var context = _context;
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
        // 再生中の音源オブジェクトを返却（停止制御用）
        return source;
    }

    // 音声ファイルを非同期で読み込み、成功時にバッファーを設定する
    function _loadFile(soundKeyCode, src, callback) {
        var xml = new XMLHttpRequest();
        xml.open('GET', src, true);
        xml.responseType = 'arraybuffer';

        xml.onload = function () {
            if (xml.status === 200) {
                // Web Audio API用のデータに変換
                _context.decodeAudioData(xml.response, function (buffer) {
                    _buffers[soundKeyCode] = buffer; // バッファーに登録
                    if (callback && typeof callback.success === 'function') {
                        callback.success(buffer, soundKeyCode, src);
                    }
                }, function (error) {
                    console.error('音声デコードエラー:', error);
                    if (callback && typeof callback.error === 'function') {
                        callback.error(xml, soundKeyCode, src);
                    }
                });
            } else {
                if (callback && typeof callback.error === 'function') {
                    callback.error(xml, soundKeyCode, src);
                }
            }
        };

        xml.onerror = function () {
            if (callback && typeof callback.error === 'function') {
                callback.error(xml, soundKeyCode, src);
            }
        };

        xml.send();
    }

    // 初期化実行
    _initialize();

    // 公開メソッド
    return {
        // 無音再生でiOSの音声再生を有効化
        silentBeep: function () {
            _silentBeep();
        },
        // 音声を再生する
        play: function (soundKeyCode) {
            var source = null;
            if (_buffers[soundKeyCode]) {
                source = _playBeep(_buffers[soundKeyCode]);
            } else {
                console.error('SoundAdaptor Error: Sound not found for key', soundKeyCode);
            }
            return source;
        },
        // 音声ファイルをロードする
        loadFile: function (soundKeyCode, src, callback) {
            _loadFile(soundKeyCode, src, callback);
        }
    };
})();
