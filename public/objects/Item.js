import Sprite from "../Sprite.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Item extends Entity {

    width = 40;
    height = 40;
    static = false;
    collider = false;
    texture = new Sprite("../assets/textures/item_1.png", 256, 256, 3);

    onUpdate() {
        
    }

    onCollision(obj, level) {
        
    }

    onCollect(player) {
        player.height = 90;
        player.width += 20;
        player.position.x -= 10;
        player.mass = 2;
        player.cat = true;
    }

    draw(renderer) {
        renderer.drawSprite(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
            this.texture
        );

        // super.draw(renderer);
    }

}
