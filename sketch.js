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

const ELEMENT_CACHE = {};
function getEl(id) {
    if (!ELEMENT_CACHE[id]) {
        ELEMENT_CACHE[id] = document.getElementById(id);
    }
    return ELEMENT_CACHE[id];
}

let hasSeenGuide = false;
let shouldShowGuideOnNextEntry = true;

// ゲームの制限時間
let timeLimit = 60;
let isGameOver = false;  // ← 多重呼び出し防止

function rebuildFloatingWords() {
        texts = [];
        for (let i = 0; i < NUM_WORDS; i++) {
                texts.push(new FloatingWord());
        }
}

function resetRoundState() {
        if (currentTimerId !== null) {
                clearInterval(currentTimerId);
                currentTimerId = null;
        }

        fixedWords = [];
        showFixedOnly = false;
        window.wordsOnlyMode = false;
        isGameOver = false;
        timeLimit = 60;
        rebuildFloatingWords();

        let wordsOnlyBtn = getEl("btn-toggle-words");
        if (wordsOnlyBtn) {
                wordsOnlyBtn.classList.remove("active-mode");
        }

        let timerBar = getEl("timer-bar");
        if (timerBar) {
                timerBar.style.width = "100%";
        }
}

function setup() {
  let canvas = createCanvas(windowWidth * 0.6, windowHeight);
  canvas.parent('canvas-panel');
  textAlign(CENTER, CENTER);
  textFont("serif");

    rebuildFloatingWords();
}

function draw() {
    background(0);

    // 軌跡を見えにくくしすぎず、弱い残像だけを残す
    fill(0, 3);
  noStroke();
  rect(0, 0, width, height);

  let nextFixedWords = [];
  for (let w of fixedWords) {
    if (w.fade !== undefined && w.fade > 0) {
      w.fade -= 0.02;
      if (w.fade <= 0) continue;
      let alpha = 220 * w.fade;
      fill(255, 220, 180, alpha);
      noStroke();
      textSize(w.size);
      text(w.word, w.x, w.y);
      nextFixedWords.push(w);
    } else {
      fill(255, 220, 180);
      noStroke();
      textSize(w.size);
      text(w.word, w.x, w.y);
      nextFixedWords.push(w);
    }
  }
  fixedWords = nextFixedWords;

  let isFadeOutMode = (window.wordsOnlyMode || showFixedOnly);

  for (let i = texts.length - 1; i >= 0; i--) {
    texts[i].update();
    if (!isFadeOutMode) {
      texts[i].draw();
    }
    if (texts[i].isDead()) {
      texts[i].fadeOut();
      if (texts[i].alpha <= 0) {
        texts[i] = new FloatingWord();
      }
    }
  }

  // 🔥 修正：多重呼び出し防止
  if (!isGameOver && timeLimit <= 0) {
    isGameOver = true;
    noLoop();
    saveAndShowRealResults();
  }
}
function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  for (let i = texts.length - 1; i >= 0; i--) {
    if (texts[i].isHovered(mouseX, mouseY)) {
      fixedWords.push({ word: texts[i].text, x: texts[i].x, y: texts[i].y, size: texts[i].size });
      texts[i] = new FloatingWord();
      break;
    }
  }
}

function updateImage() {
    let refImg = getEl("reference");
    if (refImg) {
        refImg.src = "images/mistery/wys" + currentImage + ".png"; 
    }
}

function resetMasks() {
    let imgMask = getEl("image-mask");
    let canvasMask = getEl("canvas-mask");
    let imgPanel = getEl("image-panel");
    let canvasPanel = getEl("canvas-panel");
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

function toggleFullscreenMode() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((error) => {
            console.warn("フルスクリーン切替に失敗しました:", error);
        });
        return;
    }

    document.exitFullscreen().catch((error) => {
        console.warn("フルスクリーン解除に失敗しました:", error);
    });
}

function windowResized() {
  resizeCanvas(windowWidth * 0.6, windowHeight);
}

const storyText = `あなたは目覚めると無形の謎に出会う。\nそれが何かわからないことに、あなたは耐えられなくなった。\n\nそれを見ていると、あなたの頭の中には数多の言葉たちが浮かんでは消えていく。\nその断片を集め、繋ぎとめ、あなたはそれに形を与えようと試みる。\n\nこれは, 無形のものに輪郭を取り戻すための、静かな収集の旅。`;

let storyIndex = 0;
let storyTimer = null;
let isStoryPlaying = false;

function startStory() {
    let titleScreen = getEl("title-screen");
    let storyScreen = getEl("story-screen");

    titleScreen.classList.add("fade-out");

    setTimeout(() => {
        titleScreen.style.display = "none";
        storyScreen.style.display = "flex";
        storyScreen.classList.add("fade-out"); 
        
        setTimeout(() => {
            storyScreen.classList.remove("fade-out");
            storyIndex = 0;
            isStoryPlaying = true;
            getEl("story-text").innerText = "";
            getEl("story-hint").innerText = "click to skip";
            typeWriter();
        }, 50);
    }, 800);
}

function typeWriter() {
    if (storyIndex < storyText.length) {
        let currentChar = storyText.charAt(storyIndex);
        getEl("story-text").innerText += currentChar;
        storyIndex++;

        let delay = 150; 
        if (currentChar === "。" || currentChar === "？") delay = 800;
        else if (currentChar === "、") delay = 450;
        else if (currentChar === "\n") delay = 600;

        storyTimer = setTimeout(typeWriter, delay);
    } else {
        isStoryPlaying = false;
        document.getElementById("story-hint").innerText = "click to begin";
    }
}

function skipOrProceedStory() {
    if (isStoryPlaying) {
        clearTimeout(storyTimer);
        getEl("story-text").innerText = storyText;
        isStoryPlaying = false;
        getEl("story-hint").innerText = "click to begin";
    } else {
        let storyScreen = getEl("story-screen");
        let galleryScreen = getEl("gallery-screen");

        storyScreen.classList.add("fade-out");

        setTimeout(() => {
            storyScreen.style.display = "none";
            galleryScreen.style.display = "flex";
            galleryScreen.classList.add("fade-out");
            
            let container = getEl("container");
            if (container) container.style.display = "none";
            
            setTimeout(() => {
                galleryScreen.classList.remove("fade-out");
            }, 50);
        }, 800);
    }
}

let currentStep = 0;
const guideSteps = [
    { text: "これがあなたが対峙した謎です。\nあなたには何に見えますか？", highlight: "image" },
    { text: "遊び方はお手元の手引書を参照してください。\n制限時間は60秒です。あなたの直感を信じてお楽しみください。", highlight: "none" }
];

function showPopupStep(step) {
    currentStep = step;
    let textEl = getEl("popup-step-text");
    let nextBtn = getEl("popup-next-btn");
    let prevBtn = getEl("popup-prev-btn");
    let imgPanel = getEl("image-panel");
    let canvasPanel = getEl("canvas-panel");
    
    let imgMask = getEl("image-mask");
    let canvasMask = getEl("canvas-mask");

    textEl.innerText = guideSteps[currentStep].text;
    prevBtn.style.visibility = (currentStep === 0) ? "hidden" : "visible";
    
    nextBtn.innerText = (currentStep === guideSteps.length - 1)
        ? "言葉を収集する"
        : "次へ";

    imgPanel.classList.remove("highlight-image");
    canvasPanel.classList.remove("highlight-canvas");
    if (imgMask) imgMask.classList.remove("active");
    if (canvasMask) canvasMask.classList.remove("active");

    if (guideSteps[currentStep].highlight === "image") {
        imgPanel.classList.add("highlight-image");
        if (canvasMask) canvasMask.classList.add("active");
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
    if (currentStep > 0) showPopupStep(currentStep - 1);
}

function closePopupAndStartGame() {
    let popupOverlay = getEl("question-popup-overlay");
    let fadeBg = getEl("fade-bg");
    resetMasks();
    
    if (popupOverlay) popupOverlay.style.display = "none";

    if (fadeBg && fadeBg.style.display !== "none") {
        fadeBg.style.transition = "opacity 0.8s ease";
        fadeBg.style.opacity = "0";
        setTimeout(() => fadeBg.style.display = "none", 800);
    }

    loop();

    // 🔥 修正：ここで timeLimit を使う（10秒 or 60秒）
    startVisualTimer(timeLimit);
}

function openGuide() {
    let popupOverlay = document.getElementById("question-popup-overlay");
    if (popupOverlay) {
        popupOverlay.style.display = "flex";
        showPopupStep(0);
    }
}
function triggerReveal() {
    let revealScreen = getEl("reveal-screen");
    let mysteryImg = getEl("reveal-img-mystery");
    let revealImg = getEl("reveal-img-target");
    let revealImg2 = getEl("reveal-img-target2");
    let guideBtn = getEl("guide-trigger");
    
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
    const galleryContainer = getEl("gallery");
    if (galleryContainer) {
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= maxImage; i++) {
            let img = document.createElement("img");
            img.src = "images/mistery/wys" + i + ".png";
            img.className = "gallery-image";

            img.onclick = function () {
                currentImage = i;
                updateImage();
                resetRoundState();
                
                let galleryScreen = getEl("gallery-screen");
                let fadeBg = getEl("fade-bg");
                
                galleryScreen.classList.add("fade-out");
                
                if (fadeBg) {
                    fadeBg.style.transition = "opacity 0.8s ease";
                    fadeBg.style.opacity = "0";
                }
                
                setTimeout(() => {
                    galleryScreen.style.display = "none";
                    galleryScreen.classList.remove("fade-out"); 
                    
                    if (fadeBg) {
                        fadeBg.style.display = "none";
                        fadeBg.style.opacity = "0";
                        fadeBg.style.pointerEvents = "none";
                    }
                    
                    let container = getEl("container");
                    if (container) {
                        container.style.display = "flex";
                    }
                    
                    showGameUI();
                    loop();
                    
                    let popupOverlay = getEl("question-popup-overlay");
                    if (shouldShowGuideOnNextEntry) {
                        if (popupOverlay) {
                            popupOverlay.style.display = "flex";
                            showPopupStep(0);
                        }
                        shouldShowGuideOnNextEntry = false;
                        hasSeenGuide = true;
                    } else {
                        startVisualTimer(timeLimit);
                    }
                }, 800);
            };
            fragment.appendChild(img);
        }
        galleryContainer.appendChild(fragment);
    }

    document.addEventListener("keydown", function(e){
        if (e.key === "g" || e.key === "G") {
            hideGameUI();

            if (currentTimerId !== null) {
                clearInterval(currentTimerId);
                currentTimerId = null;
            }

            noLoop();
            isGameOver = false;
            timeLimit = 60;

            let fadeBg = document.getElementById("fade-bg");
            if (fadeBg) {
                fadeBg.style.display = "block";
                fadeBg.style.opacity = "1";
                fadeBg.style.pointerEvents = "none";
            }

            let resPopup = getEl("result-popup-overlay");
            if (resPopup) {
                resPopup.style.display = "none";
                resPopup.classList.remove("fade-out");
            }

            getEl("gallery-screen").style.display = "flex";
            
            let container = getEl("container");
            if (container) container.style.display = "none";

            fixedWords = [];
            showFixedOnly = false;
            resetMasks();
        }

        if (e.key === "r" || e.key === "R") {
            resetCurrentWords();
        }

        if (e.key === "f" || e.key === "F") {
            e.preventDefault();
            toggleFullscreenMode();
        }

        if (e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            toggleWordsOnlyMode();
        }

        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });
});

// 🟢 真相画面からギャラリーへ戻る際の完全リセット
function backToGallery() {
    if (typeof currentTimerId !== 'undefined' && currentTimerId !== null) {
        clearInterval(currentTimerId);
        currentTimerId = null;
    }

    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) {
        resPopup.style.display = "none";
        resPopup.classList.remove("fade-out");
    }

    noLoop();

    fixedWords = [];
    texts = [];
    
    let count = NUM_WORDS;
    for (let i = 0; i < count; i++) {
        texts.push(new FloatingWord());
    }

    isGameOver = false;
    timeLimit = 60;
    showFixedOnly = false;
    window.wordsOnlyMode = false;
    shouldShowGuideOnNextEntry = false;

    let wordsOnlyBtn = document.getElementById("btn-toggle-words");
    if (wordsOnlyBtn) {
        wordsOnlyBtn.classList.remove("active-mode");
    }

    let timerBar = document.getElementById("timer-bar");
    if (timerBar) {
        timerBar.style.width = "100%";
    }

    let revealScreen = document.getElementById("reveal-screen");
    let galleryScreen = document.getElementById("gallery-screen");
    let container = document.getElementById("container");
    
    hideGameUI();

    if (revealScreen) revealScreen.style.display = "none";
    if (container) container.style.display = "none";
    
    let fadeBg = document.getElementById("fade-bg");
    if (fadeBg) {
        fadeBg.style.display = "none";
        fadeBg.style.opacity = "0";
        fadeBg.style.pointerEvents = "none";
    }
    
    if (galleryScreen) {
        galleryScreen.style.display = "flex";
    }
}

function resetToTitle() {
    if (typeof currentTimerId !== 'undefined' && currentTimerId !== null) {
        clearInterval(currentTimerId);
        currentTimerId = null;
    }

    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) {
        resPopup.style.display = "none";
        resPopup.classList.remove("fade-out");
    }

    noLoop();

    fixedWords = [];
    texts = [];
    
    let count = NUM_WORDS;
    for (let i = 0; i < count; i++) {
        texts.push(new FloatingWord());
    }

    isGameOver = false;
    timeLimit = 60;
    showFixedOnly = false;
    window.wordsOnlyMode = false;
    hasSeenGuide = false;
    shouldShowGuideOnNextEntry = true;

    storyIndex = 0;
    isStoryPlaying = false;
    if (typeof storyTimer !== 'undefined' && storyTimer) clearTimeout(storyTimer);

    let wordsOnlyBtn = document.querySelector(".ui-action-btn.active-mode");
    if (wordsOnlyBtn) {
        wordsOnlyBtn.classList.remove("active-mode");
    }

    let timerBar = document.getElementById("timer-bar");
    if (timerBar) {
        timerBar.style.width = "100%";
    }

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

    let rightCol = document.querySelector(".result-right-column");
    if (rightCol) {
        rightCol.classList.remove("is-visible");
    }
    let mainFlex = document.querySelector(".result-main-flex");
    if (mainFlex) {
        mainFlex.classList.remove("results-phase-others");
    }
    let phase1Actions = document.getElementById("result-actions-phase1");
    let phase2Actions = document.getElementById("result-actions-phase2");
    if (phase1Actions) phase1Actions.style.display = "flex";
    if (phase2Actions) phase2Actions.style.display = "none";
    let resultLead = document.querySelector(".result-lead");
    if (resultLead) resultLead.innerText = "60秒の制限時間が満ちました。あなたの感性を紐解きます。";

    let fadeBg = document.getElementById("fade-bg");
    if (fadeBg) {
        fadeBg.style.display = "block";
        fadeBg.style.opacity = "1";
        fadeBg.style.pointerEvents = "none";
    }

    let titleScreen = document.getElementById("title-screen");
    if (titleScreen) {
        titleScreen.style.display = "flex";
        titleScreen.classList.remove("fade-out");
    }
}

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
const auth = firebase.auth();

let currentTimerId = null;
let authPromise = null;

async function ensureFirebaseAuth() {
    if (!authPromise) {
        authPromise = (async () => {
            try {
                if (!auth.currentUser) {
                    await auth.signInAnonymously();
                }
            } catch (error) {
                console.warn("匿名認証に失敗しました:", error);
            }
        })();
    }
    return authPromise;
}

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

        timeLimit = Math.max(0, seconds - (elapsed / 1000));

        if (elapsed >= totalMiliseconds) {
            clearInterval(currentTimerId);
            currentTimerId = null;
        }
    }, intervalTime);
}

// ─────────────────────────────────────────────
// 🟢 完全動作版：結果画面の表示処理
// ─────────────────────────────────────────────
async function saveAndShowRealResults() {

    // 制限時間切れ以外の経路からは結果画面を表示しない
    if (!(isGameOver && timeLimit <= 0)) {
        return;
    }

    // 🔥 fade-bg が結果画面を隠す問題を完全除去
    let fadeBg = document.getElementById("fade-bg");
    if (fadeBg) {
        fadeBg.style.opacity = "0";
        fadeBg.style.display = "none";
        fadeBg.style.pointerEvents = "none";
    }

    // 🔥 結果画面が fade-out の影響で透明になる問題を完全除去
    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) {
        resPopup.classList.remove("fade-out");
        resPopup.style.display = "flex";
    }

    noLoop(); // p5.jsの描画を停止

    // 1. 画像のプレビューを表示
    let previewImg = getEl("res-preview-img");
    if (previewImg) {
        previewImg.src = "images/mistery/wys" + currentImage + ".png";
    }

    // 2. 自分が繋ぎとめた言葉を画面に表示
    let listEl = getEl("res-words-list");
    listEl.innerHTML = "";

    let mainFlex = document.querySelector(".result-main-flex");
    if (mainFlex) {
        mainFlex.classList.remove("results-phase-others");
    }

    let rightCol = document.getElementById("res-right-column");
    if (rightCol) {
        rightCol.classList.remove("is-visible");
    }

    let phase1Actions = document.getElementById("result-actions-phase1");
    let phase2Actions = document.getElementById("result-actions-phase2");
    if (phase1Actions) phase1Actions.style.display = "flex";
    if (phase2Actions) phase2Actions.style.display = "none";
    if (fixedWords.length === 0) {
        listEl.innerHTML = "<p style='color:#666; font-size:12px; margin:0;'>繋ぎとめた言葉はありませんでした。</p>";
    } else {
        const wordFragment = document.createDocumentFragment();
        fixedWords.forEach(w => {
            let span = document.createElement("span");
            span.className = "res-word-badge";
            span.innerText = w.word;
            wordFragment.appendChild(span);
        });
        listEl.appendChild(wordFragment);
    }

    let cumulativeList = getEl("res-cumulative-list");
    cumulativeList.innerHTML = "<p style='color:#888; font-size:12px;'>旅人たちの記録を読み込み中...</p>";

    const mysteryId = "mystery_" + currentImage;
    const docRef = db.collection("cumulative_words").doc(mysteryId);
    const storageKey = "cumulative_words_local_" + mysteryId;

    try {
        await ensureFirebaseAuth();

        let cachedData = null;
        try {
            cachedData = JSON.parse(localStorage.getItem(storageKey) || 'null');
        } catch (e) {
            cachedData = null;
        }

        let data = null;
        try {
            const doc = await docRef.get();
            if (doc.exists) {
                data = doc.data();
            }
        } catch (firestoreError) {
            console.warn("Firestore取得に失敗したためローカルデータを使用します:", firestoreError);
        }

        if (!data && cachedData) {
            data = cachedData;
        }

        cumulativeList.innerHTML = "";

        if (data) {
            let sortedWords = [];
            for (let word in data) {
                if (typeof data[word] === 'number') {
                    sortedWords.push({ word: word, count: data[word] });
                }
            }

            if (sortedWords.length === 0) {
                cumulativeList.innerHTML = "<p style='color:#666; font-size:12px;'>まだ累積データがありません。</p>";
            } else {
                sortedWords.sort((a, b) => b.count - a.count);
                let maxVotes = sortedWords[0].count || 1;

                const cumulativeFragment = document.createDocumentFragment();
                sortedWords.forEach(item => {
                    let row = document.createElement("div");
                    row.className = "cumulative-row";
                    let barWidth = (item.count / maxVotes) * 100;

                    row.innerHTML = `
                        <div class="cumulative-bar-bg" style="width: ${barWidth}%"></div>
                        <span class="cumulative-word">${item.word}</span>
                        <span class="cumulative-count">${item.count} 回 選択</span>
                    `;
                    cumulativeFragment.appendChild(row);
                });
                cumulativeList.appendChild(cumulativeFragment);
            }
        } else {
            cumulativeList.innerHTML = "<p style='color:#666; font-size:12px;'>あなたがこの謎の最初の旅人です。次のプレイからデータが反映されます。</p>";
        }

        if (fixedWords.length > 0) {
            let updateData = {};
            fixedWords.forEach(w => {
                updateData[w.word] = firebase.firestore.FieldValue.increment(1);
            });

            try {
                await docRef.set(updateData, { merge: true });
            } catch (writeError) {
                console.warn("Firestore書き込みに失敗しました。ローカル保存のみ継続します:", writeError);
            }

            try {
                const existing = JSON.parse(localStorage.getItem(storageKey) || '{}');
                const merged = { ...existing };
                Object.keys(updateData).forEach((word) => {
                    merged[word] = (Number(merged[word]) || 0) + 1;
                });
                localStorage.setItem(storageKey, JSON.stringify(merged));
            } catch (fallbackError) {
                console.warn("ローカル保存に失敗しました:", fallbackError);
            }
        }

    } catch (error) {
        console.error("Firebase通信エラー:", error);
        cumulativeList.innerHTML = `
            <p style='color:#ff8888; font-size:12px; margin-bottom:5px;'>データの取得に失敗しました。</p>
            <p style='color:#555; font-size:10px;'>エラー原因: ${error.message}</p>
        `;
    }
}

// ─────────────────────────────────────────────
// 🟢 結果画面のボタン
// ─────────────────────────────────────────────
function closeResultAndStay() {
    let resPopup = document.getElementById("result-popup-overlay");
    if (resPopup) resPopup.style.display = "none";
    loop();
}

function backToGalleryFromGame() {
    if (typeof backToGallery === "function") {
        backToGallery();
    }
}

function resetCurrentWords() {
    fixedWords = fixedWords.map(word => ({ ...word, alpha: 220, fade: 0.8 }));
    loop();
}

function toggleWordsOnlyMode() {
    if (typeof wordsOnlyMode === "undefined") {
        window.wordsOnlyMode = false;
    }

    const nextMode = !window.wordsOnlyMode;
    window.wordsOnlyMode = nextMode;

    if (nextMode) {
        texts.forEach(word => {
            if (word && typeof word.fadeOut === "function") {
                word.fadeOut();
                word.fadeOut();
                word.fadeOut();
                word.fadeOut();
                word.fadeOut();
            }
        });
    }

    let btn = document.getElementById("btn-toggle-words");
    if (btn) {
        if (window.wordsOnlyMode) {
            btn.classList.add("active-mode");
        } else {
            btn.classList.remove("active-mode");
        }
    }
}

function proceedToReveal() {
    let resPopup = document.getElementById("result-popup-overlay");
    let fadeBg = document.getElementById("fade-bg");

    if (fadeBg) {
        fadeBg.style.pointerEvents = "auto";
        fadeBg.style.transition = "opacity 0.6s ease";
        fadeBg.style.opacity = "1";

        setTimeout(() => {
            if (resPopup) resPopup.style.display = "none";
            triggerReveal();

            setTimeout(() => {
                fadeBg.style.opacity = "0";
                fadeBg.style.pointerEvents = "none";
            }, 200);
        }, 600);
    } else {
        if (resPopup) resPopup.style.display = "none";
        triggerReveal();
    }
}

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

let originalStartGame = window.startGame;
window.startGame = function() {
    if (typeof originalStartGame === "function") originalStartGame();
    showGameUI();
};

function showOthersWordsPhase() {
    let resultLead = document.querySelector(".result-lead");
    if (resultLead) resultLead.innerText = "あなたと他の旅人たちの感性が、今ここで交錯します。";

    let mainFlex = document.querySelector(".result-main-flex");
    if (mainFlex) {
        mainFlex.classList.add("results-phase-others");
    }

    let rightCol = document.getElementById("res-right-column");
    if (rightCol) {
        rightCol.classList.add("is-visible");
    }

    let phase1Actions = document.getElementById("result-actions-phase1");
    let phase2Actions = document.getElementById("result-actions-phase2");
    if (phase1Actions) phase1Actions.style.display = "none";
    if (phase2Actions) phase2Actions.style.display = "flex";
}
