import Input from "../input/Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";
import Item from "./Item.js";

export default class Player extends Entity {

    // static = true;

    constructor() {
        super(...arguments);
        window.player = this;
    }

    onUpdate() {
        if(Input.checkKey('a')) {
            this.acceleration.x = -1.5;
        }
        if(Input.checkKey('d')) {
            this.acceleration.x = 1.5;
        }
        if(Input.checkKey(' ') && this.colliding.bottom && !this.jumped) {
            this.acceleration.y =+ 18;
            this.jumped = true;
        } else if(!Input.checkKey(' ')) {
            this.jumped = false;
        }
    }

    onCollision(obj, level) {
        if(obj instanceof Item) {
            level.remove(obj);
            console.log('Item collected');
        }
    }

    draw(renderer) {
        renderer.drawSprite(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
            "white"
        );

        super.draw(renderer);
    }

}
