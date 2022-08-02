export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("boom");
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width / 2;
    this.y = y - this.height / 2;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.spriteWidth * this.frameX,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(deltaTime) {
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.frameX > this.maxFrame) {
      this.markedForDeletion = true;
    }
  }
}
