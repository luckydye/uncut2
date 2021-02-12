import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Item extends Entity {

    width = 30;
    height = 30;
    static = false;
    collider = false;

    onUpdate() {
        
    }

    onCollision(obj, level) {
        
    }

    onCollect(player) {
        player.height = 90;
        player.width += 20;
        player.position.x -= 10;
        player.mass = 2;
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
