import config from "./config.js";
import start from "./start.js";
import scene0 from "./scene0.js";
import scene1 from "./scene1.js";

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.direction = true;
    this.doubleJump = false;
    this.score = 0;
    this.scoreText;
    this.fase3 = false;
    this.fase5 = false;
    this.jetPack = false;
    this.energy = true;
    this.keys = null;
    this.cargaJp = 8;
    this.cargaJpText;
    
    this.scene.add("start", start);
    this.scene.add("scene0", scene0);
    this.scene.add("scene1", scene1);
    this.scene.start("scene1");
  }
}

window.onload = () => {
  window.game = new Game();
};
