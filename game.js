class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('scene2'));
    }
}

class Scene2 extends Phaser.Scene {
    constructor() {
        super('scene2');
    }
    create() {
        this.add.text(50,50, "Scene 2 Hi").setFontSize(50);
        this.add.text(50, 100, "Click to go back to scene 1").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('scene1'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Scene1, Scene2],
    title: "Adventure Game",
});