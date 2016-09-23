import PIXI from 'pixi.js'
import Controller from '../controller/controller'
import GameObject from "../game/gameObject";

export default class extends GameObject {
    constructor(config) {
        super(config);

        this.texture = config.texture;
        this.radius = 16;
        this.speed = {
            x: 0,
            y: 0
        };
        this.setup();
    }

    setup() {
        this.body = new PIXI.Sprite(
            PIXI.loader.resources[this.texture].texture
        );
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;
        this.body.x = 200;
        this.body.y = 200;
        this.body.speed = 0;

        this.bindMovement();
    }

    update(collision = () => {}) {
        if(collision()) {
            return;
        }
        this.speed = this.controller.getSpeed();
        this.move();
    }
    
    move() {
        this.body.x += this.speed.x;
        this.body.y -= this.speed.y;
    }

    bindMovement() {
        this.controller = new Controller(this.body);
    }
}