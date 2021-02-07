import Level from "./objects/Level.js";
import Renderer from "./Renderer.js";

export default class Game {

    constructor() {
        this.renderer = new Renderer();
        this.objects = [];

        this.lastTick = null;
        this.accumulator = 0;

        this.tickrate = 1000 / 60;

        this.level = new Level();
    }

    spawn(gameobject) {
        gameobject.onCreate();
        this.objects.push(gameobject);
    }

    draw() {
        this.renderer.draw();
        this.level.draw(this.renderer);
    
        for(let object of this.objects) {
            object.draw(this.renderer);
        }
    }
    
    update(delta) {
        const killlist = [];
        for(let object of this.objects) {
            if(!object.destoryed)
                object.update(delta);
            else
                killlist.push(object);
        }

        for(let object of killlist) {
            this.objects.splice(this.objects.indexOf(object), 1);
        }
    }

    loop(currentTick) {
        if(this.lastTick) {
            const delta = currentTick - this.lastTick;
            this.accumulator += delta;
    
            while(this.accumulator >= this.tickrate) {
                this.accumulator -= this.tickrate;
    
                this.update(this.tickrate);
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