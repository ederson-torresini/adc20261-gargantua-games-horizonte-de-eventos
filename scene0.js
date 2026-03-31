class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.threshold = 0.1;
    this.speed = 200;
    this.direction = true;
    this.doubleJump = false;
  }

  preload() {
    this.load.setPath("assets/");

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
      frameWidth: 44,
      frameHeight: 50,
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

    /*this.load.audio("epic", "assets/epic.mp3");
    this.load.audio("dindin", "assets/dindin.mp3");*/
  }

  create() {

    this.space = this.add.image(699, 1514, "space")

    this.anims.create({
      key: "gargantua-idle",
      frames: this.anims.generateFrameNumbers("gargantua", { start: 0, end: 49 }),
      frameRate: 14,
      repeat: -1,
    });

    this.gargantua = this.add.sprite(873, 950, "gargantua")
      .setScale(2)
      .play("gargantua-idle");
    this.gargantua.allowGravity = false;

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
    this.layerVidroh = this.tilemap.createLayer("vidroh", [
      this.tilesetUnnamed,
    ]);
    this.layerCadeira = this.tilemap.createLayer("cadeira", [
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
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "idleRight",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 7 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "idleLeft",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 27, end: 30 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpL",
      frames: this.anims.generateFrameNumbers("player", { start: 14, end: 17 }),
      frameRate: 6,
      repeat: -1,
    });

    this.cai = this.physics.add.sprite(500, 1150, "cai");
    this.cai.body.allowGravity = false;
    this.cai.setImmovable(true);

    this.door11 = this.physics.add.sprite(92, 1056, "door", 0);
    this.door11.body.allowGravity = false;

    this.door21 = this.physics.add.sprite(430, 897, "door", 0);
    this.door21.body.allowGravity = false;

    this.plataformG = this.physics.add.sprite(431, 930, "plataformG");
    this.plataformG.setImmovable(true);
    this.plataformG.body.allowGravity = false;

    //cria plataforma 1 e defne como iovível e de velocidade x = 100 além de fazê-la ignorar a gravidade
    this.plataform1 = this.physics.add.sprite(380, 1094, "plataform");
    this.plataform1.setImmovable(true).setVelocityX(100);
    this.plataform1.body.allowGravity = false;

    //num intervalo de 3400ms, inverte a velocidade da plataforma 1
    setInterval(() => {
      this.plataform1.setVelocityX(this.plataform1.body.velocity.x * -1);
    }, 3000);

    this.plataform2 = this.physics.add.sprite(1140, 980, "plataform");
    this.plataform2.setImmovable(true)//.setVelocityY(-85);
    this.plataform2.body.allowGravity = false;

    /*setInterval(() => {
      this.plataform2.setVelocityY(this.plataform2.body.velocity.y * -1);
    }, 1100);*/

    this.plataform3 = this.physics.add.sprite(1050, 930, "plataform");
    this.plataform3.setImmovable(true).setVelocityX(-150);
    this.plataform3.body.allowGravity = false;

    setInterval(() => {
      this.plataform3.setVelocityX(this.plataform3.body.velocity.x * -1);
    }, 3490);

    this.player = this.physics.add.sprite(92, 1066, "player", 7).setScale(0.9);//fase1:92, 1052//fase2:108, 1834//
    //this.cameras.main.followOffset.set(0, 200);
    this.cameras.main.startFollow(this.player, false, 1, 0)
      .zoom = 1.2;/*
    this.cameras.main.lockTo(this.player, true, 1, 1);*/
    this.cameras.main.scrollY = this.player.y - this.cameras.main.height / 2 - 120; // Ajuste para começar mais para cima (100 pixels acima do centro do jogador)
    this.player.anims.play("idleRight", true);
    this.doubleJump = false;
      
      this.physics.add.collider(this.player, this.layerPiso);
      this.physics.add.collider(this.player, this.plataformG);
      this.physics.add.collider(this.player, this.plataform1);
      this.physics.add.collider(this.player, this.plataform2);
      this.physics.add.collider(this.player, this.plataform3);
      this.physics.add.overlap(this.player, this.cai, () => {
        this.player.setPosition(92, 1066);
        this.player.setVelocity(0, 0);
      });
      //this.player.setCollideWorldBounds(true);
      /*this.plataform1.setCollideWorldBounds(true);*/
      this.physics.add.collider(this.plataform1, this.layerPiso);

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
      if (this.input.gamepad && this.input.gamepad.total > 0) {
        const pad = this.input.gamepad.getPad(0);

        if (pad.axes.length > 0) {
          const horizontal = pad.axes[0].getValue();

          if (horizontal > 0) {
            this.player.setVelocityX(200);
            this.direction = true;
            if (this.player.body.velocity.y === 0) {
              this.player.anims.play("walk-right", true);
            }
          } else if (horizontal < 0) {
            this.player.setVelocityX(-200);
            this.direction = false;
            if (this.player.body.velocity.y === 0) {
              this.player.anims.play("walk-left", true);
            }
          } else {
            this.player.setVelocityX(0);
          }
        }

        if (this.player.body.blocked.down) {
          this.doubleJump = false;
          if (pad.X)
            this.player.setVelocityY(-300)
        }

      
        if (this.player.body.blocked.left || this.player.body.blocked.right) {
          if (this.player.body.velocity.x != 0 && pad.X && !this.doubleJump) {
            this.player.setVelocityY(-415);
            this.doubleJump = true;
          }
        }
      }
      if (this.direction === true &&
        this.player.body.velocity.x === 0 &&
        this.player.body.velocity.y === 0 &&
        (this.player.body.blocked.down || this.player.body.blocked.up)) {
        this.player.anims.play("idleRight", true);
      } else if (this.direction === false &&
        this.player.body.velocity.x === 0 &&
        this.player.body.velocity.y === 0 &&
        (this.player.body.blocked.down || this.player.body.blocked.up)) {
        this.player.anims.play("idleLeft", true);
      }
    
      if (this.player.body.velocity.y < 0 && this.direction === true) {
        this.player.anims.play("jump", true);
      } else if (this.player.body.velocity.y < 0 && this.direction === false) {
        this.player.anims.play("jumpL", true);
      }
    }
  }
export default scene0;