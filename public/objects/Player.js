import Input from "../input/Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";

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
            this.acceleration.y =+ 15;
            this.airborn = true;
        }
    }

    onCollision() {
        
    }

    draw(renderer) {
        const ctxt = renderer.context;
        ctxt.fillStyle = "white";
        ctxt.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        super.draw(renderer);
    }

}
