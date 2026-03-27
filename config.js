var config = {
  type: Phaser.AUTO,
  width: 820,
  height: 480,
  input: {
    gamepad: true,
  },
  parent: "game-container",
  physics:{
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 900 },
      debug: false,
    } 
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

export default config;