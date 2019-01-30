var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 1000 }
        }
    },
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};

var game = new Phaser.Game(config);

var jugador;

var arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -530;

function preload() {
    this.load.spritesheet('personaje1', 'assets/sprites/personaje1.png', { frameWidth: 57, frameHeight: 62 });
}

function create() {
    jugador = this.physics.add.sprite(100,100,'personaje1',0);
    jugador.setCollideWorldBounds(true);

    this.anims.create({
        key: 'caminar',
        frames: this.anims.generateFrameNumbers('personaje1', { start: 1, end: 8 }),
        frameRate: 10
    });

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}

function update() {
    jugador.body.setVelocityX(0);

    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipX = true;
    }

    if(derecha.isDown){
        jugador.body.setVelocityX(velocidad);
        jugador.flipX = false;
    }

    if(arriba.isDown && jugador.body.onFloor()){
        jugador.body.setVelocityY(alturaSalto);
    }

    if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
        jugador.anims.play('caminar',true);
    }else if(!jugador.body.onFloor()){
        jugador.setFrame(9);
    }else{
        jugador.setFrame(0);
    }
    
}