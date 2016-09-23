import PIXI from 'pixi.js'

export default class {
    constructor() {
        this.width = 800;
        this.height = 600;
        this.background = 0x5CD15C;
        this.renderer = undefined;
        this.stage = undefined;

        this.initialize();
    }

    initialize() {
        this.renderer = new PIXI.WebGLRenderer(this.width, this.height);
        this.renderer.backgroundColor = this.background;
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();
        this.renderer.render(this.stage);
    }
}