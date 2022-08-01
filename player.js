import { Sitting, Running, Jumping, Falling } from "/playerState.js";
export default class Player {
  constructor(game) {
    this.game = game;
    // this.gameWidth = gameWidth;
    // this.gameHeight = gameHeight;
    this.states = [
      new Sitting(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();

    this.image = document.getElementById("player");
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.vy = 0;
    this.weight = 1;
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    // enter initial state
    // this.setState(1);
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input);
    // horizontal movement
    this.x += this.speed;
    if (input.includes("ArrowRight")) {
      this.speed = this.maxSpeed;
    } else if (input.includes("ArrowLeft")) {
      this.speed = -this.maxSpeed;
    } else {
      this.speed = 0;
    }
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else {
      this.vy = 0;
    }
    // sprite animation
    this.frameTimer += deltaTime;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
}
