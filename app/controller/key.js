export default class {
    constructor(keyCode) {
        this.isUp = true;
        this.isDown = false;
        this.keyCode = keyCode;

        this.bindListeners();
    }

    bindListeners() {
        window.addEventListener('keydown', (event) => {
            if(event.keyCode === this.keyCode) {
                this.onKeyPressed();
            }
        }, false);
        window.addEventListener('keyup', (event) => {
            if(event.keyCode === this.keyCode) {
                this.onKeyReleased();
            }
        }, false);
    }

    onKeyPressed() {
        this.isDown = true;
        this.isUp = false;
    }

    onKeyReleased() {
        this.isDown = false;
        this.isUp = true;
    }
}