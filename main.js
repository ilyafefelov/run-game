import Player from "./player.js";
import InputHandler from "./input.js";
import Background from "./background.js";
import { FlyingEnemy, GroundEnemy, CLimbingEnemy } from "./enemies.js";
import { UI } from "./UI.js";
// import { drawStatus } from "./utils.js";

window.addEventListener("load", function () {
  console.log("loaded script.js");

  const loading = document.getElementById("loading");
  loading.style.display = "none";
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");

  canvas.width = 500;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 70;
      this.speed = 0;
      this.maxSpeed = 3;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.enemies = [];
      this.enemyTimer = 0;
      this.enemyInterval = 1000;
      this.particles = [];
      this.maxParticles = 50;
      this.collisions = [];
      this.debug = false;
      this.score = 0;
      this.fontColor = "black";
      this.time = 0;
      this.maxTime = 20_000;
      this.gameOver = false;
      this.lives = 5;

      this.UI = new UI(this);

      // enter initial state
      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
    }
    update(deltaTime) {
      this.time += deltaTime;

      if (this.time > this.maxTime) {
        // this.time = 0;
        this.gameOver = true;
        // animate(); // to animate the game over screen
      }
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      // handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy, index) => {
        enemy.update(deltaTime);
        if (enemy.markedForDeletion) {
          // this.enemies.splice(this.enemies.indexOf(enemy), 1);
          this.enemies.splice(index, 1);
        }
        // console.log(this.enemies);
      });
      // handleParticles
      this.particles.forEach((particle, index) => {
        particle.update();
        if (particle.markedForDeletion) {
          this.particles.splice(index, 1);
        }
        // console.log(this.particles);
      });
      if (this.particles.length > this.maxParticles) {
        this.particles = this.particles.slice(0, this.maxParticles);
      }
      // handleCollisions
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) {
          this.collisions.splice(index, 1);
        }
        // console.log(this.collisions);
      });
      // handle Lives
      if (this.lives <= 0) {
        this.gameOver = true;
        // animate();
      }
    }
    draw(context) {
      this.background.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((enemy) => {
        enemy.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.player.draw(context);
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5) {
        this.enemies.push(new GroundEnemy(this));
      } else if (this.speed > 0) {
        this.enemies.push(new CLimbingEnemy(this));
      }
      this.enemies.push(new FlyingEnemy(this));
      // console.log(this.enemies);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  // const input = new InputHandler(canvas.width, canvas.height);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // player.update(input.lastKey);
    game.update(deltaTime);
    game.draw(ctx, deltaTime);

    // drawStatus(ctx, input, player);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
