import config from "./config.js";
import start from "./start.js";
import scene0 from "./scene0.js";
import scene1 from "./scene1.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add("start", start);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.start("scene0");
  }
}

window.onload = () => {
  window.game = new Game();
};
