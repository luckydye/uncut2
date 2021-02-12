import Input from "../input/Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";
import Item from "./Item.js";

let jumpTimer;

export default class Player extends Entity {

    // static = true;

    onUpdate() {
        if(Input.checkKey('a')) {
            this.acceleration.x = -1.5;
        }
        if(Input.checkKey('d')) {
            this.acceleration.x = 1.5;
        }
        if(Input.checkKey(' ') && !this.airborn) {
            this.acceleration.y =+ 13;
            this.airborn = true;
            clearTimeout(jumpTimer);
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

        // super.draw(renderer);
    }

}
