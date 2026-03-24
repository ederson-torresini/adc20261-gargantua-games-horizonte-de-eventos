class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
    this.money = 0;
    this.timer = 40;
    
  }
  
  preload() {

    this.load.plugin("rexvirtualjoystickplugin", "./rexvirtualjoystickplugin.min.js", true);
    
    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("fase1e2v3", "mapasv3/fase1e2v3.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image("remasterizedEnfeites", "assets-usados/remasterizedEnfeites.png");
    this.load.image("starrySpace", "assets-usados/Starry Space - 32x22.jpg");
    this.load.image("newPiskel", "assets-usados/New Piskel.png");
    this.load.image("consoles", "assets-usados/console_s.png");
    this.load.image("consolew", "assets-usados/console_w.png");
    this.load.image("tileset", "assets-usados/tileset x1.png");
    this.load.image("unnamed", "assets-usados/unnamed.png");

    this.load.spritesheet("player", "player.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("buttons", "buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });


    /*this.load.audio("epic", "assets/epic.mp3");
    this.load.audio("dindin", "assets/dindin.mp3");*/

  }


  create() {

    this.tilemap = this.make.tilemap({ key: "fase1e2v3" });
    
    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage("remasterizedEnfeites");


    /*this.epic = this.sound.add("epic", { loop: true }).play();
    this.dindin = this.sound.add("dindin");*/

    this.layerFundo = this.tilemap.createLayer("fundo", [this.tilesetRemasterized, this.tilesetRemasterizedEnfeites,]);
    this.layerEnfeites = this.tilemap.createLayer("enfeites", [this.tilesetRemasterizedEnfeites,]);
    this.layerVidro = this.tilemap.createLayer("vidro", [this.tilesetRemasterized,]);
    this.layerVidroH = this.tilemap.createLayer("vidroH", [this.tilesetRemasterized,]);
    this.layerPiso = this.tilemap.createLayer("piso", [this.tilesetRemasterized,]);

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );


    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 44, end: 51 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 59, end: 66, }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 52, end: 59 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 10 }),
      frameRate: 10,
      repeat: -1,
    });
    
    this.player = this.physics.add.sprite(400, 300, "player", 10)

    this.joystick = this.plugins.get("rexvirtualjoystickplugin").add(this, {
      x: 100,
      y: 350,
      radius: 50,
      base: this.add.circle(0, 0, 50, 0x6acac2),
      thumb: this.add.circle(0, 0, 25, 0x3fa789),
    });

    this.joystick.on("update", () => {
      const angle = Phaser.Math.DegToRad(this.joystick.angle);
      const force = this.joystick.force;

      if (force > this.threshold) {
        this.direction = new Phaser.Math.Vector2(
          Math.cos(angle),
          Math.sin(angle)
        ).normalize();
      }
    
      if (this.joystick.force > 0) {
        this.player.setVelocity(
          this.direction.x * this.speed,
          this.direction.y * this.speed
        );

        switch (true) {
          case this.joystick.angle >= -135 && this.joystick.angle < -45:
            this.player.anims.play("walk-up", true);
            break;
          case this.joystick.angle >= -45 && this.joystick.angle < 45:
            this.player.anims.play("walk-right", true);
            break;
          case this.joystick.angle >= 45 && this.joystick.angle < 135:
            this.player.anims.play("walk-down", true);
            break;
          case this.joystick.angle >= 135 || this.joystick.angle < -135:
            this.player.anims.play("walk-left", true);
            break;
        }
      } else {
        this.player.setVelocity(0, 0);
        this.player.anims.play("idle",true);
      }
    });
    
    this.player.setCollideWorldBounds(true);

    this.layerPiso.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerPiso);
  }
}

export default scene0;
