import Vec from "../Vec.js";
import Camera from "./Camera.js";
import Entity from "./Entity.js";

export default class Level {

    constructor() {
        this.objects = [];

        this.attributes = {
            gravity: -9.81
        }

        this.camera = new Camera();
        this.world = new Vec();
    }

    getOrigin() {
        return this.world;
    }

    add(gameObject) {
        gameObject.onCreate();
        this.objects.push(gameObject);
    }

    remove(gameObject) {
        gameObject.destory();
    }

    draw(renderer) {
        renderer.context.translate(
            this.world.x,
            this.world.y
        );

        for(let object of this.objects) {
            object.draw(renderer);
        }
    }

    update(delta) {
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

        const colliders = this.objects.filter(obj => {
            return obj instanceof Entity;
        });
        for(let obj1 of colliders) {
            for(let obj2 of colliders) {
                if(obj1 !== obj2) {
                    const int = this.checkIntersections(obj1, obj2);
                    if(int) {
                        obj1.onCollision(obj2);
                    }
                }
            }   
        }
    }

    checkIntersections(obj1, obj2) {
        const r1 = obj1.getBoundingBox();
        const r2 = obj2.getBoundingBox();
        
        return !(r2.left > r1.right || 
                r2.right < r1.left || 
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
    }

}
