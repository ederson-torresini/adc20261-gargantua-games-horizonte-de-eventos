class scene2 extends Phaser.Scene {
  constructor() {
    super("scene2");

    this.engrenagens = 0;
    
  }
  create() {
  

    this.physics.world.gravity.y = 0;

    this.physics.world.setBounds(
      150,
      0,
      800,
      2000,
    );

    this.cameras.main.setBounds(0, 0, 800, 2000);  

  

    this.space = this.add.sprite(0, 0, "space1");
    this.space.setOrigin(0, 0).setScrollFactor(0.9, 0.9);

    this.nave = this.physics.add.sprite(535, 1965, "nave").setScale(0.5)//.body.setGravity(0, 0)//.setAngle(90);
    this.enemy = this.physics.add.group({
      pipeline: "Light2D",
    })

    this.bullets = this.physics.add.group({
      pipeline: "Light2D",
    })

    this.enemy1 = this.enemy.create(212, 1650, "nave").setScale(0.5).setAngle(180).setVelocityX(100);

    setInterval(() => {
      this.enemy1.setVelocityX(this.enemy1.body.velocity.x * -1);
    }, 6800);

    setInterval(() => { 
      this.bullets.create(this.enemy1.x, this.enemy1.y, "torreta", 13).setSize(17,27).setVelocityY(200);
    }, 1133);

    //this.enemy1

    this.nave.setCollideWorldBounds(true);
    //this.enemy.setCollideWorldBounds(true);

    this.cameras.main.startFollow(this.nave, true);

    this.positionText = this.add
      .text(10, 10, "Nave: 0, 0", {
        font: "16px Arial",
        fill: "#ffffff",
      })
      .setScrollFactor(0);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.positionText.setText(
          `Nave: ${Math.round(this.nave.x)}, ${Math.round(this.nave.y)}`
        );
      },
    });
  }

  update() {

    const cursors = this.input.keyboard.createCursorKeys();
    const speed = 200;

    if (cursors.left.isDown) {
      this.nave.setVelocityX(-speed);
      //this.nave.setAngle(-90);
    } else if (cursors.right.isDown) {
      this.nave.setVelocityX(speed);
      //this.nave.setAngle(90);
    } else {
      this.nave.setVelocityX(0);
    }

    if (cursors.up.isDown) {
      this.nave.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      this.nave.setVelocityY(speed);
    } else {
      this.nave.setVelocityY(0);
    }
  }
   
  /*  // add the same image centered on screen
    const cam = this.cameras.main;
    const cx = cam.width / 2;
    const cy = cam.height / 2;
    this.centerImage = this.add.image(cx, cy, "space1");
    this.centerImage.setOrigin(0.5, 0.5).setScrollFactor(0);*/

  }
export default scene2;