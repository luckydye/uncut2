import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Item extends Entity {

    width = 40;
    height = 40;
    static = false;
    collider = false;

    onUpdate() {
        
    }

    onCollision(obj, level) {
        
    }

    onCollect(player) {
        player.height = 90;
    }

    draw(renderer) {
        const ctxt = renderer.context;
        ctxt.fillStyle = "hsl(0deg, 0%, 65%)";
        ctxt.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        // super.draw(renderer);
    }

}
