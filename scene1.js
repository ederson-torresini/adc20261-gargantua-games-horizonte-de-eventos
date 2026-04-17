class scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");

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
    
    //preload o asset do espaço ao fundo
    this.load.image("space", "assets-usados/space1.png", {
      frameWidth: 1536,
      frameHeight: 3000,
    });

    /*this.load.spritesheet("gargantua", "assets-usados/gargantua.png", {
      frameWidth: 320,
      frameHeight: 320,
    });*/

    //preload do tilemap da fase ortogonal (troquei de arquivo pois na salaortogonal tem tilesets que não estão sendo usados e estava dando erro) 
    this.load.tilemapTiledJSON("faseortogonal", "mapasv4/faseortogonal.json");

    this.load.image("remasterized", "assets-usados/remasterized.png");
    this.load.image("remasterizedEnfeites", "assets-usados/remasterizedEnfeites.png",);
    this.load.image("newPiskel", "assets-usados/NewPiskel.png");
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
    this.trilhasonora = this.sound.add("trilhasonora", { loop: true, volume: 0 }).play();
    this.passos = this.sound.add("passos", { loop: true, volume: 1 });

    //adiciona o espaço ao fundo
    this.space = this.add.image(100, 800, "space");
    this.space
      .setPipeline("Light2D")
      .setOrigin(0, 0)
      .setScrollFactor(0.1, 1);
    
    //adiciona o tilemap da sala ortogonal
    this.tilemap = this.make.tilemap({ key: "salaortogonal" });

    //adiciona os tilesets utilizados
    this.tilesetRemasterized = this.tilemap.addTilesetImage("remasterized");
    this.tilesetRemasterizedEnfeites = this.tilemap.addTilesetImage("remasterizedEnfeites",);
    this.tilesetConsoles = this.tilemap.addTilesetImage("console_s");
    this.tilesetConsolew = this.tilemap.addTilesetImage("console_w");
    this.tilesetNewPiskel = this.tilemap.addTilesetImage("newPiskel");
    this.tilesetx1 = this.tilemap.addTilesetImage("tilesetx1");
    this.tilesetSpace1 = this.tilemap.addTilesetImage("space1");

    //adiciona o layer do piso utilizando o tilesetx1
    this.layerPiso = this.tilemap
      .createLayer("piso", [this.tilesetx1])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.layerParede = this.tilemap
      .createLayer("parede", [this.tilesetx1])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
  
    this.layerComp1 = this.tilemap
      .createLayer("comp1", [this.tilesetConsolew])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.layerComp2 = this.tilemap
      .createLayer("comp2", [this.tilesetConsoles])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.layerEspaco = this.tilemap
      .createLayer("espaco", [this.tilesetSpace1])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
  
    this.layerNave = this.tilemap
      .createLayer("nave", [this.tilesetRemasterized])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.layerEnfeites = this.tilemap
      .createLayer("enfeites", [this.tilesetRemasterizedEnfeites])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.layerConserto = this.tilemap
      .createLayer("conserto", [this.tilesetRemasterized, this.tilesetRemasterizedEnfeites, this.tilesetNewPiskel])
      .setPipeline("Light2D")
      .setScrollFactor(0.9, 1);
    
    this.physics.world.setBounds(
      0,
      0,
      this.tilemap.widthInPixels,
      this.tilemap.heightInPixels,
    );

    this.cameras.main.setBounds(10, 0, this.tilemap.widthInPixels);
  
  }//fim create

}


export default scene1;
  
  