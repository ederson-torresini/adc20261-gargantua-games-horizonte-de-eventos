class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.speed = 200;
    this.direction = true;
    this.doubleJump = false;
    this.score = 0;
    this.scoreText;
    this.jetPack = false;
  }

  preload() {

    this.load.setPath("assets/");

    this.load.audio("passos", "walkamongus.mp3");
    this.load.audio("trilhasonora", "trilhasonora.mp3");
    
    this.load.image("space", "assets-usados/space1.png", {
      frameWidth: 1536,
      frameHeight: 3000,
    });

    this.load.spritesheet("gargantua", "assets-usados/gargantua.png", {
      frameWidth: 320,
      frameHeight: 320,
    });

    this.load.tilemapTiledJSON("todasfases", "mapasv4/todasfases.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image(
      "remasterizedEnfeites",
      "assets-usados/remasterizedEnfeites.png",
    );
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

    this.load.image("cai", "buttons.png", {
      frameWidth: 416,
      frameHeight: 8,
    });

    this.load.spritesheet("engrenagem", "engrenagem.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("box", "box.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {

    this.trilhasonora = this.sound.add("trilhasonora", { loop: true, volume: 0 }).play();
    this.passos = this.sound.add("passos", { loop: true, volume: 1 });

    this.space = this.add.image(100, 800, "space");
    this.space
      .setPipeline("Light2D")
      .setOrigin(0, 0)
      .setScrollFactor(0.1, 1);

    this.anims.create({
      key: "gargantua-idle",
      frames: this.anims.generateFrameNumbers("gargantua", {
        start: 0,
        end: 49,
      }),
      frameRate: 14,
      repeat: -1,
    });

    this.blackHole = this.add.group({
      allowGravity: false,
      pipeline: "Light2D",
    });

  
    this.blackHole
      .create(650, 200, "gargantua")//873, 950 //400, 40
      .setScale(2)
      .setOrigin(0, 0)
      .setScrollFactor(.33)
      .anims.play("gargantua-idle", true);
    
    this.blackHole
      .create(500, 430, "gargantua")//455, 1750 //200, 40
      .setScale(2)
      .setOrigin(0, 0)
      .setScrollFactor(.33)
      .anims.play("gargantua-idle", true);
    
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
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerEnfeites = this.tilemap
      .createLayer("enfeites", [this.tilesetRemasterizedEnfeites])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerVidro = this.tilemap
      .createLayer("vidro", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerVidroH = this.tilemap
      .createLayer("vidroH", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerVidroh = this.tilemap
      .createLayer("vidroh", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerCadeira = this.tilemap
      .createLayer("cadeira", [this.tilesetUnnamed])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerPiso = this.tilemap
      .createLayer("piso", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);

    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    this.cameras.main.setBounds(
      10,
      0,
      this.tilemap.widthInPixels,
    );

    this.anims.create({
      key: "open-door",
      frames: this.anims.generateFrameNumbers("door", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "close-door",
      frames: this.anims.generateFrameNumbers("door", { start: 7, end: 0 }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "walk-leftJp",
      frames: this.anims.generateFrameNumbers("player", { start: 14, end: 20 }),
      frameRate: 11,
      repeat: -1,
    });
    
    this.anims.create({
      key: "walk-rightJp",
      frames: this.anims.generateFrameNumbers("player", { start: 21, end: 27 }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "idleRightJP",
      frames: this.anims.generateFrameNumbers("player", { start: 2, end: 3 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "idleLeftJP",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpJP",
      frames: this.anims.generateFrameNumbers("player", { start: 9, end: 13 }),
      frameRate: 6,
      repeat: -1,
    });
    
    this.anims.create({
      key: "jumpLJP",
      frames: this.anims.generateFrameNumbers("player", { start: 4, end: 8 }),
      frameRate: 6,
      repeat: -1,
    });


    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("player", { start: 42, end: 48 }),
      frameRate: 11,
      repeat: -1,
    });


    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("player", { start: 49, end: 55 }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "idleRight",
      frames: this.anims.generateFrameNumbers("player", { start: 30, end: 31 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "idleLeft",
      frames: this.anims.generateFrameNumbers("player", { start: 28, end: 29 }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("player", { start: 38, end: 41 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpL",
      frames: this.anims.generateFrameNumbers("player", { start: 33, end: 36 }),
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

    this.anims.create({
      key: "box-idle",
      frames: this.anims.generateFrameNumbers("box", {
        start: 0,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "box-idle1",
      frames: this.anims.generateFrameNumbers("box", {
        start: 3,
        end: 0,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.scoreText = this.add
      .text(600, 80, "Engrenagens: " + this.score + "/5", {
        fontSize: "32px",
        fill: "#000",
      })
      .setScrollFactor(0);

    this.engrenagens = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    }
      );

    this.engrenagens
      .create(1138, 968, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);
    this.engrenagens
      .create(1059, 1652, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);

     this.boxes = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",

    });
    
    this.boxes
      .create(319, 2400, "box")
      .setAngle(10)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    this.boxes
      .create(244, 2530, "box")
      .setAngle(-10)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(394, 2490, "box")
      .setAngle(5)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    this.boxes
      .create(504, 2556, "box")
      .setAngle(-5)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(571, 2416, "box")
      .setAngle(10)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(634, 2446, "box")
      .setAngle(10)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    this.boxes
      .create(679, 2580, "box")
      .setAngle(10)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(769, 2502, "box")
      .setAngle(-10)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    this.boxes
      .create(849, 2377, "box")
      .setAngle(7)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(895, 2554, "box")
      .setAngle(5)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    this.boxes
      .create(1064, 2479, "box")
      .setAngle(-7)
      .anims.play("box-idle1", true)
      .body.setSize(37, 59);
    this.boxes
      .create(977, 2430, "box")
      .setAngle(-10)
      .anims.play("box-idle", true)
      .body.setSize(37, 59);
    //*BOTAR UMAS 15 CARGAS NO JETPACK*
    
    
    this.cai = this.physics.add.sprite(500, 1500, "cai");
    this.cai.setImmovable(true).setPipeline("Light2D").body.allowGravity =
      false;

    this.door11 = this.physics.add.sprite(92, 1056, "door", 0);
    this.door11.setScrollFactor(0.95, 1).setPipeline("Light2D").body.allowGravity = false;

    this.door12 = this.physics.add.sprite(108, 1825, "door", 7);
    this.door12.setScrollFactor(0.95, 1).setPipeline("Light2D").body.allowGravity = false;
    
    this.door21 = this.physics.add.sprite(430, 897, "door", 0);
    this.door21.setScrollFactor(0.95, 1).setPipeline("Light2D").body.allowGravity = false;

    this.door22 = this.physics.add.sprite(1185, 1825, "door", 0);
    this.door22.setScrollFactor(0.95, 1).setPipeline("Light2D").body.allowGravity = false;

    this.plataformG = this.physics.add.sprite(431, 930, "plataformG");
    this.plataformG
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;
    
    this.plataformG2 = this.physics.add.sprite(1059, 1666, "plataformG");
    this.plataformG2
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    //cria plataforma 1 e defne como imovível e de velocidade x = 100 além de fazê-la ignorar a gravidade
    this.plataform1 = this.physics.add.sprite(680, 1094, "plataform");
    this.plataform1
      .setImmovable(true)
      .setVelocityX(-100)
      .setPipeline("Light2D").body.allowGravity = false;
    
    setInterval(() => {
      this.plataform1.setVelocityX(this.plataform1.body.velocity.x * -1);
    }, 3000);

    //num intervalo de 3400ms, inverte a velocidade da plataforma 1
    
    this.plataform2 = this.physics.add.sprite(1140, 980, "plataform");
    this.plataform2
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;
    
    this.plataform3 = this.physics.add.sprite(1050, 935, "plataform");
    this.plataform3
      .setImmovable(true)
      .setVelocityX(-150)
      .setPipeline("Light2D").body.allowGravity = false;
    
    setInterval(() => {
      this.plataform3.setVelocityX(this.plataform3.body.velocity.x * -1);
    }, 3490);
    
    this.plataform4 = this.physics.add.sprite(855, 1796, "plataform");
    this.plataform4
      .setImmovable(true)
      .setVelocityX(120)
      .setPipeline("Light2D").body.allowGravity = false;
    
    setInterval(() => {
      this.plataform4.setVelocityX(this.plataform4.body.velocity.x * -1);
    }, 1500);
    
    this.plataform5 = this.physics.add.sprite(802, 1764, "plataform");
    this.plataform5
      .setImmovable(true)
      .setVelocityX(-150)
      .setPipeline("Light2D").body.allowGravity = false;
    setInterval(() => {
      this.plataform5.setVelocityX(this.plataform5.body.velocity.x * -1);
    }, 1000);
    
    this.plataform6 = this.physics.add.sprite(640, 1732, "plataform");
    this.plataform6
      .setImmovable(true)
      .setPipeline("Light2D")
      .setVelocityX(-150).body.allowGravity = false;
    setInterval(() => {
      this.plataform6.setVelocityX(this.plataform6.body.velocity.x * -1);
    }, 2300);
    
    this.plataform7 = this.physics.add.sprite(160, 1710, "plataform");
    this.plataform7
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;
    
    this.plataform8 = this.physics.add.sprite(560, 1640, "plataform");
    this.plataform8
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D")
      .setVelocityX(-150)
      .body.allowGravity = false;
    setInterval(() => {
      this.plataform8.setVelocityX(this.plataform8.body.velocity.x * -1);
    }, 2400);
    
    this.plataform9 = this.physics.add.sprite(625, 1640, "plataform");
    this.plataform9
      .setImmovable(true)
      .setVelocityX(150)
      .setPipeline("Light2D")
      .body.allowGravity = false;
    setInterval(() => {
      this.plataform9.setVelocityX(this.plataform9.body.velocity.x * -1);
    }, 2400);
    
    this.lights
      .enable()
      .setAmbientColor(0xe0f7ff);
    
    this.lights
      .addLight(this.door21.x, 880, 40)
      .setIntensity(1.5)
      .setScrollFactor(0.95, 1)
      .setColor(0xff0000);
    
    this.lights
      .addLight(this.door11.x, 1040, 40)
      .setIntensity(1.5)
      .setScrollFactor(0.95, 1)
      .setColor(0xff0000);
    
    this.player = this.physics.add.sprite(1138, 1836, "player", 3) //fase1:92, 1066//fase2:108, 1836//fase3: 82, 2508
    this.player.body.setSize(20, 40);
    this.cameras.main.startFollow(this.player, false, 1, 0).zoom = 1.2;
    this.cameras.main.scrollY =
      this.player.y - this.cameras.main.height / 2 - 120; // Ajuste para começar mais para cima (100 pixels acima do centro do jogador)
    this.player.anims.play("idleRight", true).setPipeline("Light2D");
    this.doubleJump = false;

    this.physics.add.overlap(
      this.player,
      this.engrenagens,
      this.collectEng,
      null,
      this,
    );
    this.physics.add.collider(this.engrenagens, this.plataform2);
    this.physics.add.collider(this.engrenagens, this.plataformG2);

    this.physics.add.collider(this.player, this.layerPiso);
    this.physics.add.collider(this.player, this.plataformG);
    this.physics.add.collider(this.player, this.plataformG2);
    this.physics.add.collider(this.player, this.plataform1);
    this.physics.add.collider(this.player, this.plataform2);
    this.physics.add.collider(this.player, this.plataform3);
    this.physics.add.collider(this.player, this.plataform4);
    this.physics.add.collider(this.player, this.plataform5);
    this.physics.add.collider(this.player, this.plataform6);
    this.physics.add.collider(this.player, this.plataform7);
    this.physics.add.collider(this.player, this.plataform8);
    this.physics.add.collider(this.player, this.plataform9);
    this.physics.add.overlap(this.player, this.boxes, () => {
      this.player.setPosition(82, 2508).setVelocity(0, 0);
    });

    this.physics.add.overlap(this.player, this.cai, () => {
      this.player.setPosition(92, 1066).setVelocity(0, 0);
    });
    
    this.physics.add.overlap(this.player, this.door21, () => {
      if (this.score === 1) {
        this.door21.anims.play("open-door", true);
        this.lights
          .addLight(this.door22.x, 1805, 33)
          .setIntensity(0.5)
          .setScrollFactor(0.95, 1)
          .setColor(0xff0000);
        this.door21.once("animationcomplete", (anim, frame) => {
          if (anim.key === "open-door") {
            this.player.setPosition(108, 1834).setVelocity(0, 0);
            this.cameras.main.scrollY =
              this.player.y - this.cameras.main.height / 2 - 120;
            
            this.door12.anims.play("close-door", true);
            this.door12.once("animationcomplete", (anim, frame) => {
              if (anim.key === "close-door") {
                this.lights
                  .addLight(this.door12.x, 1805, 35)
                  .setIntensity(0.5)
                  .setScrollFactor(0.95, 1)
                  .setColor(0xff0000);
              }
            });
          }
        });
      }
    });

    this.physics.add.overlap(this.player, this.door22, () => {
      this.door22.anims.play("open-door", true);
      this.door22.once("animationcomplete", (anim, frame) => {
        if (anim.key === "open-door") {
          this.player.setPosition(82, 2508).setVelocity(0, 0);
          this.cameras.main.scrollY =
            this.player.y - this.cameras.main.height / 3.5 - 120;
          this.jetPack = true;     
        }
      });
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

    
    
    if (this.input.gamepad && this.input.gamepad.total > 0) {
      const pad = this.input.gamepad.getPad(0);
      
      if (pad.axes.length > 0) {
        const horizontal = pad.axes[0].getValue();
        
        if (horizontal > 0) {
          this.player.setVelocityX(200);
          this.direction = true;
          if (this.player.body.velocity.y === 0 && this.jetPack === false) {
            this.player.anims.play("walk-right", true);
          } else if (this.player.body.velocity.y === 0 && this.jetPack === true) {
            this.player.anims.play("walk-rightJp", true);
          }
        } else if (horizontal < 0) {
          this.player.setVelocityX(-200);
          this.direction = false;
          if (this.player.body.velocity.y === 0 && this.jetPack === false) {
            this.player.anims.play("walk-left", true);
          } else if (this.player.body.velocity.y === 0 && this.jetPack === true) {
            this.player.anims.play("walk-leftJp", true);
          }
        } else {
          this.player.setVelocityX(0);
        }
      }
      if (this.jetPack === false) {
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
      } else {
        this.physics.world.gravity.y = 50;
        if (pad.X) {
          
          this.player.setVelocityY(-70);
          if (this.direction === true) {
            this.player
              .setFrame(10);
          } else if (this.direction === false) {
            this.player
              .setFrame(5);
          }
        }
        else if (!pad.X && this.player.body.velocity.y != 0) {
          if (this.direction === true) {
            this.player
              .setFrame(9)
              .setAngle(10);
          } else if (this.direction === false) {
            this.player
              .setFrame(4)
              .setAngle(-10);
          }
        }
        if (this.player.body.velocity.y != 0) {
          if (this.direction === true) {
            this.player.setAngle(10);
          } else if (this.direction === false) {
            this.player.setAngle(-10);
          }            
        } else if (this.player.body.velocity.y === 0) {
          this.player.setAngle(0);
        }
      }
      
    }

    if (this.jetPack === false) {
      if (this.player.body.velocity.y < 0 && this.direction === true) {
        this.player.anims.play("jump", true);
      } else if (this.player.body.velocity.y < 0 && this.direction === false) {
        this.player.anims.play("jumpL", true);
      }
    }

    const movingHorizontally = Math.abs(this.player.body.velocity.x) > 1;
    const onGround =
      this.player.body.blocked.down || this.player.body.touching.down;
    if (movingHorizontally && onGround) {
      if (!this.passos.isPlaying) this.passos.play();
    } else if (this.passos.isPlaying) {
      this.passos.stop();
    }

    if (this.jetPack === false) {
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
    } else if(this.jetPack === true) {
      if (
        this.direction === true &&
        this.player.body.velocity.x === 0 &&
        this.player.body.velocity.y === 0 &&
        (this.player.body.blocked.down || this.player.body.blocked.up)
      ) {
        this.player.anims.play("idleRightJP", true);
      } else if (
        this.direction === false &&
        this.player.body.velocity.x === 0 &&
        this.player.body.velocity.y === 0 &&
        (this.player.body.blocked.down || this.player.body.blocked.up)
      ) {
        this.player.anims.play("idleLeftJP", true);
      }
    }
    
    
  }
  
  collectEng(player, engrenagens) {
    engrenagens.disableBody(true, true);
    
    this.score += 1;
    this.scoreText.setText("Engrenagens: " + this.score + "/5");
  }
}

export default scene0;