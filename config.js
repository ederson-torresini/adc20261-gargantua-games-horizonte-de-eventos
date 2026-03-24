var config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 736,
  parent: "game-container",
  physics:{
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: true
    } 
  },
};

export default config;