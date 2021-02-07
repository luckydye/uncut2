import Input from "../Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Player extends Entity {

    update(delta, level) {
        super.update(delta, level);

        this.acceleration.multiply(0);

        if(Input.checkKey('a')) {
            this.acceleration.x = -10;
        }
        if(Input.checkKey('d')) {
            this.acceleration.x = 10;
        }
        if(Input.checkKey(' ')) {
            this.acceleration.y = 100;
        }
    }

    draw(renderer) {
        const ctxt = renderer.context;
        ctxt.fillStyle = "white";
        ctxt.fillRect(
            this.position.x,
            this.position.y,
            100, 100
        );
    } 

}
