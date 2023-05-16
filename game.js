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

    constructor(){
        super('level1');
    }
    preload ()
    {
        this.load.image('wizard', 'assets/pink pixel wizard.png');
        this.load.image('bullet', 'assets/pixel projectile.png');
    }
    create(){
        this.player = this.physics.add.image(256, 448, 'wizard');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.keyboard.on('keydown', this.anyKey, this);
        // this.player = this.add.sprite(400, 500, 'wizard').setDepth(1);

        this.speed = Phaser.Math.GetSpeed(300, 1);



    }
    update(time, delta){
        if (this.cursors.left.isDown)
        {
            this.player.x -= this.speed * delta;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x += this.speed * delta;
        }
        else if (this.cursors.up.isDown)
        {
            this.player.y -= this.speed * delta;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.y += this.speed * delta;
        }
    }

    moveUp(){
        console.log("pressing W");
        this.player.y -= 3;
    }
    moveLeft(){
        console.log("pressing A");
        this.player.x -= 3;
    }
    moveDown(){
        console.log("pressing S");
        this.player.y += 3;
    }
    moveRight(){
        console.log("pressing D");
        this.player.x += 3;
    }

    anyKey (event)
    {
        //  Only allow A-Z . and -

        let code = event.keyCode;

        if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z)
        {
            code -= 65;

            let y = Math.floor(code / 10);
            let x = code - (y * 10);

            console.log('pressing' + code );
            if(code == 22){
                this.moveUp();
            }
            if(code == 0){
                this.moveLeft();
            }
            if(code == 18){
                this.moveDown();
            }
            if(code == 3){
                this.moveRight();
            }
            // WASD = 22, 0, 18, 3

        }
    }

    // update(time,delta){
    //     if (this.cursors.right.isDown)
    //     {
    //         this.player.x += this.speed * delta;
    //     }
    //     else if (this.cursors.up.isDown)
    //     {
    //         this.player.y -= this.speed * delta;
    //     }
    //     else if (this.cursors.down.isDown)
    //     {
    //         this.player.y += this.speed * delta;
    //     }
    // }
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