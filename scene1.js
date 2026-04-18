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

    //preload do tilemap da fase ortogonal (troquei de arquivo pois na salaortogonal tem tilesets que não estão sendo usados e estava dando erro)
    this.load.tilemapTiledJSON("faseortogonal", "mapasv4/faseortogonal.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image(
      "remasterizedEnfeites",
      "assets-usados/remasterizedEnfeites.png",
    );
    this.load.image("NewPiskel", "assets-usados/NewPiskel.png");
    this.load.image("console_s", "assets-usados/console_s.png");
    this.load.image("console_w", "assets-usados/console_w.png");
    this.load.image("tilesetx1", "assets-usados/tilesetx1.png");
    this.load.image("space1", "assets-usados/space1.png");

    //preload do sprite do player roxo
    this.load.spritesheet("playerroxo", "playerroxo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    //adiciona trilha sonora e efeitos sonoros
    this.trilhasonora = this.sound
      .add("trilhasonora", { loop: true, volume: 0 })
      .play();
    this.passos = this.sound.add("passos", { loop: true, volume: 1 });

    //adiciona o espaço ao fundo
    this.space = this.add.image("space1");
    this.space.setOrigin(0, 0).setScrollFactor(0.1, 1);

    //adiciona o tilemap da sala ortogonal
    this.tilemap = this.make.tilemap({ key: "faseortogonal" });

    //adiciona os tilesets utilizados
    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage(
      "remasterizedEnfeites",
    );
    this.tilesetConsoles = this.tilemap.addTilesetImage("console_s");
    this.tilesetConsolew = this.tilemap.addTilesetImage("console_w");
    this.tilesetNewPiskel = this.tilemap.addTilesetImage("NewPiskel");
    this.tilesetx1 = this.tilemap.addTilesetImage("tilesetx1");
    this.tilesetSpace1 = this.tilemap.addTilesetImage("space1");

    //adiciona o layer do piso utilizando o tilesetx1
    this.layerPiso = this.tilemap
      .createLayer("piso", [this.tilesetx1])
      .setScrollFactor(0.9, 1);

    this.layerParede = this.tilemap
      .createLayer("parede", [this.tilesetx1])
      .setScrollFactor(0.9, 1);

    this.layerComp1 = this.tilemap
      .createLayer("comp1", [this.tilesetConsolew])
      .setScrollFactor(0.9, 1);

    this.layerComp2 = this.tilemap
      .createLayer("comp2", [this.tilesetConsoles])
      .setScrollFactor(0.9, 1);
    
    this.layerComp3 = this.tilemap
      .createLayer("comp3", [this.tilesetConsoles, this.tilesetConsolew])
      .setScrollFactor(0.9, 1);

    this.layerEspaco = this.tilemap
      .createLayer("espaco", [this.tilesetSpace1])
      .setScrollFactor(0.9, 1);

    this.layerNave = this.tilemap
      .createLayer("nave", [this.tilesetRemasterized])
      .setScrollFactor(0.9, 1);

    this.layerEnfeites = this.tilemap
      .createLayer("enfeites", [this.tilesetRemasterizedEnfeites])
      .setScrollFactor(0.9, 1);

    this.layerConserto = this.tilemap
      .createLayer("conserto", [
        this.tilesetRemasterized,
        this.tilesetRemasterizedEnfeites,
        this.tilesetNewPiskel,
      ])
      .setScrollFactor(0.9, 1);

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

    //adiciona o player roxo
    this.playerroxo = this.physics.add.sprite(640, 290, "playerroxo");

    // this.playerroxo.setCollideWorldBounds(true);
    //this.physics.add.collider(this.playerroxo, this.layerPiso);
    // this.physics.add.collider(this.playerroxo, this.layerParede);

    this.playerroxo.body.allowGravity = false;

    //camera
    this.cameras.main.startFollow(this.playerroxo, true, 0.1, 0.1);
    this.cameras.main.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

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
