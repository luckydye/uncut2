import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Item extends Entity {

    width = 40;
    height = 40;
    static = false;
    collider = false;
    textureImage = "../assets/textures/item_1.png";

    onUpdate() {
        
    }

    onCollision(obj, level) {
        
    }

    onCollect(player) {
        player.height = 90;
        player.width += 40;
        player.position.x -= 20;
        player.mass = 2;
        player.cat = true;
    }

    draw(renderer) {
        let color = "hsl(0deg, 0%, 65%)";
        if(this.texture) {
            color = this.texture;
        }
        renderer.drawSprite(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
            color
        );

        // super.draw(renderer);
    }

}
