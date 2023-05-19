class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
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
            frameQuantity: 5,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        const bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}

class Example extends Phaser.Scene
{
    cursors;
    constructor ()
    {
        super();

        this.bullets;
        this.ship;
    }

    preload ()
    {
        this.load.image('bullet', 'assets/sprites/bullets/bullet7.png');
        this.load.image('ship', 'assets/sprites/bsquadron1.png');
    }

    create ()
    {
        this.bullets = new Bullets(this);

        this.ship = this.add.image(400, 500, 'ship');

        // this.input.on('pointermove', (pointer) =>
        // {

        //     this.ship.x = pointer.x;
        //     this.ship.y = pointer.y;

        // });
        this.cursors = this.input.keyboard.createCursorKeys();


        this.input.on('pointerdown', (pointer) =>
        {

            this.bullets.fireBullet(this.ship.x, this.ship.y);

        });
    }
    update (time, delta)
    {   
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-300);
        }
        if (this.cursors.right.isDown){
            this.player.setVelocityX(300);
        }
        if (this.cursors.up.isDown){
            this.player.setVelocityY(-300);
        }
        if (this.cursors.down.isDown ){
            this.player.setVelocityY(300);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);
