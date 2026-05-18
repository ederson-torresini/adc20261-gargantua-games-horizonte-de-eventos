class gameover1 extends Phaser.Scene {
  constructor() {
    super("gameover1");
  }
  preload() {
    this.load.image("terminal", "assets/terminal.png");
  }

  create() {
    const bg = this.add.image(0, 0, "terminal").setOrigin(0, 0).setDepth(0);
    const imageRatio = bg.width / bg.height;
    const screenRatio = this.scale.width / this.scale.height;

    let displayWidth = this.scale.width;
    let displayHeight = this.scale.height;

    if (screenRatio > imageRatio) {
      displayWidth = this.scale.height * imageRatio;
      displayHeight = this.scale.height;
    } else {
      displayWidth = this.scale.width;
      displayHeight = this.scale.width / imageRatio;
    }

    bg.setDisplaySize(displayWidth, displayHeight);
    bg.setPosition(
      (this.scale.width - displayWidth) / 2,
      (this.scale.height - displayHeight) / 2,
    );
    //this.terminal = this.add.image(200, 0, "terminal").setOrigin(0, 0);

    const fullText = "SIMULAÇÃO FRACASSADA";
    let displayedText = "";
    let charIndex = 0;

    this.text2 = this.add.text(325, 170, "", {
      fontFamily: "news-gothic-bold",
      fontSize: "33px",
      fill: "#63ff8a",
    });

    const typeChar = () => {
      if (charIndex < fullText.length) {
        displayedText += fullText[charIndex];
        this.text2.setText(displayedText);
        charIndex++;
        this.time.delayedCall(100, typeChar);
      }
    };

    typeChar();
  }

  update() {}
}
export default gameover1;
