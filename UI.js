export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
  }
  draw(context) {
    context.save();
    context.shadowColor = "white";
    context.shadowBlur = 0;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.game.fontColor;
    // Score
    context.fillText("Score: " + this.game.score, 20, 50);
    // timer
    // console.log("timer1");
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText("Time: " + Math.floor(this.game.time / 1000), 20, 80);
    // console.log("timer2");
    // game over
    if (this.game.gameOver) {
      console.log("gameOver1");
      context.font = this.fontSize * 1.5 + "px " + this.fontFamily;
      context.textAlign = "center";

      if (this.game.score > 5) {
        console.log("gameOver");
        context.fillText(
          "Game Over",
          this.game.width / 2,
          this.game.height / 2
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "WINNING ;)",
          this.game.width / 2,
          this.game.height / 2 + 30
        );
      } else {
        console.log("gameOver2");
        context.fillText(
          "Game Over",
          this.game.width / 2,
          this.game.height / 2
        );
        context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
        context.fillText(
          "Try Better. U Loose =/",
          this.game.width / 2,
          this.game.height / 2 + 30
        );
      }
      // console.log("gameOver2");
    }
    context.restore();
  }
}
