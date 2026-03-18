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
    this.load.spritesheet("player", "assets/player.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("buttons", "assets/buttons.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.plugin("rexvirtualjoystickplugin", "./rexvirtualjoystickplugin.min.js", true);

    this.load.audio("epic", "assets/epic.mp3");
    this.load.audio("dindin", "assets/dindin.mp3");

  }


  create() {

    this.epic = this.sound.add("epic", { loop: true }).play();
    this.dindin = this.sound.add("dindin");

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

    this.buttons = this.add.sprite(700, 450, "buttons", 10)
      .setInteractive()
      .on("pointerdown", () => { this.buttons.setFrame(11); })
      .on("pointerup", () => {
        this.buttons.setFrame(10);
        this.money += 10;
        this.textMoney.setText(`Money: ${this.money}`);
        this.dindin.play();
       });

    this.textMoney = this.add.text(16, 16, `Money: ${this.money}`, { fontSize: '32px', fill: '#17bd20' });

    this.textTime = this.add.text(16, 50, `Time: ${this.timer}`, { fontSize: '32px', fill: '#1764bd' });
    setInterval(() => { 
      this.timer -= 1;
      this.textTime.setText(`Time: ${this.timer}`);
      this.money += 1;
      this.textMoney.setText(`Money: ${this.money}`);
      /*if (this.timer <= 0 && this.money < 1000) {
        this.scene.stop();
      }*/
    }, 500);
    
    this.player.setCollideWorldBounds(true);
  }
}

export default scene0;
