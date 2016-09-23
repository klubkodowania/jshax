export default class {
    collideWith(target) {
        if (this.distanceTo(target) < this.radius + target.radius) {
            if (!this.colliding) {
                this.colliding = true;
                this.setVelocityAfterCollisionWith(target);
                return true;
            }
            else {
                return false;
            }
        }
        else {
            this.colliding = false;
        }

        return false;
    }

    distanceTo(target) {
        var distance = Math.sqrt(((this.body.x - target.body.x) * (this.body.x - target.body.x)) + ((this.body.y - target.body.y) * (this.body.y - target.body.y)));
        if (distance < 0) {
            distance = distance * -1;
        }
        return distance;
    }

    setVelocityAfterCollisionWith(target) {
        const dx = this.body.x - target.body.x;
        const dy = this.body.y - target.body.y;
        const sy = target.speed.y;
        const sx = target.speed.x;
        const collisionAngle = Math.atan2(dy, dx);

        const myMagnitude = Math.sqrt(this.speed.x * this.speed.x + this.speed.y * this.speed.y);
        const targetMagnitude = Math.sqrt(sx * sx + sy * sy);

        const myDirection = Math.atan2(this.speed.y, this.speed.x);
        const targetDirection = Math.atan2(sy, sx);

        const myNewSpeedX = myMagnitude * Math.cos(myDirection - collisionAngle);
        const myNewSpeedY = myMagnitude * Math.sin(myDirection - collisionAngle);

        const targetNewSpeedX = targetMagnitude * Math.cos(targetDirection - collisionAngle);
        const targetNewSpeedY = targetMagnitude * Math.sin(targetDirection - collisionAngle);

        const myFinalSpeed = ((Math.pow(this.radius, 8) - Math.pow(target.radius, 8)) * myNewSpeedX + (Math.pow(target.radius, 8) + Math.pow(target.radius, 8)) * targetNewSpeedX) / (Math.pow(this.radius, 8) + Math.pow(target.radius, 8));
        const targetFinalSpeed = myNewSpeedY;

        this.speed.x = Math.cos(collisionAngle) * myFinalSpeed + Math.cos(collisionAngle + Math.PI / 2) * targetFinalSpeed;
        this.speed.y = Math.sin(collisionAngle) * myFinalSpeed + Math.sin(collisionAngle + Math.PI / 2) * targetFinalSpeed;

        this.body.x += this.speed.x;
        this.body.y += this.speed.y;
    }
}