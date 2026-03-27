class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = undefined;
  }

  preload() {
    this.load.setPath("assets/");

    this.load.tilemapTiledJSON("todasfases", "mapasv4/todasfases.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image("remasterizedEnfeites","assets-usados/remasterizedEnfeites.png",);
    this.load.image("space", "assets-usados/space.jpg");
    this.load.image("newPiskel", "assets-usados/New Piskel.png");
    this.load.image("consoles", "assets-usados/console_s.png");
    this.load.image("consolew", "assets-usados/console_w.png");
    this.load.image("tileset", "assets-usados/tileset x1.png");
    this.load.image("unnamed", "assets-usados/unnamed.png");

    this.load.spritesheet("player", "player.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("plataform", "plataform.png", {
      frameWidth: 64,
      frameHeight: 8,
    });

    this.load.spritesheet("plataformG", "plataformG.png", {
      frameWidth: 96,
      frameHeight: 8,
    });

    this.load.spritesheet("door", "porta64x64.png", {
      frameHeight: 64,
      frameWidth: 64,
    });

    /*this.load.audio("epic", "assets/epic.mp3");
    this.load.audio("dindin", "assets/dindin.mp3");*/
  }

  create() {
    this.tilemap = this.make.tilemap({ key: "todasfases" });

    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage(
      "remasterizedEnfeites",
    );

    /*this.epic = this.sound.add("epic", { loop: true }).play();
    this.dindin = this.sound.add("dindin");*/

    this.layerFundo = this.tilemap.createLayer("fundo", [
      this.tilesetRemasterized,
      this.tilesetRemasterizedEnfeites,
    ]);
    this.layerEnfeites = this.tilemap.createLayer("enfeites", [
      this.tilesetRemasterizedEnfeites,
    ]);
    this.layerVidro = this.tilemap.createLayer("vidro", [
      this.tilesetRemasterized,
    ]);
    this.layerVidroH = this.tilemap.createLayer("vidroH", [
      this.tilesetRemasterized,
    ]);
    this.layerPiso = this.tilemap.createLayer("piso", [
      this.tilesetRemasterized,
    ]);

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    /*this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );*/
    this.anims.create({
      key: "open-door",
      frames: this.anims.generateFrameNumbers("door", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 28, end: 35 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 40, end: 45 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 55, end: 60 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 44, end: 51 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 5 }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "idleRight",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 7 }),
      frameRate: 3,
      repeat: -1,
    });

    this.door11 = this.physics.add.sprite(92, 1059, "door", 0);
    this.door11.body.allowGravity = false;

    this.door21 = this.physics.add.sprite(430, 897, "door", 0);
    this.door21.body.allowGravity = false;

    this.plataformG = this.physics.add.sprite(431, 930, "plataformG");
    this.plataformG.setImmovable(true);
    this.plataformG.body.allowGravity = false;

    //cria plataforma 1 e defne como iovível e de velocidade x = 100 além de fazê-la ignorar a gravidade
    this.plataform1 = this.physics.add.sprite(360, 1094, "plataform");
    this.plataform1.setImmovable(true).setVelocityX(100);
    this.plataform1.body.allowGravity = false;

    //num intervalo de 3400ms, inverte a velocidade da plataforma 1
    setInterval(() => {
      this.plataform1.setVelocityX(this.plataform1.body.velocity.x * -1);
    }, 3400);

    this.plataform2 = this.physics.add.sprite(1092, 980, "plataform");
    this.plataform2.setImmovable(true).setVelocityY(-90);
    this.plataform2.body.allowGravity = false;

    setInterval(() => {
      this.plataform2.setVelocityY(this.plataform2.body.velocity.y * -1);
    }, 1045);

    this.plataform3 = this.physics.add.sprite(963, 910, "plataform");
    this.plataform3.setImmovable(true).setVelocityX(-100);
    this.plataform3.body.allowGravity = false;

    setInterval(() => {
      this.plataform3.setVelocityX(this.plataform3.body.velocity.x * -1);
    }, 4000);

    this.player = this.physics.add.sprite(92, 1052, "player", 7).setScale(0.9);
    this.cameras.main.startFollow(this.player);
    //.zoom = 1.5
    this.player.anims.play("idleRight", true);

    this.physics.add.collider(this.player, this.plataformG);
    this.physics.add.collider(this.player, this.plataform1);
    this.physics.add.collider(this.player, this.plataform2);
    this.physics.add.collider(this.player, this.plataform3);
    //this.player.setCollideWorldBounds(true);
    /*this.plataform1.setCollideWorldBounds(true);*/
    this.physics.add.collider(this.plataform1, this.layerPiso);

    this.layerPiso.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, this.layerPiso);

    // Texto de posição do player atualizado a cada segundo
    this.positionText = this.add
      .text(10, 10, "X: 0 Y: 0", {
        fontSize: "18px",
        fill: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: { x: 6, y: 4 },
      })
      .setScrollFactor(0);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.positionText.setText(
          `X: ${Math.round(this.player.x)} Y: ${Math.round(this.player.y)}`,
        );
      },
    });
  }

  update() {
    if (this.input.gamepad && this.input.gamepad.total > 0) {
      const pad = this.input.gamepad.getPad(0);

      if (pad.axes.length > 0) {
        const horizontal = pad.axes[0].getValue();

        if (horizontal > 0) {
          this.player.setVelocityX(200);
          this.player.anims.play("walk-right", true);
        } else if (horizontal < 0) {
          this.player.setVelocityX(-200);
          this.player.anims.play("walk-left", true);
        } else {
          this.player.setVelocityX(0);
        }
      }

      if (pad.X) {
        this.player.setVelocityY(-200);
      }
    }
  }
}

export default scene0;
