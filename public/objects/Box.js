import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Box extends Entity {

    constructor(x, y, width, height) {
        super();

        this.position = new Vec(x, y);
        this.static = true;

        this.width = width;
        this.height = height;
    }

    draw(renderer) {
        renderer.drawSprite(this.position.x, this.position.y, this.width, this.height, "#eee");
        
        super.draw(renderer);
    }    

}
