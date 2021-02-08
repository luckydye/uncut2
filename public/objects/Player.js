import Input from "../input/Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";
import Item from "./Item.js";

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
        }
    }

    onCollision(obj, level) {
        if(obj instanceof Item) {
            level.remove(obj);
            console.log('Item collected');
        }
    }

    draw(renderer) {
        const ctxt = renderer.context;
        ctxt.fillStyle = "hsl(0deg, 0%, 75%)";
        ctxt.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        // super.draw(renderer);
    }

}
