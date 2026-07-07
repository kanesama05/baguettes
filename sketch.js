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

let hasSeenGuide = false; 

function setup() {
  let canvas = createCanvas(windowWidth * 0.6, windowHeight);
  canvas.parent('canvas-panel');
  textAlign(CENTER, CENTER);
  textFont("serif");

  for (let i = 0; i < NUM_WORDS; i++) {
    texts.push(new FloatingWord());
  }
}

function draw() {
  // 🟢 モードに応じて背景を塗りつぶし
  if (window.wordsOnlyMode) {
    background(0); 
  } else {
    background(0, 20);
  }

  // 1. 自分が繋ぎとめた（クリックした）言葉を描画
  for (let w of fixedWords) {
    fill(255, 220, 180);
    noStroke();
    textSize(w.size);
    text(w.word, w.x, w.y);
  }

  // 🟢 判定：「紡いだ言葉のみ表示」または「Spaceキーでの表示固定」がONか
  let isFadeOutMode = (window.wordsOnlyMode || showFixedOnly);

  // 2. 画面を浮遊している言葉たちの処理
  for (let i = texts.length - 1; i >= 0; i--) {
    // 🎨 変更：言葉のみ表示モードの時は、文字の移動（update）を止めてその場に静止させます
    if (!isFadeOutMode) {
      texts[i].update();
    }
    
    // 文字の描画（フェードアウト処理付き）
    texts[i].display(isFadeOutMode);
    
    // 🎨 変更：言葉のみ表示モードの時は、文字が死んでも【新たな言葉を生成しない】ようにします
    if (!isFadeOutMode && texts[i].dead()) {
      texts[i] = new FloatingWord();
    }
  }
}

function mousePressed() {
  if (showFixedOnly) return;
  
  let popup = document.getElementById("question-popup-overlay");
  if (popup && popup.style.display === "flex") return;

  // 💡 ここはゲーム中の言葉を捕まえる処理です。タイトル画面のクリックはHTMLのonclick側（画面全体）に一任するため、ここでは干渉させず既存のままでOKです。
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

display(fadeOutMode = false) {
    let alpha;
    if (this.life < this.maxLife * 0.3) {
      alpha = map(this.life, 0, this.maxLife * 0.3, 0, 255);
    } else if (this.life < this.maxLife * 0.7) {
      alpha = 255;
    } else {
      alpha = map(this.life, this.maxLife * 0.7, this.maxLife, 255, 0);
    }

    // 🟢 修正：毎フレーム元のalphaに戻ってチカチカするのを防ぐ
    if (fadeOutMode) {
      // 最初の一回だけ、切り替わった瞬間の現在の透明度を保持する
      if (this.fadeOutAlpha === undefined || this.fadeOutAlpha === null) {
        this.fadeOutAlpha = alpha;
      }
      // 保持した透明度から、毎フレームスムーズに引いていく
      this.fadeOutAlpha -= 8; // 👈 じわっと消える速度（お好みで調整してください）
      if (this.fadeOutAlpha < 0) this.fadeOutAlpha = 0;
      alpha = this.fadeOutAlpha;
    } else {
      // 通常モードに戻ったらフェード用の値をリセット
      this.fadeOutAlpha = null;
    }

    // 透明度が0より大きいときだけ描画（完全に消えた文字は描画スキップ）
    if (alpha > 0) {
      fill(255, alpha);
      noStroke();
      textSize(this.size);
      text(this.word, this.x, this.y);
    }
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
        refImg.src = "images/mistery/wys" + currentImage + ".png"; 
    }
}

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
  resizeCanvas(windowWidth * 0.6, windowHeight);
}

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
            
            let container = document.getElementById("container");
            if (container) container.style.display = "flex";
            
            setTimeout(() => {
                galleryScreen.classList.remove("fade-out");
            }, 50);
        }, 800);
    }
}

let currentStep = 0;
const guideSteps = [
    { text: "これがあなたが対峙した謎です。\nあなたには何に見えますか？", highlight: "image" },
    //{ text: "これがあなたの頭に浮かんでは消えていく言葉たちです。\n画像から得られるイメージと一致した言葉を見つけたらそれをクリックして繋ぎ止めましょう。", highlight: "canvas" },
    //{ text: "言葉は次々と消えていきます。直感に任せて言葉を集めてください。\nスペースを押すことで集めた言葉のみを表示できます。", highlight: "none" },
    //{ text: "画像を見て言葉を選び、言葉を見て画像から想像するという相互関係の中で、\nあなたすら知らないあなた自身の感覚によって唯一のストーリーが紡がれます。", highlight: "none" },
    //{ text: "あなたが一人なら、自分がなぜその言葉を選んだのか、言葉にしてみましょう。\n二人以上なら、他の人に選んだ理由を説明をしてください。\nそうすることであなたや他の人たちはあなたの感覚を知るでしょう。", highlight: "none" },
    //{ text: "Gを押すとあらためて謎を選べます。いろんな謎に挑んだり、同じ謎に交代で挑んだりしてお楽しみください。\nRで繋ぎ止めた言葉をリセットできます。", highlight: "none" },
    //{ text: "もしこの謎の画像の正体が知りたくなったら、正体を明かすボタンを押してください。\nしばらく遊んでから知ることをお勧めします。", highlight: "none" },
    //{ text: "この謎に終わりはありません。満足するまで想像を深めてください。", highlight: "none" }
    { text: "遊び方はお手元の手引書を参照してください。\n制限時間は60秒です。あなたの直感を信じてお楽しみください。", highlight: "none" }
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
    let fadeBg = document.getElementById("fade-bg"); 
    resetMasks();
    
    if (popupOverlay) popupOverlay.style.display = "none";

    if (fadeBg && fadeBg.style.display !== "none") {
        fadeBg.style.transition = "opacity 0.8s ease";
        fadeBg.style.opacity = "0";
        setTimeout(() => {
            fadeBg.style.display = "none";
        }, 800);
    }
    startVisualTimer(60); 
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
    let revealImg2 = document.getElementById("reveal-img-target2");
    let guideBtn = document.getElementById("guide-trigger");
    
    if (mysteryImg) {
        mysteryImg.src = "images/mistery/wys" + currentImage + ".png";
    }
    if (revealImg) {
        revealImg.src = "images/reveal1/wys" + currentImage + "_1.png";
    }
    if (revealImg2) {
        revealImg2.src = "images/reveal2/wys" + currentImage + "_2.png";
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
                    
                    // 🟢 修正：画像を選択してゲーム画面に入った瞬間に、上下のボタンを表示する
                    showGameUI();
                    
                    if (!hasSeenGuide) {
                        let popupOverlay = document.getElementById("question-popup-overlay");
                        if (popupOverlay) {
                            popupOverlay.style.display = "flex";
                            showPopupStep(0);
                        }
                        hasSeenGuide = true;
                    } else {
                        startVisualTimer(60);
                    }
                }, 800);
            };
            galleryContainer.appendChild(img);
        }
    }

    document.addEventListener("keydown", function(e){
        if(e.key === "g" || e.key === "G"){
            // 🟢 修正：Gキーでギャラリーに戻る時は、上下のボタンを非表示にする
            hideGameUI();

            let fadeBg = document.getElementById("fade-bg");
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

// 🟢 追加：真相画面からギャラリー画面へ直接戻る処理
function backToGallery() {
    let revealScreen = document.getElementById("reveal-screen");
    let galleryScreen = document.getElementById("gallery-screen");
    let fadeBg = document.getElementById("fade-bg");
    let uiControls = document.getElementById("ui-controls");

    // 真相画面を非表示にする
    if (revealScreen) revealScreen.style.display = "none";
    
    // プレイ中の中身（集めた言葉など）を一度リセットする
    fixedWords = [];
    showFixedOnly = false;
    resetMasks();

    // ギャラリーに戻るときはプレイ画面のUIボタンを隠す
    if (uiControls) {
        uiControls.style.opacity = "0";
        uiControls.style.pointerEvents = "none";
    }

    // 黒い背景幕とギャラリー画面を表示する
    if (fadeBg) {
        fadeBg.style.display = "block";
        fadeBg.style.opacity = "1";
    }
    if (galleryScreen) {
        galleryScreen.style.display = "flex";
    } 
}

// 🟢 ページをリロードせずに、すべての状態を最初からプレイできるように完全リセットする関数
function resetToTitle() {
  // 1. p5.js のループを再開
  loop();

  // 2. 収集した言葉の配列、および浮遊する言葉の配列をすべてクリア
  fixedWords = [];
  texts = [];
  
  // 💡 安全対策：NUM_WORDS または maxTexts のどちらが使われていてもエラーにならないように定義
  let count = (typeof NUM_WORDS !== 'undefined') ? NUM_WORDS : 10;
  
  // 再び初期の浮遊する言葉を画面いっぱいに生成
  for (let i = 0; i < count; i++) {
    texts.push(new FloatingWord());
  }

  // 3. ゲームの制御フラグやタイマー状態を初期化
  isGameOver = false;
  showFixedOnly = false;
  window.wordsOnlyMode = false;

  // 💡 ストーリー再生管理用の変数を最初に戻す（storyIndex も確実にリセット）
  storyIndex = 0;
  if (typeof currentStoryIndex !== 'undefined') currentStoryIndex = 0;
  isStoryPlaying = false;
  if (storyTimer) clearTimeout(storyTimer);

  // 「紡いだ言葉のみ表示」ボタンのアクティブ状態を外す
  let wordsOnlyBtn = document.getElementById("btn-toggle-words");
  if (wordsOnlyBtn) {
    wordsOnlyBtn.classList.remove("active-mode");
  }

  // 4. タイマーゲージ（白いバー）を満タンにリセット
  let timerBar = document.getElementById("timer-bar");
  if (timerBar) {
    timerBar.style.width = "100%";
  }
  if (currentTimerId !== null) {
    clearInterval(currentTimerId);
    currentTimerId = null;
  }

  // 5. すべての画面要素の表示（display）をタイトル画面以外すべて消す
  const elementsToHide = [
    "question-popup-overlay",
    "result-popup-overlay",
    "reveal-screen",
    "container",
    "gallery-screen",
    "story-screen"
  ];
  
  elementsToHide.forEach(id => {
    let el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  // 💡 タイトル移動時に背後の黒い幕（fade-bg）を復帰させる
  let fadeBg = document.getElementById("fade-bg");
  if (fadeBg) {
    fadeBg.style.display = "block";
    fadeBg.style.opacity = "1";
    fadeBg.style.pointerEvents = "none";
  }

  // 💡 最初のタイトル画面を表示
  let titleScreen = document.getElementById("title-screen");
  if (titleScreen) {
    titleScreen.style.display = "flex";
    titleScreen.classList.remove("fade-out"); // フェードアウト状態を解除してクッキリ表示
  }
}

// もし既存のコードにこのような処理があれば、中身を resetToTitle() に変更します
function backToTitle() {
    resetToTitle();
}

const firebaseConfig = {
  apiKey: "AIzaSyCTcpQhNxiPiHNFk60jBzIOMLZxwqbyF9I",
  authDomain: "baguette2-640c7.firebaseapp.com",
  projectId: "baguette2-640c7",
  storageBucket: "baguette2-640c7.firebasestorage.app",
  messagingSenderId: "165648260758",
  appId: "1:165648260758:web:b68ac573259c4b84b3acb7",
  measurementId: "G-PMXCG02K4G"
};

// Firebaseとデータベース（Firestore）の接続開始
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

let currentTimerId = null;

function startVisualTimer(seconds) {
    let timerBar = document.getElementById("timer-bar");
    if (!timerBar) return;

    if (currentTimerId !== null) {
        clearInterval(currentTimerId);
    }

    timerBar.style.width = "100%";
    let totalMiliseconds = seconds * 1000;
    let elapsed = 0;
    let intervalTime = 50; 

    currentTimerId = setInterval(() => {
        elapsed += intervalTime;
        let percentage = Math.max(0, 100 - (elapsed / totalMiliseconds) * 100);
        
        timerBar.style.width = percentage + "%";

        if (elapsed >= totalMiliseconds) {
            clearInterval(currentTimerId);
            currentTimerId = null;
            
            // 60秒経ったら自動で【本物の集計・保存処理】を呼び出す
            saveAndShowRealResults();
        }
    }, intervalTime);
}

// 🟢 修正：自分が選ぶ「1個前」の累積データを表示してから、裏で今回のデータを保存する構造に変更
async function saveAndShowRealResults() {
    noLoop(); // p5.jsの描画を停止

    // 1. 画像のプレビューを表示
    let previewImg = document.getElementById("res-preview-img");
    if (previewImg) {
        previewImg.src = "images/mistery/wys" + currentImage + ".png";
    }

    // 2. 自分が繋ぎとめた言葉を画面に表示
    let listEl = document.getElementById("res-words-list");
    listEl.innerHTML = "";
    if (fixedWords.length === 0) {
        listEl.innerHTML = "<p style='color:#666; font-size:12px; margin:0;'>繋ぎとめた言葉はありませんでした。</p>";
    } else {
        fixedWords.forEach(w => {
            let span = document.createElement("span");
            span.className = "res-word-badge";
            span.innerText = w.word;
            listEl.appendChild(span);
        });
    }

    let cumulativeList = document.getElementById("res-cumulative-list");
    cumulativeList.innerHTML = "<p style='color:#888; font-size:12px;'>旅人たちの記録を読み込み中...</p>";

    // ポップアップをまず表示させて、固まったように見せない
    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) resPopup.style.display = "flex";

    // どの謎（画像番号）のデータかを区別するための名前
    const mysteryId = "mystery_" + currentImage;
    const docRef = db.collection("cumulative_words").doc(mysteryId);

    try {
        // 🔥 【変更ステップ1】：今回の自分の言葉を混ぜる前に、まずデータベースから「これまでの累積データ」をダウンロードして表示する
        const doc = await docRef.get();
        cumulativeList.innerHTML = "";

        if (doc.exists) {
            const data = doc.data(); // 自分が投票する前の、まっさらな過去のデータ
            
            let sortedWords = [];
            for (let word in data) {
                if (typeof data[word] === 'number') {
                    sortedWords.push({ word: word, count: data[word] });
                }
            }

            if (sortedWords.length === 0) {
                cumulativeList.innerHTML = "<p style='color:#666; font-size:12px;'>まだ累積データがありません。</p>";
            } else {
                // 選択回数が多い順にソート
                sortedWords.sort((a, b) => b.count - a.count);
                let maxVotes = sortedWords[0].count || 1;

                // 画面に「純粋な過去データ」を反映
                sortedWords.forEach(item => {
                    let row = document.createElement("div");
                    row.className = "cumulative-row";
                    let barWidth = (item.count / maxVotes) * 100;

                    row.innerHTML = `
                        <div class="cumulative-bar-bg" style="width: ${barWidth}%"></div>
                        <span class="cumulative-word">${item.word}</span>
                        <span class="cumulative-count">${item.count} 回 選択</span>
                    `;
                    cumulativeList.appendChild(row);
                });
            }
        } else {
            cumulativeList.innerHTML = "<p style='color:#666; font-size:12px;'>あなたがこの謎の最初の旅人です。次のプレイからデータが反映されます。</p>";
        }

        // 🔥 【変更ステップ2】：画面への表示が完全に終わったあと、裏で静かに「今回の自分の1票」をデータベースに送信して次回の旅人のために更新する
        if (fixedWords.length > 0) {
            let updateData = {};
            fixedWords.forEach(w => {
                updateData[w.word] = firebase.firestore.FieldValue.increment(1);
            });
            // await をつけずに非同期で走らせるか、付けても表示の後なのでユーザーの体験には干渉しません
            await docRef.set(updateData, { merge: true });
        }

    } catch (error) {
        console.error("Firebase通信エラー:", error);
        cumulativeList.innerHTML = `
            <p style='color:#ff8888; font-size:12px; margin-bottom:5px;'>データの取得に失敗しました。</p>
            <p style='color:#555; font-size:10px;'>エラー原因: ${error.message}</p>
        `;
    }
}

function closeResultAndStay() {
    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) resPopup.style.display = "none";
    loop();
}

// ──────────────────────────────────────────────────────────
// 🟢 追加・修正：クリック操作用の関数と暗転バグの修正
// ──────────────────────────────────────────────────────────

// 1. ギャラリーに戻るボタン (G) のクリック処理
function backToGalleryFromGame() {
    // 既存の「G」キーを押したときの処理（例：backToGallery()等）を呼び出す
    if (typeof backToGallery === "function") {
        backToGallery();
    }
}

// 2. リセットボタン (R) のクリック処理
function resetCurrentWords() {
    // 捕まえた言葉の配列を空にしてp5.jsを再描画
    fixedWords = [];
    loop(); 
}

// 3. 紡いだ言葉のみ表示ボタン (Space) のクリック処理
function toggleWordsOnlyMode() {
    // もしすでにフラグがあるなら反転、なければ作成
    if (typeof wordsOnlyMode === "undefined") {
        window.wordsOnlyMode = false;
    }
    window.wordsOnlyMode = !window.wordsOnlyMode;

    // ボタンの見た目（アクティブ状態）を切り替える
    let btn = document.getElementById("btn-toggle-words");
    if (btn) {
        if (window.wordsOnlyMode) {
            btn.classList.add("active-mode");
        } else {
            btn.classList.remove("active-mode");
        }
    }
}

// 4. 修正：結果画面から真相に映るときに「美しい暗転」を挟むように上書き
function proceedToReveal() {
    let resPopup = document.getElementById("result-popup-overlay");
    let fadeBg = document.getElementById("fade-bg");

    if (fadeBg) {
        // ① まず画面を真っ黒に暗転させる
        fadeBg.style.pointerEvents = "auto";
        fadeBg.style.transition = "opacity 0.6s ease";
        fadeBg.style.opacity = "1";

        // ② 暗転が完了した瞬間（0.6秒後）に、裏で画面を切り替えてからパッとフェードアウト
        setTimeout(() => {
            if (resPopup) resPopup.style.display = "none";
            
            // 真相画面を表示する既存の関数を呼び出す
            triggerReveal();

            // じわっと元の画面（真相画面）を表示
            setTimeout(() => {
                fadeBg.style.opacity = "0";
                fadeBg.style.pointerEvents = "none";
            }, 200);
        }, 600);
    } else {
        // 万が一fade-bgがない場合のセーフティ
        if (resPopup) resPopup.style.display = "none";
        triggerReveal();
    }
}
// ──────────────────────────────────────────────────────────
// 🟢 修正：上下に分かれた新しいボタン表示に対応させる処理
// ──────────────────────────────────────────────────────────

// ゲーム開始時などにUIボタン一式を表示させる既存の関数を補強
function showGameUI() {
    let topControls = document.getElementById("ui-controls-top");
    let bottomControls = document.getElementById("ui-controls-bottom");
    
    if (topControls) {
        topControls.style.opacity = "1";
        topControls.style.pointerEvents = "auto";
    }
    if (bottomControls) {
        bottomControls.style.opacity = "1";
        bottomControls.style.pointerEvents = "auto";
    }
}

// タイトルに戻る時などにUIボタン一式を非表示にする処理
function hideGameUI() {
    let topControls = document.getElementById("ui-controls-top");
    let bottomControls = document.getElementById("ui-controls-bottom");
    
    if (topControls) {
        topControls.style.opacity = "0";
        topControls.style.pointerEvents = "none";
    }
    if (bottomControls) {
        bottomControls.style.opacity = "0";
        bottomControls.style.pointerEvents = "none";
    }
}

// 既存のストーリー終了時などの処理に割り込むためのフック
// ※もしすでに container.style.display = "flex" などとしている場所に以下を追加すると確実です
let originalStartGame = window.startGame;
window.startGame = function() {
    if (typeof originalStartGame === "function") originalStartGame();
    showGameUI();
};