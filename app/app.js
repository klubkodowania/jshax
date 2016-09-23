import PIXI from "pixi.js";

class Game {
    constructor(props) {
        this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
        this.gameContainer = document.body;
        this.player = props.player;
        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);
    }

    init() {
        this.gameContainer.appendChild(this.renderer.view);
        this.stage.addChild(this.player.body);
    }

    loop() {
        window.requestAnimationFrame(this.loop.bind(this));

        this.player.update();

        this.renderer.render(this.stage);
    }
}

class Player {
    constructor() {
        this.texture = PIXI.Texture.fromImage('sprites/footballer.png');
        this.body = new PIXI.Sprite(this.texture);

        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;

        this.body.position.x = 200;
        this.body.position.y = 150;

        this.keys = {
            up: false,
            down: false,
            right: false,
            left: false,
            space: false
        };

        this.velocity = {
            x: 0,
            y: 0
        };

        this.speed = 0;
        this.speedUpStep = 0.5;
        this.slowDownStep = 0.3;
        this.maxSpeed = 10;
        
        this.addListeners();
    }
    
    addListeners() {
        window.addEventListener("keydown", (event) => {
            switch (event.keyCode) {
                case 38:
                    this.keys.up = true;
                    break;
                case 40:
                    this.keys.down = true;
                    break;
                case 37:
                    this.keys.left = true;
                    break;
                case 39:
                    this.keys.right = true;
                    break;
                case 32:
                    this.keys.space = true;
                    break
            }
        });

        window.addEventListener("keyup", (event) => {
            switch (event.keyCode) {
                case 38:
                    this.keys.up = false;
                    break;
                case 40:
                    this.keys.down = false;
                    break;
                case 37:
                    this.keys.left = false;
                    break;
                case 39:
                    this.keys.right = false;
                    break;
                case 32:
                    this.keys.space = false;
                    break
            }
        });
    }

    update() {
        if(this.keys.right){
            this.body.rotation += 0.1;
        }
        if(this.keys.left){
            this.body.rotation -= 0.1;
        }
        if(this.keys.up) {
            this.increaseVelocity();
        }
        if(this.keys.down) {
            this.decreaseVelocity();
        }

        this.move();
    }

    move() {
        this.body.position.x += this.velocity.x;
        this.body.position.y += this.velocity.y;
        this.decreaseVelocity();
    }

    increaseVelocity() {
        this.speedUp();
        this.velocity = getVectorRectangularCoordinates(this.speed, this.body.rotation);
    }

    decreaseVelocity() {
        this.slowDown();
        this.velocity = getVectorRectangularCoordinates(this.speed, this.body.rotation);
    }

    slowDown() {
        if(this.speed > 0) {
            this.speed -= this.slowDownStep;
        }
        if(this.speed < 0) {
            this.speed = 0;
        }
    }

    speedUp() {
        if(this.speed < this.maxSpeed) {
            this.speed += this.speedUpStep;
        }
        if(this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    }
}

const game = new Game({
    player: new Player()
});

game.init();
game.loop();

function deg2rad(degrees) {
    return degrees * (Math.PI / 180);
}

function rad2deg(radians) {
    return radians * (180/ Math.PI);
}

function getVectorRectangularCoordinates(length, radians) {
    return {x: length * Math.cos(radians), y: length * Math.sin(radians)};
}