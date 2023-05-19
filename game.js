class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y, dx, dy)
    {

        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        let angle = Phaser.Math.Angle.Between(x,y,dx,dy);

        let xR = Math.cos(angle);
        let yR = Math.sin(angle);

        this.setVelocity(xR*300,yR*300);        
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 30,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, dx, dy)
    {
        const bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, dx, dy);
        }
    }
}

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
    keyP;
    boulder;
    inZone = false;
    temp = 0;

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

    create ()
    {
        this.player = this.physics.add.sprite(100, 450, 'wizard').setBounce(0.2).setCollideWorldBounds(true);
        this.boulder = this.physics.add.sprite(500, 450, 'square').setBounce(0.2).setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.text(50, 50, "You can Move Boulders around by pushing them! Give it a Try.").setFontSize(50);
        this.add.text(50, 100, "Use WASD or Arrow Keys to move around.").setFontSize(50);

        this.player.body.onCollide = true;

        this.physics.add.collider(this.player, this.boulder);
        this.physics.add.collider(this.boulder, this.player);
        
        this.physics.world.on('collide', () =>
        { 
            console.log("Player Touched the Boulder!");
            this.add.text(50, 150, "Click 'p' to move onto the next level.").setFontSize(30);            
        });

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update (time, delta)
    {   
        if(!this.cursors.left.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.keyP.isDown){
            this.scene.start('level2');
        }
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-300);

        }
        if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(300);

        }
        if (this.cursors.up.isDown || this.keyW.isDown)
        {
            this.player.setVelocityY(-300);

        }
        if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.player.setVelocityY(300);

        }
    }

}

class Level2 extends Phaser.Scene {
    player;
    bullet;
    cursors;
    speed;
    keyA;
    keyS;
    keyD;
    keyW;
    boulder;
    inZone = false;

    constructor(){
        super('level2');
       
    }
    preload ()
    {
        this.load.setPath('assets/');

        this.load.image('wizard', 'pink pixel wizard.png');
        this.load.image('bullet', 'pixel projectile.png');
        this.load.image('square', 'block.png');
        
    }

    create ()
    {

        this.bullets = new Bullets(this);

        this.player = this.physics.add.sprite(100, 450, 'wizard').setBounce(0.2).setCollideWorldBounds(true);
        this.boulder = this.physics.add.sprite(500, 450, 'square').setBounce(0.2).setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.text(50, 50, "Level 2 ").setFontSize(50);
        this.add.text(50, 100, "Click to shoot projectiles").setFontSize(50);

        this.player.body.onCollide = true;

        this.physics.add.collider(this.player, this.boulder);
        this.physics.add.collider(this.boulder, this.player);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        this.input.on('pointerdown', (pointer) =>

        {
            this.bullets.fireBullet(this.player.x, this.player.y, pointer.x, pointer.y);

        });

        let angle = 0;

        // this.input.on('pointermove', (pointer) =>
        // {
        //     angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        //     this.player.rotation = angle +90;
        // });
        
    }

    update (time, delta)
    {   
        if(!this.cursors.left.isDown){
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        if(this.keyP.isDown){
            this.scene.start('level3');
        }
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-300);

        }
        if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(300);

        }
        if (this.cursors.up.isDown || this.keyW.isDown)
        {
            this.player.setVelocityY(-300);

        }
        if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.player.setVelocityY(300);

        }
    }

}

class Level3 extends Phaser.Scene {
    player;
    bullet;
    cursors;
    speed;
    keyA;
    keyS;
    keyD;
    keyW;
    boulder;
    inZone = false;

    constructor(){
        super('level3');
       
    }
    preload ()
    {
        this.load.setPath('assets/');

        this.load.image('wizard', 'pink pixel wizard.png');
        this.load.image('bullet', 'pixel projectile.png');
        this.load.image('square', 'block.png');
        
    }

    create ()
    {


        this.player = this.physics.add.sprite(100, 450, 'wizard').setBounce(0.2).setCollideWorldBounds(true);
        this.boulder = this.physics.add.sprite(500, 450, 'square').setBounce(0.2).setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.add.text(50, 50, "Level 3").setFontSize(50);
        this.add.text(50, 100, "Watch out for the slippery ground!").setFontSize(50);

        this.player.body.onCollide = true;

        this.physics.add.collider(this.player, this.boulder);
        this.physics.add.collider(this.boulder, this.player);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    update (time, delta)
    {   
        // if(!this.cursors.left.isDown){
        //     this.player.setVelocityX(0);
        //     this.player.setVelocityY(0);
        // }
        if(this.keyP.isDown){
            this.scene.start('outro');
        }
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-300);

        }
        if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(300);

        }
        if (this.cursors.up.isDown || this.keyW.isDown)
        {
            this.player.setVelocityY(-300);

        }
        if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.player.setVelocityY(300);

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
    scene: [Intro, Level1, Level2, Level3, Outro],
    title: "Adventure Game",
});