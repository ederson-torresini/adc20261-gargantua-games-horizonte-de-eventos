class scene0 extends Phaser.Scene {
  constructor() {
    super("scene0");

    this.direction = true;
    this.doubleJump = false;
    this.score = 0;
    this.fase3 = false;
    this.fase5 = false;
    this.jetPack = false;
    this.energy = true;
    this.keys = null;
    this.cargaJp = 8;
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

    this.load.spritesheet("iaBox", "iaBox.png", {
      frameWidth: 322,
      frameHeight: 51,
    });

    this.load.tilemapTiledJSON("todasfases", "mapasv4/todasfases.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image(
      "remasterizedEnfeites",
      "assets-usados/remasterizedEnfeites.png",
    );

    this.load.spritesheet("player", "player.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("invisible", "InvisibleSprite.png", {
      frameWidth: 16,
      frameHeight: 16,
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
    this.load.spritesheet("boxD", "boxD.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("jetBag", "jetpack.png", {
      frameWidth: 20,
      frameHeight: 23,
    });
  }

  create() {
    this.trilhasonora = this.sound
      .add("trilhasonora", { loop: true, volume: 0.5 })
      .play();
    this.passos = this.sound.add("passos", { loop: true, volume: 1 });

    this.space = this.add.image(100, 800, "space");
    this.space.setPipeline("Light2D").setOrigin(0, 0).setScrollFactor(0.1, 1);

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
      .create(650, 200, "gargantua") //873, 950 //400, 40
      .setScale(2)
      .setOrigin(0, 0)
      .setScrollFactor(0.33)
      .anims.play("gargantua-idle", true);

    this.blackHole
      .create(500, 430, "gargantua") //455, 1750 //200, 40
      .setScale(2)
      .setOrigin(0, 0)
      .setScrollFactor(0.33)
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
    this.layerVidroh = this.tilemap
      .createLayer("vidroh", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    this.layerComp39 = this.tilemap
      .createLayer("comp39", [this.tilesetRemasterized])
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

    this.cameras.main.setBounds(10, 0, this.tilemap.widthInPixels);

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
      frames: this.anims.generateFrameNumbers("player", { start: 10, end: 13 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "jumpLJP",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
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
      key: "jetBag-idle",
      frames: this.anims.generateFrameNumbers("jetBag", {
        start: 0,
        end: 2,
      }),
      frameRate: 4,
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
      .text(100, 80, "Engrenagens: " + this.score + "/4", {
        fontSize: "32px",
        fill: "#000",
      })
      .setScrollFactor(0);

    this.engrenagens = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    });

    this.engrenagens
      .create(1138, 968, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);
    this.engrenagens
      .create(1059, 1652, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);
    this.engrenagem3 = this.engrenagens
      .create(1209, 2604, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);
    this.engrenagens
      .create(531, 3340, "engrenagem")
      .setScale(0.3)
      .anims.play("engrenagem-idle", true);

    this.anims.create({
      key: "iaSpeak",
      frames: this.anims.generateFrameNumbers("iaBox", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.boxes = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    });

    this.boxes
      .create(319, 2400, "box")
      .setAngle(10)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(244, 2530, "box")
      .setAngle(-10)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(394, 2490, "box")
      .setAngle(5)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(504, 2556, "box")
      .setAngle(-5)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(571, 2416, "box")
      .setAngle(10)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(634, 2446, "box")
      .setAngle(10)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(679, 2580, "box")
      .setAngle(10)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(769, 2502, "box")
      .setAngle(-10)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(849, 2377, "box")
      .setAngle(7)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(895, 2558, "box")
      .setAngle(5)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(1064, 2479, "box")
      .setAngle(-7)
      .anims.play("box-idle1", true)
      .body.setSize(36, 58);
    this.boxes
      .create(977, 2430, "box")
      .setAngle(-10)
      .anims.play("box-idle", true)
      .body.setSize(36, 58);
    this.boxes
      .create(192, 2604, "box") //RAFAEL
      .anims.play("box-idle", true)
      .setAngle(90)
      .body.setSize(57, 38);
    this.boxes
      .create(327, 2604, "box")
      .setAngle(-90)
      .anims.play("box-idle1", true)
      .body.setSize(57, 38);
    this.boxes
      .create(1155, 2604, "box")
      .setAngle(90)
      .anims.play("box-idle", true)
      .body.setSize(57, 38);
    //*BOTAR UMAS 15 CARGAS NO JETPACK*

    this.cai = this.physics.add.sprite(500, 1160, "cai");
    this.cai
      .setImmovable(true)
      .setPipeline("Light2D")
      .setSize(1000, 8).body.allowGravity = false;

    //porta N da fase N
    this.door11 = this.physics.add.sprite(92, 1056, "door", 0);
    this.door11
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door21 = this.physics.add.sprite(430, 897, "door", 0);
    this.door21
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door12 = this.physics.add.sprite(108, 1825, "door", 7);
    this.door12
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door22 = this.physics.add.sprite(1185, 1825, "door", 0);
    this.door22
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door13 = this.physics.add.sprite(69, 2496, "door", 7);
    this.door13
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door23 = this.physics.add.sprite(1224, 2432, "door", 0);
    this.door23
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door14 = this.physics.add.sprite(92, 288, "door", 7);
    this.door14
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door24 = this.physics.add.sprite(1152, 288, "door", 0);
    this.door24
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door15 = this.physics.add.sprite(92, 3520, "door", 7);
    this.door15
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.door25 = this.physics.add.sprite(1152, 3520, "door", 0);
    this.door25
      .setScrollFactor(0.95, 1)
      .setPipeline("Light2D").body.allowGravity = false;

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
      .setVelocityX(-150).body.allowGravity = false;
    setInterval(() => {
      this.plataform8.setVelocityX(this.plataform8.body.velocity.x * -1);
    }, 2400);

    this.plataform9 = this.physics.add.sprite(625, 1640, "plataform");
    this.plataform9
      .setImmovable(true)
      .setVelocityX(150)
      .setPipeline("Light2D").body.allowGravity = false;
    setInterval(() => {
      this.plataform9.setVelocityX(this.plataform9.body.velocity.x * -1);
    }, 2400);

    this.plataform10 = this.physics.add.sprite(280, 3365, "plataform");
    this.plataform10
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform11 = this.physics.add.sprite(115, 3420, "plataform");
    this.plataform11
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform12 = this.physics.add.sprite(425, 3425, "plataform");
    this.plataform12
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform13 = this.physics.add.sprite(769, 3495, "plataform");
    this.plataform13
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform14 = this.physics.add.sprite(841, 3400, "plataform");
    this.plataform14
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform15 = this.physics.add.sprite(955, 3375, "plataform");
    this.plataform15
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.plataform16 = this.physics.add.sprite(1230, 3375, "plataform");
    this.plataform16
      .setImmovable(true)
      .setScrollFactor(0.99, 1)
      .setPipeline("Light2D").body.allowGravity = false;

    this.invisible = this.physics.add.sprite(421, 3396, "invisible");
    this.invisible
      //.setAlpha(0)
      .setImmovable(true)
      .setPipeline("Light2D").body.allowGravity = false;

    //LIGAR O2 E MIN DE LUZ EM 422, 3396

    this.lights.enable().setAmbientColor(0xe0f7ff);

    this.light21 = this.lights
      .addLight(this.door21.x, 880, 40)
      .setIntensity(1.5)
      .setScrollFactor(0.95, 1)
      .setColor(0xff0000);

    this.lights
      .addLight(this.door11.x, 1040, 40)
      .setIntensity(1.5)
      .setScrollFactor(0.95, 1)
      .setColor(0xff0000);

    this.iaBox = this.physics.add.sprite(1009, 33, "iaBox"); //687
    this.iaBox
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setPipeline("Light2D")
      .anims.play("iaSpeak").body.allowGravity = false;

    this.player = this.physics.add.sprite(92, 1066, "player", 3); //fase1:92, 1066/445, 911//fase2:108, 1836/1138, 1836//fase3: 69, 2496/1256,2356//fase4: 92,300//fase5:92, 3532//
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
    this.physics.add.collider(this.player, this.plataform10);
    this.physics.add.collider(this.player, this.plataform11);
    this.physics.add.collider(this.player, this.plataform12);
    this.physics.add.collider(this.player, this.plataform13);
    this.physics.add.collider(this.player, this.plataform14);
    this.physics.add.collider(this.player, this.plataform15);
    this.physics.add.collider(this.player, this.plataform16);

    this.physics.add.overlap(this.player, this.invisible, () => {
      this.invisible.disableBody(true, true);
      this.plataform12.setVelocityX(150);
      setInterval(() => {
        this.plataform12.setVelocityX(this.plataform12.body.velocity.x * -1);
      }, 1650);
      this.plataform15.setVelocityX(150);
      setInterval(() => {
        this.plataform15.setVelocityX(this.plataform15.body.velocity.x * -1);
      }, 1300);
    });

    this.physics.add.overlap(this.player, this.boxes, () => {
      this.player.setPosition(82, 2508).setVelocity(0, 0);
      this.cargaJp = 7;
      this.cargaJpText.setText("Cargas: " + this.cargaJp);
    });

    this.physics.add.overlap(this.player, this.cai, () => {
      this.player.setPosition(92, 1066).setVelocity(0, 0);
    });

    this.physics.add.overlap(this.player, this.door21, () => {
      this.door21.anims.play("open-door", true);
      this.light22 = this.lights
        .addLight(this.door22.x, 1802, 35)
        .setIntensity(0.5)
        .setScrollFactor(0.95, 1)
        .setColor(0xff0000);
      this.door21.once("animationcomplete", (anim, frame) => {
        if (anim.key === "open-door") {
          this.player.setPosition(108, 1835).setVelocity(0, 0);
          this.cameras.main.scrollY =
            this.player.y - this.cameras.main.height / 2 - 120;
          this.door12.anims.play("close-door", true);
          this.door12.once("animationcomplete", (anim, frame) => {
            if (anim.key === "close-door") {
              this.light12 = this.lights
                .addLight(this.door12.x, 1802, 35)
                .setIntensity(0.5)
                .setScrollFactor(0.95, 1)
                .setColor(0xff0000);

              this.jetBag = this.physics.add.sprite(595, 1584, "jetBag");
              this.jetBag
                .setScrollFactor(0.9, 1)
                .setPipeline("Light2D")
                .setVelocityY(100).body.allowGravity = false;
              this.physics.add.collider(this.jetBag, this.layerPiso);

              this.physics.add.overlap(
                this.player,
                this.jetBag,
                this.collectBag,
                null,
                this,
              );
            }
          });
        }
      });
    });

    this.physics.add.overlap(this.player, this.door22, () => {
      if (this.jetPack) {
        this.lights
          .addLight(this.door22.x, 1802, 35)
          .setIntensity(0.5)
          .setScrollFactor(0.95, 1)
          .setColor(0x90ee90);

        this.door22.anims.play("open-door", true);
        this.door22.once("animationcomplete", (anim, frame) => {
          if (anim.key === "open-door") {
            this.player.setPosition(69, 2508).setVelocity(0, 0);
            this.cameras.main.scrollY =
              this.player.y - this.cameras.main.height / 3.5 - 120;
            this.fase3 = true;
            this.door13.anims.play("close-door", true);
            this.door13.once("animationcomplete", (anim, frame) => {
              if (anim.key === "close-door") {
                this.light13 = this.lights

                  .addLight(this.door13.x, 2473, 35)
                  .setIntensity(0.5)
                  .setScrollFactor(0.95, 1)
                  .setColor(0xff0000);
              }
            });
          }
        });
      }
    });

    this.physics.add.overlap(this.player, this.door23, () => {
      this.door23.anims.play("open-door", true);
      this.door23.once("animationcomplete", (anim, frame) => {
        if (anim.key === "open-door") {
          this.player.setPosition(92, 300).setVelocity(0, 0).setAngle(0);
          this.cameras.main.scrollY =
            this.player.y - this.cameras.main.height / 2 - 120;
          this.fase3 = false;
          this.cargaJp = 0;
          this.door14.anims.play("close-door", true);
          this.door14.once("animationcomplete", (anim, frame) => {
            if (anim.key === "close-door") {
              this.light14 = this.lights

                .addLight(this.door14.x, 265, 35)
                .setIntensity(0.5)
                .setScrollFactor(0.95, 1)
                .setColor(0xff0000);
            }
          });
        }
      });
    });

    this.physics.add.overlap(this.player, this.door24, () => {
      this.door24.anims.play("open-door", true);
      this.door24.once("animationcomplete", (anim, frame) => {
        if (anim.key === "open-door") {
          this.player.setPosition(92, 3532).setVelocity(0, 0);
          this.cameras.main.scrollY =
            this.player.y - this.cameras.main.height / 2 - 120;
          this.energy = false;
          this.door15.anims.play("close-door", true);
          this.door15.once("animationcomplete", (anim, frame) => {
            if (anim.key === "close-door") {
              this.light15 = this.lights
                .addLight(this.door15.x, 3497, 35) //ANA VITORIA
                .setIntensity(0.5)
                .setScrollFactor(0.95, 1)
                .setColor(0xff0000);
            }
          });
        }
      });
    });

    this.layerPiso.setCollisionByProperty({ collides: true });

    this.cargaJpText = this.add
      .text(270, 50, "Cargas: " + this.cargaJp, {
        fontSize: "32px",
        fill: "#ffffff00",
      })
      .setScrollFactor(0);

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

    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      action: Phaser.Input.Keyboard.KeyCodes.X,
      space: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });
  }

  update() {
    if (this.fase3) {
      this.cargaJpText.setFill("#000000");
    } else if (this.cargaJp === 0) {
      this.cargaJpText.setText("Carga: Sem Carga");
    }

    const movingHorizontally = Math.abs(this.player.body.velocity.x) > 1;
    const onGround =
      this.player.body.blocked.down || this.player.body.touching.down;
    if (movingHorizontally && onGround) {
      if (!this.passos.isPlaying) this.passos.play();
    } else if (this.passos.isPlaying) {
      this.passos.stop();
    }

    const keyboard = this.keys;
    const pad =
      this.input.gamepad && this.input.gamepad.total > 0
        ? this.input.gamepad.getPad(0)
        : null;
    let horizontal = 0;
    let jumpPressed = false;

    if (pad && pad.axes.length > 0) {
      horizontal = pad.axes[0].getValue();
      jumpPressed = !!pad.X;
    }

    if (keyboard) {
      if (keyboard.left.isDown) {
        horizontal = -1;
      } else if (keyboard.right.isDown) {
        horizontal = 1;
      }
      if (
        keyboard.up.isDown ||
        keyboard.space.isDown ||
        keyboard.action.isDown
      ) {
        jumpPressed = true;
      }
    }

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

    if (this.fase3 === false) {
      this.physics.world.gravity.y = 900;

      if (this.player.body.blocked.down) {
        this.doubleJump = false;
        if (jumpPressed) this.player.setVelocityY(-300);
      }

      if (this.player.body.blocked.left || this.player.body.blocked.right) {
        if (
          this.player.body.velocity.x != 0 &&
          jumpPressed &&
          !this.doubleJump
        ) {
          this.player.setVelocityY(-415);
          this.doubleJump = true;
        }
      }
    } else {
      this.physics.world.gravity.y = 50;

      if (
        jumpPressed &&
        (this.player.body.blocked.down || (this.doubleJump && this.cargaJp > 0))
      ) {
        this.player.setVelocityY(-70);
        this.doubleJump = false;
        if (!this.player.body.blocked.down) {
          this.cargaJp -= 1;
          this.cargaJpText.setText("Cargas: " + this.cargaJp);
        }

        if (this.direction === true) {
          this.player.setFrame("10");
        } else if (this.direction === false) {
          this.player.setFrame("5");
        }
      } else if (!jumpPressed && this.player.body.velocity.y != 0) {
        this.doubleJump = true;

        if (this.direction === true) {
          this.player.anims.play("idleRightJP", true);
        } else if (this.direction === false) {
          this.player.anims.play("idleLeftJP", true);
        }
      }

      if (
        this.player.body.velocity.y != 0 &&
        this.player.body.velocity.x != 0
      ) {
        if (this.direction === true) {
          this.player.setAngle(10);
        } else if (this.direction === false) {
          this.player.setAngle(-10);
        }
      } else if (
        (this.player.body.velocity.y != 0 &&
          this.player.body.velocity.x === 0) ||
        this.player.body.blocked.down
      ) {
        this.player.setAngle(0);
      }
    }

    if (this.jetPack === false && this.fase3 === false) {
      if (this.player.body.velocity.y < 0 && this.direction === true) {
        this.player.anims.play("jump", true);
      } else if (this.player.body.velocity.y < 0 && this.direction === false) {
        this.player.anims.play("jumpL", true);
      }
    } else if (this.jetPack === true && this.fase3 === false) {
      if (this.player.body.velocity.y < 0 && this.direction === true) {
        this.player.anims.play("jumpJP", true);
      } else if (this.player.body.velocity.y < 0 && this.direction === false) {
        this.player.anims.play("jumpLJP", true);
      }
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
    } else if (this.jetPack === true) {
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

    this.iaBox.setVelocityX(-100);

    this.score += 1;
    this.scoreText.setText("Engrenagens: " + this.score + "/4");
  }
  collectBag(player, jetBag) {
    jetBag.disableBody(true, true);

    this.jetPack = true;
  }
}

export default scene0;
