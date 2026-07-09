// ─────────────────────────────
//  FloatingWord クラス
//  漂う言葉1つ分の挙動を管理する
// ─────────────────────────────

class FloatingWord {
    constructor(text, x, y) {
        this.text = (text !== undefined && text !== null) ? text : random(words);
        this.x = (x !== undefined && x !== null) ? x : random(width);
        this.y = (y !== undefined && y !== null) ? y : random(height);

        this.vx = random(-0.35, 0.35);   // さらにゆっくり漂うように
        this.vy = random(-0.22, 0.22);   // さらにゆっくり漂うように

        this.alpha = random(180, 240);  // ひとつの語が浮かんだ瞬間を明確にする
        this.size = random(34, 44);     // 元のサイズの約1.7倍程度に調整
        this.fadeSpeed = random(0.5, 1.0);  // もう少し長く浮かんでから消えるようにする
        this.delay = floor(random(8, 24));  // 新しい言葉が出てくる間隔を少し長くする
        this.hitboxWidth = textWidth(this.text) + 12;
        this.hitboxHeight = this.size + 10;
    }

    update() {
        if (this.delay > 0) {
            this.delay -= 1;
            return;
        }

        this.x += this.vx;
        this.y += this.vy;

        // ゆっくりフェードアウト
        this.alpha -= this.fadeSpeed;
    }

    fadeOut() {
        this.alpha = max(0, this.alpha - this.fadeSpeed * 0.5);
    }

    draw() {
        if (this.delay > 0) return;

        push();
        fill(255, this.alpha);
        noStroke();
        textSize(this.size);
        textAlign(CENTER, CENTER);
        text(this.text, this.x, this.y);
        pop();
    }

    isHovered(px, py) {
        if (this.delay > 0 || this.alpha <= 0) return false;
        textSize(this.size);
        return px >= this.x - this.hitboxWidth / 2 && px <= this.x + this.hitboxWidth / 2 && py >= this.y - this.hitboxHeight / 2 && py <= this.y + this.hitboxHeight / 2;
    }

    isDead() {
        return this.delay <= 0 && this.alpha <= 0;
    }

    display() {
        this.draw();
    }

    dead() {
        return this.isDead();
    }
}
