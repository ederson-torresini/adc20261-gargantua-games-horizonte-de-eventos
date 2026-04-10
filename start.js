class start extends Phaser.Scene {
  constructor() {
    super("start");
  }

  preload() {
    this.load.setPath("assets/assets-usados");
    this.load.image("start", "Startsceneredimencionada.png");
    this.load.spritesheet("gargantuac", "gargantuac.png", {
      frameWidth: 220,
      frameHeight: 160,
    });
  }

  create() {
    this.anims.create({
      key: "gargantuac-idle",
      frames: this.anims.generateFrameNumbers("gargantuac", {
        start: 0,
        end: 49,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.add
      .image(400, 225, "start")
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("scene0");
      });

    this.gargantuac = this.add
      .sprite(200, 200, "gargantuac")
      .play("gargantuac-idle")
      .setScale(1.5);
  }
}

export default start;
