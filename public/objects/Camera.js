import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Camera extends Entity {

    constructor(optns) {
        super(optns);

        this.width = 640;
        this.height = 380;
        this.static = true;

        this.target = null;
        this.offset = new Vec(-100, -100);

        this.collider = false;
    }

    setTarget(entity) {
        this.target = entity;
    }

    onUpdate() {
        if(this.target) {
            const distX = (this.position.x + (this.width / 2) + this.offset.x) - this.target.position.x;
            this.position.x -= distX / 50;
            const distY = (this.position.y + (this.height / 2) + this.offset.y) - this.target.position.y;
            this.position.y -= distY / 30;
        }
    }
    
}
