import PIXI from 'pixi.js';
import GameObject from "../game/gameObject";

export default class extends GameObject {
    constructor(config) {
        super(config);
        this.texture = config.texture;
        this.speed = {
            x: 1,
            y: 1
        };
        this.radius = 10;
        this.setup();
    }

    setup() {
        this.body = new PIXI.Sprite(
            PIXI.loader.resources[this.texture].texture
        );
        this.body.anchor.x = 0.5;
        this.body.anchor.y = 0.5;
        this.body.x = 300;
        this.body.y = 300;
        this.body.speed = 0;

    }

    update(collision = () => {}) {
        if(collision()) {
            return;
        }

        this.body.x += this.speed.x;
        this.body.y -= this.speed.y;

        // bounce on edges
        if (this.body.x >= 800 - this.radius && this.speed.x > 0) this.speed.x = -this.speed.x;
        if (this.body.x <= this.radius && this.speed.x < 0) this.speed.x = -this.speed.x;
        if (this.body.y >= 600 - this.radius && this.speed.y < 0) this.speed.y = -this.speed.y;
        if (this.body.y <= this.radius && this.speed.y > 0) this.speed.y = -this.speed.y;

    }

}