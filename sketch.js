let words = [
  "机","椅子","時計","窓","扉","棚","紙","鉛筆","消しゴム",
  "鞄","傘","鍵","財布","靴","帽子","眼鏡","手袋","皿",
  "コップ","箸","スプーン","タオル","毛布","枕","布団",
  "洗濯機","冷蔵庫","電球","カーテン","鏡","本","雑誌",
  "駅","学校","病院","図書館","公園","交差点","橋","階段",
  "廊下","教室","屋上","玄関","庭","商店街","駐車場",
  "ベンチ","歩道","改札","信号","郵便局",
  "パン","米","水","牛乳","紅茶","珈琲","林檎","みかん",
  "卵","砂糖","塩","飴","菓子","スープ","チーズ",
  "雨","風","雲","雪","川","海","森","山","花",
  "草","葉","石","砂","月","星","朝焼け","夕焼け",
  "木漏れ日","霧","波","木陰",
  "猫","犬","鳥","魚","蝶","蜂","狐","鹿","鯨",
  "蛙","雀","亀","兎","人間","人体",
  "朝","昼","夜","昨日","明日","記憶","音","影",
  "沈黙","気配","余韻","夢","光","匂い","爆発",
  "引き出し","定規","鋏","封筒","切手","ノート","万年筆",
  "充電器","写真","箱","紐","缶","瓶","レシート","小銭",
  "鍵穴","爪","襟","袖","靴紐","ボタン","コート","地図","世界",
  "路地","横断歩道","高架","踏切","電柱","看板","商店",
  "バス停","ホーム","地下道","駅車場","坂道","水路",
  "屋根","煙突","非常口","窓辺","庭園","市場","工場",
  "自転車","列車","バス","船","飛行機","トラック","エレベーター","エスカレーター",
  "ジャム","蜂蜜","林檎","葡萄","柚子","珈琲豆","湯気","パン屑","氷","果実","飴玉","麦","茶葉",
  "露","朝霧","潮","小川","滝","岬","入江","丘","野原","木立","草原","土","苔","種","枝","根","花弁",
  "木陰","雨粒","水面","波紋","夕立","水たまり","天の川","流れ星","銀河",
  "灯","木漏れ日","残響","反響","物音","歌声","囁き","雑音","足音","鐘","旋律","静寂","沈黙","余韻",
  "朝","昼","夕方","真夜中","黎明","黄昏","昨日","今日","明日","季節","春","夏","秋","冬",
  "温度","匂い","香り","感触","気配","視線","呼吸","鼓動","眠気","疲労","空腹","微熱",
  "日記","写真","記録","手紙","落書き","伝言","名前","記憶","回想","痕跡","面影","余白",
  "夢","希望","孤独","幸福","不安","秘密","約束","憧れ","偶然","運命","旅","境界","距離","出会い",
  "別れ","沈黙","時間","物語","静謐","幽玄","彼方","久遠","深淵","輪廻","祈り","残夢","神秘","畏敬",
  "微光","余光","常夜灯","深海","星屑","月影","島","手","足","ドラゴン","老人","マグマ","翼","空","星雲",
  "明るい","暗い","白","黒","赤","青","大きい","小さい","高い","低い","遠い","近い",
  "古い","新しい","若い","淡い","深い","浅い","薄い","厚い","軽い","重い","丸い","細い",
  "静かな","賑やかな","穏やかな","激しい","優しい","柔らかい","冷たい","暖かい","涼しい","寒い","熱い","湿った",
  "乾いた","曖昧な","透明な","鮮やかな","懐かしい","寂しい","嬉しい","悲しい","切ない","愛しい","苦しい","楽しい",
  "不思議な","神秘的な","静謐な","幽かな","穏やかな","孤独な","幸せな","憂いある","眠い","ぼんやりした","霞んだ","かすかな",
  "柔らかな","まぶしい","眩い","鈍い","静かな","騒がしい","曇った","澄んだ","遠い","儚い","脆い","深い","長い",
  "短い","永い","淡い","暗い","明るい","青","白","銀色","黄金","灰色","透明","緑","藍色","インターネット","巣","脈","細胞","神","結晶","断面","国","円","炎"
];

let texts = [];
let fixedWords = [];
let showFixedOnly = false;
const NUM_WORDS = 10;

let currentImage = 1;
const maxImage = 35;

let hasSeenGuide = false; // 🟢 追加：ガイドを既に見たかどうかの記録スイッチ

function setup() {
  let canvas = createCanvas(windowWidth * 0.6, windowHeight);
  canvas.parent("canvas-panel");
  textAlign(CENTER, CENTER);
  textFont("serif");

  for (let i = 0; i < NUM_WORDS; i++) {
    texts.push(new FloatingWord());
  }
}

function draw() {
  background(0, 20);

  for (let w of fixedWords) {
    fill(255, 220, 180);
    noStroke();
    textSize(w.size);
    text(w.word, w.x, w.y);
  }

  for (let i = texts.length - 1; i >= 0; i--) {
    texts[i].update();
    if (!showFixedOnly) {
      texts[i].display();
    }
    if (texts[i].dead()) {
      texts[i] = new FloatingWord();
    }
  }
}

function mousePressed() {
  if (showFixedOnly) return;
  
  let popup = document.getElementById("question-popup-overlay");
  if (popup && popup.style.display === "flex") return;

  for (let i = texts.length - 1; i >= 0; i--) {
    if (texts[i].clicked(mouseX, mouseY)) {
      fixedWords.push({
        word: texts[i].word,
        x: texts[i].x,
        y: texts[i].y,
        size: texts[i].size
      });
      texts.splice(i, 1);
      texts.push(new FloatingWord());
      break;
    }
  }
}

function keyPressed() {
  let popup = document.getElementById("question-popup-overlay");
  if (popup && popup.style.display === "flex") return;

  if (key === ' ') {
    showFixedOnly = !showFixedOnly;
  }
  if (key === 's') {
    saveCanvas();
  }
  if (key === 'f' || key === 'F') {
    let fs = fullscreen();
    fullscreen(!fs);
  }
  if (key === 'r' || key === 'R') {
    fixedWords = [];
    showFixedOnly = false;
  }
}

class FloatingWord {
  constructor() {
    this.word = random(words.filter(w => w !== ""));
    this.size = random(24, 52);
    let marginX = this.word.length * this.size * 0.35;
    let marginY = this.size;
    this.x = random(marginX, width - marginX);
    this.y = random(marginY, height - marginY);
    this.vx = random(-0.2, 0.2);
    this.vy = random(-0.2, 0.2);
    this.life = random(0, 400);
    this.maxLife = random(400, 1000);
  }

  update() {
    this.life++;
    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    let alpha;
    if (this.life < this.maxLife * 0.3) {
      alpha = map(this.life, 0, this.maxLife * 0.3, 0, 255);
    } else if (this.life < this.maxLife * 0.7) {
      alpha = 255;
    } else {
      alpha = map(this.life, this.maxLife * 0.7, this.maxLife, 255, 0);
    }
    fill(255, alpha);
    noStroke();
    textSize(this.size);
    text(this.word, this.x, this.y);
  }

  dead() {
    return this.life > this.maxLife;
  }

  clicked(mx, my) {
    textSize(this.size);
    let w = textWidth(this.word);
    let h = this.size;
    return (
      mx > this.x - w / 2 &&
      mx < this.x + w / 2 &&
      my > this.y - h / 2 &&
      my < this.y + h / 2
    );
  }
}

function updateImage() {
    let refImg = document.getElementById("reference");
    if (refImg) {
        refImg.src = "images/mistery/wys" + currentImage + ".png"; // 🟢 misteryフォルダ経由に変更
    }
}

// 矢印ボタンやキーによる切り替え時のマスクリセット用
function resetMasks() {
    let imgMask = document.getElementById("image-mask");
    let canvasMask = document.getElementById("canvas-mask");
    let imgPanel = document.getElementById("image-panel");
    let canvasPanel = document.getElementById("canvas-panel");
    if (imgMask) imgMask.classList.remove("active");
    if (canvasMask) canvasMask.classList.remove("active");
    if (imgPanel) imgPanel.classList.remove("highlight-image");
    if (canvasPanel) canvasPanel.classList.remove("highlight-canvas");
}

function nextImage() {
    currentImage++;
    if (currentImage > maxImage) currentImage = 1;
    updateImage();
    resetMasks();
}

function prevImage() {
    currentImage--;
    if (currentImage < 1) currentImage = maxImage;
    updateImage();
    resetMasks();
}

function windowResized() {
    let canvasPanel = document.getElementById('canvas-panel');
    if (canvasPanel) {
        // スマホのトレイ（上部バー）が出し入れされてもバグらないように追従
        resizeCanvas(canvasPanel.clientWidth, canvasPanel.clientHeight);
    }
}

// イントロテキスト
const storyText = `あなたは目覚めると無形の謎に出会う。\nそれが何かわからないことに、あなたは耐えられなくなった。\n\nそれを見ていると、あなたの頭の中には数多の言葉たちが浮かんでは消えていく。\nその断片を集め、繋ぎとめ、あなたはそれに形を与えようと試みる。\n\nこれは, 無形のものに輪郭を取り戻すための、静かな収集の旅。`;

let storyIndex = 0;
let storyTimer = null;
let isStoryPlaying = false;

function startStory() {
    let titleScreen = document.getElementById("title-screen");
    let storyScreen = document.getElementById("story-screen");

    titleScreen.classList.add("fade-out");

    setTimeout(() => {
        titleScreen.style.display = "none";
        storyScreen.style.display = "flex";
        storyScreen.classList.add("fade-out"); 
        
        setTimeout(() => {
            storyScreen.classList.remove("fade-out");
            storyIndex = 0;
            isStoryPlaying = true;
            document.getElementById("story-text").innerText = "";
            document.getElementById("story-hint").innerText = "click to skip";
            typeWriter();
        }, 50);
    }, 800);
}

function typeWriter() {
    if (storyIndex < storyText.length) {
        let currentChar = storyText.charAt(storyIndex);
        document.getElementById("story-text").innerText += currentChar;
        storyIndex++;

        let delay = 150; 
        if (currentChar === "。" || currentChar === "？") {
            delay = 800; 
        } else if (currentChar === "、") {
            delay = 450; 
        } else if (currentChar === "\n") {
            delay = 600; 
        }

        storyTimer = setTimeout(typeWriter, delay);
    } else {
        isStoryPlaying = false;
        document.getElementById("story-hint").innerText = "click to begin";
    }
}

function skipOrProceedStory() {
    if (isStoryPlaying) {
        clearTimeout(storyTimer);
        document.getElementById("story-text").innerText = storyText;
        isStoryPlaying = false;
        document.getElementById("story-hint").innerText = "click to begin";
    } else {
        let storyScreen = document.getElementById("story-screen");
        let galleryScreen = document.getElementById("gallery-screen");

        storyScreen.classList.add("fade-out");

        setTimeout(() => {
            storyScreen.style.display = "none";
            galleryScreen.style.display = "flex";
            galleryScreen.classList.add("fade-out");
            
            // 🟢 追加：ギャラリーに切り替わる瞬間に、裏側でプレイ画面（#container）を flex に戻しておく
            let container = document.getElementById("container");
            if (container) container.style.display = "flex";
            
            setTimeout(() => {
                galleryScreen.classList.remove("fade-out");
            }, 50);
        }, 800);
    }
}

// ステップ式ガイドポップアップのロジック
let currentStep = 0;
const guideSteps = [
    { text: "これがあなたが対峙した謎です。\nあなたには何に見えますか？", highlight: "image" },
    { text: "これがあなたの頭に浮かんでは消えていく言葉たちです。\n画像から得られるイメージと一致した言葉を見つけたらそれをクリックして繋ぎ止めましょう。", highlight: "canvas" },
    { text: "言葉は次々と消えていきます。直感に任せて言葉を集めてください。\nスペースを押すことで集めた言葉のみを表示できます。", highlight: "none" },
    { text: "画像を見て言葉を選び、言葉を見て画像から想像するという相互関係の中で、\nあなたすら知らないあなた自身の感覚によって唯一のストーリーが紡がれます。", highlight: "none" },
    { text: "あなたが一人なら、自分がなぜその言葉を選んだのか、言葉にしてみましょう。\n二人以上なら、他の人に選んだ理由を説明をしてください。\nそうすることであなたや他の人たちはあなたの感覚を知るでしょう。", highlight: "none" },
    { text: "Gを押すとあらためて謎を選べます。いろんな謎に挑んだり、同じ謎に交代で挑んだりしてお楽しみください。\nRで繋ぎ止めた言葉をリセットできます。", highlight: "none" },
    { text: "もしこの謎の画像の正体が知りたくなったら、正体を明かすボタンを押してください。\nしばらく遊んでから知ることをお勧めします。", highlight: "none" },
    { text: "この謎に終わりはありません。満足するまで想像を深めてください。", highlight: "none" }
];

function showPopupStep(step) {
    currentStep = step;
    let textEl = document.getElementById("popup-step-text");
    let nextBtn = document.getElementById("popup-next-btn");
    let prevBtn = document.getElementById("popup-prev-btn");
    let imgPanel = document.getElementById("image-panel");
    let canvasPanel = document.getElementById("canvas-panel");
    
    let imgMask = document.getElementById("image-mask");
    let canvasMask = document.getElementById("canvas-mask");

    textEl.innerText = guideSteps[currentStep].text;
    prevBtn.style.visibility = (currentStep === 0) ? "hidden" : "visible";
    
    if (currentStep === guideSteps.length - 1) {
        nextBtn.innerText = "言葉を収集する";
    } else {
        nextBtn.innerText = "次へ";
    }

    imgPanel.classList.remove("highlight-image");
    canvasPanel.classList.remove("highlight-canvas");
    if (imgMask) imgMask.classList.remove("active");
    if (canvasMask) canvasMask.classList.remove("active");

    // 🟢 変更：ハイライトされていない方のパネルに個別の薄い黒い幕（.active）をかける
    if (guideSteps[currentStep].highlight === "image") {
        imgPanel.classList.add("highlight-image");
        if (canvasMask) canvasMask.classList.add("active"); 
    } else if (guideSteps[currentStep].highlight === "canvas") {
        canvasPanel.classList.add("highlight-canvas");
        if (imgMask) imgMask.classList.add("active"); 
    }
}

function nextPopupStep() {
    if (currentStep < guideSteps.length - 1) {
        showPopupStep(currentStep + 1);
    } else {
        closePopupAndStartGame();
    }
}

function prevPopupStep() {
    if (currentStep > 0) {
        showPopupStep(currentStep - 1);
    }
}

function closePopupAndStartGame() {
    let popupOverlay = document.getElementById("question-popup-overlay");
    let fadeBg = document.getElementById("fade-bg"); // 🟢 追加
    resetMasks();
    
    if (popupOverlay) popupOverlay.style.display = "none";

    // 🟢 初回ガイド終了時に、黒い幕をじわーっと消す処理
    if (fadeBg && fadeBg.style.display !== "none") {
        fadeBg.style.transition = "opacity 0.8s ease";
        fadeBg.style.opacity = "0";
        setTimeout(() => {
            fadeBg.style.display = "none";
        }, 800);
    }
}

function openGuide() {
    let popupOverlay = document.getElementById("question-popup-overlay");
    if (popupOverlay) {
        popupOverlay.style.display = "flex";
        showPopupStep(0);
    }
}

function triggerReveal() {
    let revealScreen = document.getElementById("reveal-screen");
    let mysteryImg = document.getElementById("reveal-img-mystery");
    let revealImg = document.getElementById("reveal-img-target");
    let guideBtn = document.getElementById("guide-trigger");
    
    // 左側に現在の「謎」の画像をセット
    if (mysteryImg) {
        mysteryImg.src = "images/mistery/wys" + currentImage + ".png";
    }
    // 🟢 修正後：ファイル名末尾の「_1」に対応させました
    if (revealImg) {
        revealImg.src = "images/reveal1/wys" + currentImage + "_1.png";
    }
    
    if (guideBtn) {
        guideBtn.style.opacity = "0";
        guideBtn.style.pointerEvents = "none";
    }

    if (revealScreen) {
        revealScreen.style.display = "flex";
        revealScreen.classList.add("fade-out");
        setTimeout(() => { revealScreen.classList.remove("fade-out"); }, 50);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery");
    if (galleryContainer) {
        for (let i = 1; i <= maxImage; i++) {
            let img = document.createElement("img");
            img.src = "images/mistery/wys" + i + ".png";
            img.className = "gallery-image";

img.onclick = function () {
                currentImage = i;
                updateImage();
                
                let galleryScreen = document.getElementById("gallery-screen");
                let fadeBg = document.getElementById("fade-bg");
                let uiControls = document.getElementById("ui-controls"); // 🟢 変更
                
                galleryScreen.classList.add("fade-out");
                
                if(fadeBg) {
                    fadeBg.style.transition = "opacity 0.8s ease";
                    fadeBg.style.opacity = "0";
                }
                
                setTimeout(() => {
                    galleryScreen.style.display = "none";
                    galleryScreen.classList.remove("fade-out"); 
                    
                    if(fadeBg) {
                        fadeBg.style.display = "none";
                    }
                    
                    if (!hasSeenGuide) {
                        let popupOverlay = document.getElementById("question-popup-overlay");
                        if (popupOverlay) {
                            popupOverlay.style.display = "flex";
                            showPopupStep(0);
                        }
                        hasSeenGuide = true;
                    }
                    
                    // 🟢 変更：遊び方とタイトルに戻るボタンをまとめて表示
                    if (uiControls) {
                        uiControls.style.opacity = "1";
                        uiControls.style.pointerEvents = "auto";
                    }
                }, 800);
            };
            galleryContainer.appendChild(img);
        }
    }

    document.addEventListener("keydown", function(e){
        if(e.key === "g" || e.key === "G"){
            let fadeBg = document.getElementById("fade-bg");
            let uiControls = document.getElementById("ui-controls"); // 🟢 変更
            
            // 🟢 変更：ギャラリーに戻るときはボタンエリアを非表示に
            if (uiControls) {
                uiControls.style.opacity = "0";
                uiControls.style.pointerEvents = "none";
            }

            if(fadeBg) {
                fadeBg.style.display = "block";
                fadeBg.style.opacity = "1";
            }
            document.getElementById("gallery-screen").style.display = "flex";
            fixedWords = [];
            showFixedOnly = false;
            resetMasks();
        }
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });
});

// タイトル画面に戻る処理（ページを丸ごとリロードする方式に変更）
function backToTitle() {
    location.reload();
}

// 🟢 追加：スマホでのタッチ時にブラウザがバグる（スクロール等）のを防止する
function touchStarted() {
    // プレイ画面が表示されている時だけ、スマホの標準ダブルタップズームなどを無効化
    if (document.getElementById("container").style.display === "flex") {
        return false; 
    }
}