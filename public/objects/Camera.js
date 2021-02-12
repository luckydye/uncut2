import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Camera extends Entity {

    constructor(optns) {
        super(optns);

        this.width = 640;
        this.height = 380;
        this.static = true;

        this.target = null;
        this.offset = new Vec(-100, -50);

        this.collider = false;

        this.smoothing = new Vec(20, 50);
    }

    setTarget(entity) {
        this.target = entity;
    }

    onUpdate() {
        if(this.target) {
            const distX = (this.position.x + (this.width / 2) + this.offset.x) - this.target.position.x;
            this.position.x -= distX / this.smoothing.x;
            const distY = (this.position.y + (this.height / 2) + this.offset.y) - this.target.position.y;
            this.position.y -= distY / this.smoothing.y;
        }
    }
    
    draw() {

    }

}
