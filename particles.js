class Particle {
  constructor(game) {
    this.game = game;
    this.markedForDeletion = false;
  }
  update() {
    // console.log("x1", this.x, this.y);
    // console.log("x speed", this.speedX, this.game.speed);
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;

    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);

    this.size = Math.random() * 10 + 5;
    this.speedX = Math.random() * 1;
    this.speedY = Math.random() * 1;
    this.x = x;
    this.y = y;
    this.color = "rgba(0,0,0,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
    // console.log("draw dust2");
  }
}
export class Splash extends Particle {
  constructor(game, x, y) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x + Math.random() * 60 - 20;
    this.y = y + Math.random() * 20 - 10;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 1;
    // this.color = "rgba(0,0,0,0.2)";
    this.gravity = 0.4;
    this.image = document.getElementById("fire");
    console.log("SPLASH");
  }
  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  constructor(game, x, y) {
    super(game);
    this.image = document.getElementById("fire");
    this.x = x - Math.random() * 5;
    this.y = y - Math.random() * 5;
    this.size = Math.random() * 100 + 50;
    this.speedX = 1 + Math.random();
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.4 + 0.1;
    // console.log(this.x, this.y);
  }
  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 20) * Math.random();
    this.y += Math.cos(this.angle * 10) * Math.random();
    // console.log(this.angle);
  }
  draw(context) {
    context.save();
    context.translate(
      this.x + this.game.player.width / 2,
      this.y + this.game.player.height / 2
    );
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size / 2,
      -this.size / 2,
      this.size,
      this.size
    );
    context.restore();
  }
}
