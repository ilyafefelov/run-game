export default class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = [];
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
            // console.log("left");
          }
          break;
        case "ArrowRight":
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
            // console.log("right");
          }

          break;
        case "ArrowDown":
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
            // console.log("down");
          }

          break;
        case "ArrowUp":
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
            // console.log("up");
          }

          break;
        case "Enter":
          if (this.keys.indexOf(e.key) === -1) {
            this.keys.push(e.key);
            // console.log("up");
          }
          break;
        case "d":
          console.log("d");
          this.game.debug = !this.game.debug;
          break;
      }
      // console.log(this.keys);
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          if (this.keys.indexOf(e.key) > -1) {
            this.keys.splice(this.keys.indexOf(e.key), 1);
          }

          break;
        case "ArrowRight":
          if (this.keys.indexOf(e.key) > -1) {
            this.keys.splice(this.keys.indexOf(e.key), 1);
          }

          break;
        case "ArrowDown":
          if (this.keys.indexOf(e.key) > -1) {
            this.keys.splice(this.keys.indexOf(e.key), 1);
          }

          break;
        case "ArrowUp":
          if (this.keys.indexOf(e.key) > -1) {
            this.keys.splice(this.keys.indexOf(e.key), 1);
          }

          break;
        case "Enter":
          if (this.keys.indexOf(e.key) > -1) {
            this.keys.splice(this.keys.indexOf(e.key), 1);
          }

          break;
      }
      // console.log(this.keys);
    });
  }
}
