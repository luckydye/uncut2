import Level from "./objects/Level.js";
import Renderer from "./Renderer.js";

export default class Game {

    get objects() {
        return this.level.objects;
    }

    constructor() {
        this.renderer = new Renderer();
        this.level = new Level();

        this.lastTick = null;
        this.accumulator = 0;

        this.tickrate = 1000 / 60;
        this.timescale = 0.1;
    }

    draw() {
        this.renderer.draw(this.level.camera);
        this.level.draw(this.renderer);
    }
    
    update(delta) {
        this.level.update(delta);
    }

    loop(currentTick) {
        if(this.lastTick) {
            const delta = currentTick - this.lastTick;
            this.accumulator += delta;
    
            while(this.accumulator >= this.tickrate) {
                this.accumulator -= this.tickrate;
    
                this.update(this.tickrate * this.timescale);
            }
    
            this.draw();
        }
    
        window.requestAnimationFrame(ms => this.loop(ms));
        this.lastTick = currentTick;
    }

    run() {
        this.loop();
    }
}
