import Player from "./player.js";
import InputHandler from "./input.js";
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
      this.groundMargin = 50;
      this.player = new Player(this);
      this.input = new InputHandler();
    }
    update(deltaTime) {
      this.player.update(this.input.keys, deltaTime);
    }
    draw(context) {
      this.player.draw(context);
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
    game.draw(ctx, deltaTime);
    game.update(deltaTime);
    // drawStatus(ctx, input, player);
    requestAnimationFrame(animate);
  }
  animate(0);
});
