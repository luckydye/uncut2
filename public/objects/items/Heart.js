import Sprite from "../../Sprite.js";
import Vec from "../../Vec.js";
import Item from "../Item.js";

export default class Heart extends Item {

    width = 40;
    height = 40;
    static = true;
    collider = false;
    texture = new Sprite("../assets/textures/heart.png", 256, 256, 11, 12);

    onCollect(player) {
        player.texture = new Sprite("../assets/textures/heart.png", 256, 256, 12);
        player.cat = true;
    }

}
