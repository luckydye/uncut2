import Vec from "../Vec.js";
import Camera from "./Camera.js";
import Entity from "./Entity.js";

export default class Level {

    get camera() {
        return this.activeCamera;
    }

    constructor() {
        this.attributes = {
            gravity: 0.981
        }

        this.objects = [
            new Camera()
        ];
        this.activeCamera = this.objects[0];
    }

    add(gameObject) {
        gameObject.onCreate();
        this.objects.push(gameObject);
    }

    remove(gameObject) {
        gameObject.destory();
    }

    draw(renderer) {
        for(let object of this.objects) {
            object.draw(renderer);
        }
    }

    update(delta) {
        // update all
        const killlist = [];
        for(let object of this.objects) {
            if(!object.destoryed)
                object.update(delta, this);
            else
                killlist.push(object);
        }
        for(let object of killlist) {
            this.objects.splice(this.objects.indexOf(object), 1);
        }
    }

}
