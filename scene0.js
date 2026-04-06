class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.speed = 200;
    this.direction = true;
    this.doubleJump = false;
    this.score = 0;
    this.scoreText;
  }

  preload() {
    this.load.setPath("assets/");

    this.load.audio("passos", "walkamongus.mp3");

    this.load.image("space", "assets-usados/space1.png");

    this.load.spritesheet("gargantua", "assets-usados/gargantuac.png", {
      frameWidth: 220,
      frameHeight: 160,
    });

    this.load.tilemapTiledJSON("todasfases", "mapasv4/todasfases.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image(
      "remasterizedEnfeites",
      "assets-usados/remasterizedEnfeites.png",
    );
    this.load.image("space", "assets-usados/space.jpg");
    this.load.image("newPiskel", "assets-usados/New Piskel.png");
    this.load.image("consoles", "assets-usados/console_s.png");
    this.load.image("consolew", "assets-usados/console_w.png");
    this.load.image("tileset", "assets-usados/tileset x1.png");
    this.load.image("unnamed", "assets-usados/unnamed.png");

    this.load.spritesheet("player", "player.png", {
      frameWidth: 36,
      frameHeight: 48,
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

    this.load.image("cai", "buttons.png", {
      frameWidth: 416,
      frameHeight: 8,
    });

    this.load.spritesheet("engrenagem", "engrenagem.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /*this.load.audio("epic", "assets/epic.mp3");
    this.load.audio("dindin", "assets/dindin.mp3");*/
  }

  create() {
    this.passos = this.sound.add("passos", { loop: true, volume: 0.5 });

    this.space = this.add.image(699, 1514, "space");

    this.anims.create({
      key: "gargantua-idle",
      frames: this.anims.generateFrameNumbers("gargantua", {
        start: 0,
        end: 49,
      }),
      frameRate: 14,
      repeat: -1,
    });

    this.gargantua = this.add
      .sprite(873, 950, "gargantua")
      .setScale(2)
      .play("gargantua-idle")
      .setPipeline("Light2D");
    this.gargantua.allowGravity = false;

    this.tilemap = this.make.tilemap({ key: "todasfases" });

    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage(
      "remasterizedEnfeites",
    );
    this.tilesetUnnamed = this.tilemap.addTilesetImage("unnamed");

    this.layerFundo = this.tilemap
      .createLayer("fundo", [
        this.tilesetRemasterized,
        this.tilesetRemasterizedEnfeites,
      ])
      .setPipeline("Light2D");
    this.layerEnfeites = this.tilemap
      .createLayer("enfeites", [this.tilesetRemasterizedEnfeites])
      .setPipeline("Light2D");
    this.layerVidro = this.tilemap
      .createLayer("vidro", [this.tilesetRemasterized])
      .setPipeline("Light2D");
    this.layerVidroH = this.tilemap
      .createLayer("vidroH", [this.tilesetRemasterized])
      .setPipeline("Light2D");
    this.layerVidroh = this.tilemap
      .createLayer("vidroh", [this.tilesetRemasterized])
      .setPipeline("Light2D");
    this.layerCadeira = this.tilemap
      .createLayer("cadeira", [this.tilesetUnnamed])
      .setPipeline("Light2D");
    this.layerPiso = this.tilemap
      .createLayer("piso", [this.tilesetRemasterized])
      .setPipeline("Light2D");

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      //this.tilemap.heightInPixels,
    );
    this.anims.create({
      key: "open-door",
      frames: this.anims.generateFrameNumbers("door", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: 0,
    });

   /* this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("player", { start: 28, end: 35 }),
      frameRate: 10,
      repeat: -1,
    });*/

    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 15, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 22, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });

    /*this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("player", { start: 44, end: 51 }),
      frameRate: 10,
      repeat: -1,
    });

    /*this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 5 }),
      frameRate: 3,
      repeat: -1,
    });*/

    this.anims.create({
      key: "idleRight",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "idleLeft",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 13 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpL",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "engrenagem-idle",
      frames: this.anims.generateFrameNumbers("engrenagem", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.scoreText = this.add
      .text(100, 28, "Engrenagens: 0/5", {
        fontSize: "32px",
        fill: "#000",
      })
      .setScrollFactor(0);

    this.engrenagem = this.physics.add
      .sprite(1138, 968, "engrenagem")
      .setScale(0.3);
    this.engrenagem.anims
      .play("engrenagem-idle", true)
      .setImmovable(true)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    this.cai = this.physics.add.sprite(500, 1150, "cai");
    this.cai
      .setImmovable(true)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    this.door11 = this.physics.add.sprite(92, 1056, "door", 0);
    this.door11
      .setPipeline("Light2D")
      .body.allowGravity = false;

    this.door21 = this.physics.add.sprite(430, 897, "door", 0);
    this.door21
      .setPipeline("Light2D")
      .body.allowGravity = false;

    this.plataformG = this.physics.add.sprite(431, 930, "plataformG");
    this.plataformG
      .setImmovable(true)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    //cria plataforma 1 e defne como imovível e de velocidade x = 100 além de fazê-la ignorar a gravidade
    this.plataform1 = this.physics.add.sprite(380, 1094, "plataform");
    this.plataform1
      .setImmovable(true)
      .setVelocityX(100)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    //num intervalo de 3400ms, inverte a velocidade da plataforma 1
    setInterval(() => {
      this.plataform1.setVelocityX(this.plataform1.body.velocity.x * -1);
    }, 3000);

    this.plataform2 = this.physics.add.sprite(1140, 980, "plataform");
    this.plataform2
      .setImmovable(true)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    this.plataform3 = this.physics.add.sprite(1050, 930, "plataform");
    this.plataform3
      .setImmovable(true)
      .setVelocityX(-150)
      .setPipeline("Light2D")
      .body.allowGravity = false;

    setInterval(() => {
      this.plataform3.setVelocityX(this.plataform3.body.velocity.x * -1);
    }, 3490);

    this.player = this.physics.add.sprite(92, 1066, "player", 3).setScale(0.9); //fase1:92, 1052//fase2:108, 1834//
    this.cameras.main.startFollow(this.player, false, 1, 0).zoom = 1.2;
    this.cameras.main.scrollY =
      this.player.y - this.cameras.main.height / 2 - 120; // Ajuste para começar mais para cima (100 pixels acima do centro do jogador)
    this.player.anims.play("idleRight", true)
      .setPipeline("Light2D");
    this.doubleJump = false;

    this.lights
      .enable()
      .setAmbientColor(0xe0f7ff) 
      .addLight(1040, 995, 80)
      .setIntensity(1)
      .setColor(0xffa500);
    this.lights.addLight(921, 1032, 80).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(900, 1032, 80).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(860, 1020, 80).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(860, 950, 80).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(735, 1050, 50).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(784, 1025, 60).setIntensity(1).setColor(0xffa500);
    this.lights.addLight(852, 954, 60).setIntensity(1).setColor(0xffa500);
    this.lights
      .addLight(this.door11.x, 1040, 40)
      .setIntensity(1.5)
      .setColor(0xff0000);
    this.lights
      .addLight(this.door21.x, 880, 40)
      .setIntensity(1.5)
      .setColor(0xff0000);
    /*this.lights
      .addLight(this.engrenagem.x, this.engrenagem.y, 40)
      .setIntensity(1.5);*/
    this.lights
      .addLight(this.plataform2.x, this.plataform2.y, 40)
      .setIntensity(0.5);
    this.lampP1 = this.lights
      .addLight(this.plataform1.x, this.plataform1.y, 40)
      .setIntensity(0.5);
    this.lampP3 = this.lights
      .addLight(this.plataform3.x, this.plataform3.y, 40)
      .setIntensity(0.5);
    this.lights
      .addLight(238, 1066, 60)
      .setIntensity(1.5);

    /*this.lamp = this.lights
    .addLight(this.player.x, this.player.y, 35)
    .setIntensity(1);*/

    this.physics.add.overlap(
      this.player,
      this.engrenagem,
      this.collectEng,
      null,
      this,
    );
    this.physics.add.collider(this.engrenagem, this.plataform2);
    this.physics.add.collider(this.player, this.layerPiso);
    this.physics.add.collider(this.player, this.plataformG);
    this.physics.add.collider(this.player, this.plataform1);
    this.physics.add.collider(this.player, this.plataform2);
    this.physics.add.collider(this.player, this.plataform3);
    this.physics.add.overlap(this.player, this.cai, () => {
      this.player.setPosition(92, 1066).setVelocity(0, 0);
    });

    this.layerPiso.setCollisionByProperty({ collides: true });

    // Texto de posição do player atualizado a cada segundo
    this.positionText = this.add
      .text(100, 50, "X: 0 Y: 0", {
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
    /*this.lamp.x = this.player.x;
    this.lamp.y = this.player.y;*/
      this.lampP1.x = this.plataform1.x;
      this.lampP1.y = this.plataform1.y;
      /*this.lampP2.x = this.plataform2.x;
      this.lampP2.y = this.plataform2.y;*/
      this.lampP3.x = this.plataform3.x;
      this.lampP3.y = this.plataform3.y;
      
    if (this.input.gamepad && this.input.gamepad.total > 0) {
      const pad = this.input.gamepad.getPad(0);

      if (pad.axes.length > 0) {
        const horizontal = pad.axes[0].getValue();

        if (horizontal > 0) {
          this.player.setVelocityX(200);
          this.direction = true;
          if (this.player.body.velocity.y === 0) {
            this.player.anims.play("walk-right", true);
            //this.passos.play();
          }
        } else if (horizontal < 0) {
          this.player.setVelocityX(-200);
          this.direction = false;
          if (this.player.body.velocity.y === 0) {
            this.player.anims.play("walk-left", true);
            //this.passos.play();
          }
        } else {
          this.player.setVelocityX(0);
        }
      }

      if (this.player.body.blocked.down) {
        this.doubleJump = false;
        if (pad.X) this.player.setVelocityY(-300);
      }

      if (this.player.body.blocked.left || this.player.body.blocked.right) {
        if (this.player.body.velocity.x != 0 && pad.X && !this.doubleJump) {
          this.player.setVelocityY(-415);
          this.doubleJump = true;
        }
      }
    }
    if (
      this.direction === true &&
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0 &&
      (this.player.body.blocked.down || this.player.body.blocked.up)
    ) {
      this.player.anims.play("idleRight", true);
    } else if (
      this.direction === false &&
      this.player.body.velocity.x === 0 &&
      this.player.body.velocity.y === 0 &&
      (this.player.body.blocked.down || this.player.body.blocked.up)
    ) {
      this.player.anims.play("idleLeft", true);
    }

    if (this.player.body.velocity.y < 0 && this.direction === true) {
      this.player.anims.play("jump", true);
    } else if (this.player.body.velocity.y < 0 && this.direction === false) {
      this.player.anims.play("jumpL", true);
    }
  }

  collectEng(player, engrenagem) {
    engrenagem.disableBody(true, true);

    this.score += 1;
    this.scoreText.setText("Engrenagens: " + this.score + "/5");
  }
}
export default scene0;
