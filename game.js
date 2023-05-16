class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
        
    }
    create() {
        this.add.text(50, 50, "Intro Scene").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to start.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('level1'));
    }
}

class Level1 extends Phaser.Scene {
    player;
    bullet;
    cursors;
    speed;
    keyA;
    keyS;
    keyD;
    keyW;

    constructor(){
        super('level1');
       
    }
    preload ()
    {
        this.load.image('wizard', 'assets/pink pixel wizard.png');
        this.load.image('bullet', 'assets/pixel projectile.png');
        
    }
    create(){
        // let keyA;
        // let keyS;
        // let keyD;
        // let keyW;
        this.player = this.physics.add.image(256, 448, 'wizard');
        this.cursors = this.input.keyboard.createCursorKeys();
        // this.input.keyboard.on('keydown', this.anyKey, this);
        // this.player = this.add.sprite(400, 500, 'wizard').setDepth(1);

        this.speed = Phaser.Math.GetSpeed(300, 1);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        



    }
    update(time, delta){

        if(this.keyW.isDown || this.cursors.up.isDown) {
            console.log('W key pressed');
            this.player.y -= this.speed * delta;
        }
        if(this.keyA.isDown || this.cursors.left.isDown) {
            console.log('A key pressed');
            this.player.x -= this.speed * delta;
        }
        if(this.keyS.isDown || this.cursors.down.isDown) {
            console.log('S key pressed');
            this.player.y += this.speed * delta;
        }
        if(this.keyD.isDown || this.cursors.right.isDown) {
            console.log('D key pressed');
            this.player.x += this.speed * delta;
        }
    }

}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50,50, "Scene 2 Hi").setFontSize(50);
        this.add.text(50, 100, "Click to go back to scene 1").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scene: [Intro, Level1, Outro],
    title: "Adventure Game",
});