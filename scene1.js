class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");

    this.speed = 200;
    this.direction = true;
    /*this.doubleJump = false;
    this.score = 0;
    this.scoreText;
    this.jetPack = false;*/
  }

  preload() {
    this.load.setPath("assets/");

    this.load.audio("passos", "walkamongus.mp3");
    this.load.audio("trilhasonora", "trilhasonora.mp3");

    //preload o asset do espaço ao fundo
    //this.load.image("space", "assets-usados/space1.png", {
    //  frameWidth: 1536,
    //  frameHeight: 3000,
    //});

    //preload do tilemap da faseortogonal1(troquei de arquivo pois na salaortogonal tem tilesets que não estão sendo usados e estava dando erro)
    this.load.tilemapTiledJSON(
      "faseortogonal",
      "mapasv4/faseortogonalatualizada.json",
    );

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image(
      "remasterizedEnfeites",
      "assets-usados/remasterizedEnfeites.png",
    );
    this.load.image("NewPiskel", "assets-usados/NewPiskel.png");
    this.load.image("consoles", "assets-usados/console_s.png");
    this.load.image("consolew", "assets-usados/console_w.png");
    this.load.image("tilesetx1", "assets-usados/tilesetx1.png");
    this.load.image("space1", "assets-usados/space1.png");
    this.load.image("consolelongo", "assets-usados/consolelongo.png");
    this.load.image("consolemedio", "assets-usados/consolemedio.png");

    //preload do sprite do player roxo
    this.load.spritesheet("playerroxo", "playerroxo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("bigboss", "InvisibleSprite.png", {
      frameWidth: 25,
      frameHeight: 25,
    });

    this.load.spritesheet("porta", "porta64x64.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    //adiciona trilha sonora e efeitos sonoros
    this.trilhasonora = this.sound
      .add("trilhasonora", { loop: true, volume: 0.5 })
      .play();
    this.passos = this.sound.add("passos", { loop: true, volume: 1 });

    //adiciona o espaço ao fundo
    this.space = this.add.image("space1");
    this.space.setOrigin(0, 0); //.setScrollFactor(0.1, 1);

    //adiciona o tilemap da sala ortogonal
    this.tilemap = this.make.tilemap({ key: "faseortogonal" });

    //adiciona os tilesets utilizados
    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage(
      "remasterizedEnfeites",
    );
    this.tilesetConsoles = this.tilemap.addTilesetImage("consoles");
    this.tilesetConsolew = this.tilemap.addTilesetImage("consolew");
    this.tilesetNewPiskel = this.tilemap.addTilesetImage("NewPiskel");
    this.tilesetx1 = this.tilemap.addTilesetImage("tilesetx1");
    this.tilesetSpace1 = this.tilemap.addTilesetImage("space1");

    this.layerEspaco = this.tilemap
      .createLayer("espaco", [this.tilesetSpace1])
      .setPipeline("Light2D");
    // .setScrollFactor(0.9, 1);

    this.layerPiso = this.tilemap
      .createLayer("piso", [this.tilesetx1])
      .setPipeline("Light2D");
    //.setScrollFactor(0.9, 1);

    this.layerParede = this.tilemap
      .createLayer("parede", [this.tilesetx1, this.tilesetRemasterizedEnfeites])
      .setPipeline("Light2D");
    // .setScrollFactor(0.9, 1);

    this.layerNave = this.tilemap
      .createLayer("nave", [this.tilesetRemasterized])
      .setPipeline("Light2D");
    //.setScrollFactor(0.9, 1);

    this.layerEnfeites = this.tilemap
      .createLayer("enfeites", [this.tilesetRemasterizedEnfeites])
      .setPipeline("Light2D");
    //.setScrollFactor(0.9, 1);

    this.layerConserto = this.tilemap
      .createLayer("conserto", [
        this.tilesetRemasterized,
        this.tilesetRemasterizedEnfeites,
        this.tilesetNewPiskel,
      ])
      .setPipeline("Light2D")
      .setAlpha(0);
    // .setScrollFactor(0.9, 1);

    //animações
    this.anims.create({
      key: "idlecostas",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "idlefrente",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 4,
        end: 5,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "idleesquerda",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 2,
        end: 3,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "idledireita",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 6,
        end: 7,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: "andarcostas",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 28,
        end: 35,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "andarfrente",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 44,
        end: 51,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "andaresquerda",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 36,
        end: 43,
      }),
      frameRate: 11,
      repeat: -1,
    });

    this.anims.create({
      key: "andardireita",
      frames: this.anims.generateFrameNumbers("playerroxo", {
        start: 52,
        end: 59,
      }),
      frameRate: 11,
      repeat: -1,
    });

    //anim porta
    this.anims.create({
      key: "portaabrindo",
      frames: this.anims.generateFrameNumbers("porta", { start: 0, end: 7 }),
      frameRate: 7,
      repeat: 0,
    });

    this.anims.create({
      key: "portafechando",
      frames: this.anims.generateFrameNumbers("porta", { start: 7, end: 0 }),
      frameRate: 7,
      repeat: 0,
    });

    //adicionar porta
    this.porta = this.physics.add.sprite(645, 707, "porta", 0);
    this.porta.setAngle(180);
    this.porta.body.allowGravity = false;

    //faz um grupo para os bigbosses
    this.bigboss = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    });

    //adiciona o bigboss como sprite físico para colidir com o player
    //COMPUTADOR 1, SPRITES DA DIREITA PRA ESQUERDA
    this.bigboss.create(465, 275, "bigboss"); //bigboss 1
    /* this.bigboss.create(452, 260, "bigboss").setSize(40, 10);
      this.bigboss.create(385, 260, "bigboss").setSize(70, 20);
    this.bigboss.create(335, 267, "bigboss").setSize(25, 17);*/

    //COMPUTADOR 2(ABAIXO DO 1), SPRITES DA DIREITA PRA ESQUERDA
    //-62 +160
    this.bigboss.create(403, 435, "bigboss"); //bigboss 2
    /*this.bigboss.create(390, 420, "bigboss").setSize(40, 10);
    this.bigboss.create(323, 420, "bigboss").setSize(70, 20);
    this.bigboss.create(273, 427, "bigboss").setSize(25, 17);*/

    //COMPUTADOR 3(ABAIXO DO 2), SPRITES DA DIREITA PRA ESQUERDA
    //-33 -160
    this.bigboss.create(370, 595, "bigboss"); //bigboss 3
    /*this.bigboss.create(357, 580, "bigboss").setSize(40, 10);
    this.bigboss.create(290, 580, "bigboss").setSize(70, 20);
    this.bigboss.create(240, 587, "bigboss").setSize(25, 17);*/

    //COMPUTADOR 4 (DIREITA DO 3), SPRITES DA DIREITA PRA ESQUERDA
    //+690 X A PARTIR DO 3
    this.bigboss.create(1040, 598, "bigboss"); //bigboss 4, posição alterada
    /*this.bigboss.create(1047, 580, "bigboss").setSize(40, 10);
    this.bigboss.create(980, 580, "bigboss").setSize(70, 20);
    this.bigboss.create(930, 587, "bigboss").setSize(25, 17);*/

    //COMPUTADOR 5 (DIREITA DO 2), SPRITES DA DIREITA PRA ESQUERDA
    //+627 X A PARTIR DO 2
    this.bigboss.create(1008, 443, "bigboss"); //bigboss 5, posição alterada
    /*this.bigboss.create(1017, 420, "bigboss").setSize(40, 10);
    this.bigboss.create(950, 420, "bigboss").setSize(70, 20);
    this.bigboss.create(900, 427, "bigboss").setSize(25, 17);*/

    //COMPUTADOR 6 (DIREITA DO 1), SPRITES DA DIREITA PRA ESQUERDA
    //+500 X A PARTIR DO 1
    this.bigboss.create(950, 282, "bigboss"); //bigboss 6, posiçao alterada
    /*this.bigboss.create(952, 260, "bigboss").setSize(40, 10);
    this.bigboss.create(885, 260, "bigboss").setSize(70, 20);
    this.bigboss.create(835, 267, "bigboss").setSize(25, 17);
    
    //COMPUTADOR 7 (CENTRAL DE CIMA), SPRITES DA DIREITA PRA DIREITA
    this.bigboss.create(770, 203, "bigboss").setSize(30, 20);
    this.bigboss.create(650, 197, "bigboss").setSize(210, 17);
    this.bigboss.create(530,203, "bigboss").setSize(30, 20);
    
    //COMPUTADOR 8 (CENTRAL), SPRITES DA DIREITA PRA DIREITA
    //+160 ABAIXO DO 7
    this.bigboss.create(800, 363, "bigboss").setSize(30, 20);
    this.bigboss.create(650, 357, "bigboss").setSize(270, 17);
    this.bigboss.create(500, 363, "bigboss").setSize(30, 20);
    
    //COMPUTADOR 9 (CENTRAL DE BAIXO), SPRITES DA DIREITA PRA DIREITA
    //+352 Y ABAIXO DO 7 TBM
    this.bigboss.create(770, 555, "bigboss").setSize(30, 20);
    this.bigboss.create(650, 549, "bigboss").setSize(210, 17);
    this.bigboss.create(530, 555, "bigboss").setSize(30, 20);*/

    this.lights.enable().setAmbientColor(0xe0f7ff);

    //console do meio
    this.consolelongo = this.physics.add.sprite(645, 350, "consolelongo");
    this.consolelongo.body.setSize(323, 25).setOffset(0, 27);
    this.consolelongo.body.allowGravity = false;
    this.consolelongo.setImmovable(true);

    this.consolemedio = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    });

    //console de cima centro
    this.consolemedio
      .create(640, 190, "consolemedio")
      .setSize(255, 25)
      .setOffset(0, 27);

    //console de baixo centro
    this.consolemedio
      .create(640, 540, "consolemedio")
      .setSize(255, 25)
      .setOffset(0, 27);

    //console_s da esquerda cima
    this.consoles = this.physics.add.sprite(382, 258, "consoles");
    this.consoles.body.setSize(102, 25).setOffset(0, 27);
    this.consoles.body.allowGravity = false;
    this.consoles.setImmovable(true);

    //console_w da esuqerda cima, com bigboss 1
    this.consolew = this.physics.add.sprite(446, 268, "consolew");
    this.consolew.body.setSize(47, 17).setOffset(15, 20);
    this.consolew.body.allowGravity = false;
    this.consolew.setImmovable(true);

    //console_s da esquerda meio
    this.consoles2 = this.physics.add.sprite(310, 418, "consoles");
    this.consoles2.body.setSize(102, 25).setOffset(0, 27);
    this.consoles2.body.allowGravity = false;
    this.consoles2.setImmovable(true);

    //console_w da esuqerda meio, com bigboss 2
    this.consolew2 = this.physics.add.sprite(385, 429, "consolew");
    this.consolew2.body.setSize(47, 17).setOffset(15, 20);
    this.consolew2.body.allowGravity = false;
    this.consolew2.setImmovable(true);

    //console_s da esquerda baixo
    this.consoles3 = this.physics.add.sprite(278, 580, "consoles");
    this.consoles3.body.setSize(102, 25).setOffset(0, 27);
    this.consoles3.body.allowGravity = false;
    this.consoles3.setImmovable(true);

    //console_w da esuqerda baixo, com bigboss 3
    this.consolew3 = this.physics.add.sprite(350, 587, "consolew");
    this.consolew3.body.setSize(47, 17).setOffset(15, 20);
    this.consolew3.body.allowGravity = false;
    this.consolew3.setImmovable(true);

    //console_s da direita cima
    this.consoles4 = this.physics.add.sprite(863, 261, "consoles");
    this.consoles4.body.setSize(102, 25).setOffset(0, 27);
    this.consoles4.body.allowGravity = false;
    this.consoles4.setImmovable(true);

    //console_w da direita cima, com bigboss 6
    this.consolew4 = this.physics.add.sprite(930, 273, "consolew");
    this.consolew4.body.setSize(47, 17).setOffset(15, 20);
    this.consolew4.body.allowGravity = false;
    this.consolew4.setImmovable(true);

    //console_s da direita meio
    this.consoles5 = this.physics.add.sprite(915, 423, "consoles");
    this.consoles5.body.setSize(102, 25).setOffset(0, 27);
    this.consoles5.body.allowGravity = false;
    this.consoles5.setImmovable(true);

    //console_w da direita meio, com bigboss 5
    this.consolew5 = this.physics.add.sprite(989, 434, "consolew");
    this.consolew5.body.setSize(47, 17).setOffset(15, 20);
    this.consolew5.body.allowGravity = false;
    this.consolew5.setImmovable(true);

    //console_s da direita baixo
    this.consoles6 = this.physics.add.sprite(950, 580, "consoles");
    this.consoles6.body.setSize(102, 25).setOffset(0, 27);
    this.consoles6.body.allowGravity = false;
    this.consoles6.setImmovable(true);

    //console_w da direita baixo, com bigboss 4
    this.consolew6 = this.physics.add.sprite(1022, 590, "consolew");
    this.consolew6.body.setSize(47, 17).setOffset(15, 20);
    this.consolew6.body.allowGravity = false;
    this.consolew6.setImmovable(true);

    //exterior da nave antenas
    this.antenas = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      pipeline: "Light2D",
    });

    this.antenas
      .create(537, 1324, "NewPiskel")
      .setScale(-1, 1)
      .body.setSize(20, 30)
      .setOffset(27, 0);

    this.antenas
      .create(880, 1355, "NewPiskel")
      .setScale(-1, 1)
      .body.setSize(20, 30)
      .setOffset(27, 0);

    this.antenas
      .create(1170, 1327, "NewPiskel")
      .body.setSize(20, 30)
      .setOffset(10, 0);

    this.antenas
      .create(820, 1420, "NewPiskel")
      .setScale(-1, 1)
      .body.setSize(20, 30)
      .setOffset(27, 0);

    this.antenas
      .create(433, 1483, "NewPiskel")
      .body.setSize(20, 30)
      .setOffset(10, 0);

      this.antenas
        .create(880, 1514, "NewPiskel")
        .setScale(-1, 1)
        .body.setSize(20, 30)
        .setOffset(27, 0);

        this.antenas
          .create(175, 1546, "NewPiskel")
          .body.setSize(20, 30)
          .setOffset(10, 0);

    

    //adiciona o player roxo
    this.playerroxo = this.physics.add.sprite(650, 1437, "playerroxo"); //640,290 interior //650, 1437 exterior
    this.playerroxo.body.setSize(25, 10).setOffset(19, 52);
    this.playerroxo.body.allowGravity = false;

    this.physics.add.collider(this.playerroxo, this.layerPiso);
    this.physics.add.collider(this.playerroxo, this.layerParede);
    this.physics.add.collider(this.playerroxo, this.consolelongo);
    this.physics.add.collider(this.playerroxo, this.consolemedio);
    this.physics.add.collider(this.playerroxo, this.consoles);
    this.physics.add.collider(this.playerroxo, this.consoles2);
    this.physics.add.collider(this.playerroxo, this.consoles3);
    this.physics.add.collider(this.playerroxo, this.consoles4);
    this.physics.add.collider(this.playerroxo, this.consoles5);
    this.physics.add.collider(this.playerroxo, this.consoles6);
    this.physics.add.collider(this.playerroxo, this.consolew);
    this.physics.add.collider(this.playerroxo, this.consolew2);
    this.physics.add.collider(this.playerroxo, this.consolew3);
    this.physics.add.collider(this.playerroxo, this.consolew4);
    this.physics.add.collider(this.playerroxo, this.consolew5);
    this.physics.add.collider(this.playerroxo, this.consolew6);
    this.physics.add.collider(this.playerroxo, this.bigboss);
    this.physics.add.collider(this.playerroxo, this.antenas);

    this.layerParede.setCollisionByProperty({ collides: true });

    //camera
    this.cameras.main.startFollow(this.playerroxo, true, 0.1, 0.1); //.zoom = 1.5;
    /*this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );*/

    // Texto de posição do playerroxo atualizado a cada segundo
    this.positionText = this.add
      .text(200, 80, "X: 0 Y: 0", {
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
          `X: ${Math.round(this.playerroxo.x)} Y: ${Math.round(this.playerroxo.y)}`,
        );
      },
    });

    /*this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );*/
  } //fim create

  update() {
    // Captura entrada do teclado
    const cursors = this.input.keyboard.createCursorKeys();
    const wasd = this.input.keyboard.addKeys("W,S,A,D");

    // Captura entrada do gamepad
    const pad =
      this.input.gamepad && this.input.gamepad.total > 0
        ? this.input.gamepad.getPad(0)
        : null;

    let horizontal = 0;
    let vertical = 0;

    // Teclado WASD
    if (wasd.A.isDown) {
      horizontal = -1;
    } else if (wasd.D.isDown) {
      horizontal = 1;
    }

    if (wasd.W.isDown) {
      vertical = -1;
    } else if (wasd.S.isDown) {
      vertical = 1;
    }

    // Gamepad (usando eixos como em scene0, mas adaptado para ortogonal)
    if (pad) {
      if (pad.axes.length > 0) {
        horizontal = pad.axes[0].getValue();
      }
      if (pad.axes.length > 1) {
        vertical = pad.axes[1].getValue();
      }
    }

    // Aplica velocidade
    this.playerroxo.setVelocityX(horizontal * this.speed);
    this.playerroxo.setVelocityY(vertical * this.speed);

    // Animações e som baseado no movimento
    const moving = Math.abs(horizontal) > 0.1 || Math.abs(vertical) > 0.1;

    if (moving) {
      if (!this.passos.isPlaying) this.passos.play();
    } else {
      if (this.passos.isPlaying) this.passos.stop();
    }

    if (horizontal > 0.1) {
      this.playerroxo.anims.play("andardireita", true);
    } else if (horizontal < -0.1) {
      this.playerroxo.anims.play("andaresquerda", true);
    } else if (vertical > 0.1) {
      this.playerroxo.anims.play("andarfrente", true); // assumindo que "andarfrente" é para baixo, ajustar se necessário
    } else if (vertical < -0.1) {
      this.playerroxo.anims.play("andarcostas", true);
    } else {
      // Idle baseado na última direção
      if (this.playerroxo.anims.currentAnim) {
        const currentKey = this.playerroxo.anims.currentAnim.key;
        if (currentKey === "andardireita") {
          this.playerroxo.anims.play("idledireita", true);
        } else if (currentKey === "andaresquerda") {
          this.playerroxo.anims.play("idleesquerda", true);
        } else if (currentKey === "andarfrente") {
          this.playerroxo.anims.play("idlefrente", true);
        } else if (currentKey === "andarcostas") {
          this.playerroxo.anims.play("idlecostas", true);
        }
      }
    }
  }
}

export default scene1;
