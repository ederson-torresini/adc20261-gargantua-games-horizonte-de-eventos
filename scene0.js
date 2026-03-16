class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");
  }

  preload() {
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 64,
      frameHeight: 64,

    });
  }

  create() {
        this.anims.create({
          key: "walk-right",
          frames: this.anims.generateFrameNumbers("player", {start: 87,end: 95,}),
          frameRate: 10,
          repeat: -1,
        });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 20, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.player = this.physics.add.sprite(400, 300, "player", 20)
      .setInteractive()
      .on("pointerdown", () => { 
        if (this.player.body.velocity.x === 0) {
          this.player.play("walk-right");
          this.player.setVelocityX(100);
        } else {
          this.player.play("idle");
          this.player.setVelocityX(0);
        }
      });
    /*this.player.setCollideWorldBounds(true);*/
  }
}



export default scene0;
