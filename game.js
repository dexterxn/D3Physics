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
    boulder;

    constructor(){
        super('level1');
       
    }
    preload ()
    {
        this.load.setPath('assets/');

        this.load.image('wizard', 'pink pixel wizard.png');
        this.load.image('bullet', 'pixel projectile.png');
        this.load.image('square', 'block.png');
        
    }
    // create(){
    //     // let keyA;
    //     // let keyS;
    //     // let keyD;
    //     // let keyW;
        

    //     this.player = this.physics.add.sprite(256, 448, 'wizard').setBounce(0.2).setCollideWorldBounds(true);
    //     this.boulder = this.physics.add.sprite(500, 450, 'square').setBounce(0.2).setCollideWorldBounds(true);

        
    //     this.cursors = this.input.keyboard.createCursorKeys();

    //     this.physics.add.collider(this.player, this.boulder);   
    //     this.physics.add.collider(this.boulder, this.player);

    //     this.speed = Phaser.Math.GetSpeed(300, 1);

    //     this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //     this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    //     this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    //     this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // }
    // update(time, delta){

    //     if(this.keyW.isDown || this.cursors.up.isDown) {
    //         console.log('W key pressed');
    //         this.player.y -= this.speed * delta;
    //     }
    //     if(this.keyA.isDown || this.cursors.left.isDown) {
    //         console.log('A key pressed');
    //         this.player.x -= this.speed * delta;
    //     }
    //     if(this.keyS.isDown || this.cursors.down.isDown) {
    //         console.log('S key pressed');
    //         this.player.y += this.speed * delta;
    //     }
    //     if(this.keyD.isDown || this.cursors.right.isDown) {
    //         console.log('D key pressed');
    //         this.player.x += this.speed * delta;
    //     }
    // }

    create ()
    {


        this.player = this.physics.add.sprite(100, 450, 'wizard').setBounce(0.2).setCollideWorldBounds(true);
        this.boulder = this.physics.add.sprite(500, 450, 'square').setBounce(0.0).setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player, this.boulder);

        this.speed = Phaser.Math.GetSpeed(300, 1);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update (time, delta)
    {
        if(!this.cursors.left.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-160);

        }
        if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

        }
        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-160);

        }
        if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(160);

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