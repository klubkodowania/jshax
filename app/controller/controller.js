import Key from './key'

export default class {
    constructor(owner) {
        this.owner = owner;
        this.direction = 0;
        this.speedStep = 0.2;
        this.speed = {
            x: 0,
            y: 0
        };
        this.maxSpeed = 5;
        this.keyCodes = {
            left: 37,
            up: 38,
            right: 39,
            down: 40
        };
        this.owner.controllers = {
            left: new Key(this.keyCodes.left),
            up: new Key(this.keyCodes.up),
            right: new Key(this.keyCodes.right),
            down: new Key(this.keyCodes.down)
        };
    }

    getSpeed() {
        const controllers = this.owner.controllers,
            left = controllers.left,
            right = controllers.right,
            up = controllers.up,
            down = controllers.down;


        if (up.isDown) this.increaseSpeed("y");
        if (down.isDown) this.decreaseSpeed("y");
        if (right.isDown) this.increaseSpeed("x");
        if (left.isDown) this.decreaseSpeed("x");

        if(up.isUp && down.isUp) this.slowDown("y");
        if(right.isUp && left.isUp) this.slowDown("x");

        this.speed = {
            x: Math.round(this.speed.x * 1e4) / 1e4,
            y: Math.round(this.speed.y * 1e4) / 1e4
        };

        console.log(this.speed)

        return this.speed;
    }

    increaseSpeed(axis) {
        if (this.speed[axis] <= this.maxSpeed) {
            this.speed[axis] += this.speedStep;
        }
    }

    decreaseSpeed(axis) {
        if (this.speed[axis] >= -this.maxSpeed) {
            this.speed[axis] -= this.speedStep;
        }
    }

    slowDown(axis) {
        if(this.speed[axis] > 0) {
            this.speed[axis] -= this.speedStep / 2;
        }
        else if(this.speed[axis] < 0) {
            this.speed[axis] += this.speedStep / 2;
        }

    }
}