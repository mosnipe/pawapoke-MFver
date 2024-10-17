// 選択肢ごとのセリフを管理するオブジェクト
export const dialogs = {
    A: [
        { text: "西川さんに挨拶しなきゃ", side: "right", image: "/img/nishikawasan.gif" },
        { text: "西川さん。今まで本当にお世話になりました！", side: "left", image: "/img/handsup.gif" }, 
        { text: "お疲れ！次の会社でも頑張るダニよ", side: "right", image: "/img/nishikawasan.gif" },   
        { text: "次のステップに進む勇気をもらった気がする。", side: "left", image: "/img/smile.gif" }
    ],
    B: [
        { text: "村田さんに挨拶しなきゃ", side: "right", image: "/img/muratasan.gif" },
        { text: "村田さん！今までありがとうございました！", side: "left", image: "/img/handsup.gif" },
        { text: "よっしー、東京行ったらホテルマンやり！", side: "right", image: "/img/muratasan.gif" },
        { text: "村田さんの言葉に元気をもらった。", side: "left", image: "/img/wow.gif" }
    ],
    C: [
        { text: "西村さんに挨拶しなきゃ", side: "right", image: "/img/nishimurasan.gif" },
        { text: "西村さん。今までありがとうございました。都産技研の際は本当に支えていただいて助かりました", side: "left", image: "/img/handsup.gif" },
        { text: "お疲れさま。次の会社でも頑張ってね", side: "right", image: "/img/nishimurasan.gif" },
        { text: "西村さんの笑顔が心に残った。", side: "left", image: "/img/smile.gif" }
    ],
    D: [
        { text: "牧野さんに挨拶しなきゃ", side: "right", image: "/img/makinosan.png" },
        { text: "牧野さん、今までありがとうございました。牧野さんなしに僕のMF生活は語れません", side: "left", image: "/img/cry.gif" },
        { text: "おつ！東京にのまれるなよ。まめたのためにもちゃんと実家に帰るんやで", side: "right", image: "img/makinosan.png" },
        { text: "はい！", side: "left", image: "/img/confused.gif" }
    ],
    E: [
        { text: "宇田さんに挨拶しなきゃ", side: "right", image: "/img/udasan.gif" },
        { text: "宇田さん、今までありがとうございました。関西MSの件では凄くお世話になりました。", side: "left", image: "/img/handsup.gif" },
        { text: "サマデース。吉岡君は体力だけはあるから、その調子で頑張りや", side: "right", image: "/img/udasan.gif" },
        { text: "宇田さんの教えを胸に次へ進もうと思った。", side: "left", image: "/img/determined.gif" }
    ],
    F: [
        { text: "桑名さんに挨拶しなきゃ", side: "right", image: "/img/kuwanasan.gif" },
        { text: "みゆせるさん、今までお世話になりました！みゆせるさんは僕の憧れの先輩です", side: "left", image: "/img/handsup.gif" },
        { text: "おっつー。まぁまた東京でたいがと3人でのも！", side: "right", image: "/img/kuwanasan.gif" },
        { text: "東京の酒が上手い店を探さなきゃ", side: "left", image: "/img/smile.gif" }
    ]
};
