import GameObject from "../GameObject.js";
import Vec from "../Vec.js";

export default class Entity extends GameObject {

    // has position, velocity and can collide with other objects
    // set to static makes it a static non movable entity

    constructor(optns = {}) {
        super();

        this.position = optns.position || new Vec();
        this.velocity = optns.velocity || new Vec();
        this.acceleration = new Vec();
        this.static = optns.static || false;
    }

    onCollision(collider) {
        if(this.static) return;

        this.velocity.y = 0;
        const bounds = collider.getBoundingBox();
        this.position.y = bounds.top + 100;
        
        this.velocity.add(this.acceleration);
    }

    getBoundingBox() {
        const w = 500;
        const h = 100;
        return {
            left: this.position.x - (w / 2),
            top: this.position.y - (h / 2),
            right: (this.position.x - (w / 2)) + w,
            bottom: (this.position.y - (h / 2)) + h,
        }
    }

    update(delta, level) {
        if(this.static) return;

        this.position.add(this.velocity);
        this.velocity.multiply(0.33 * delta);

        this.velocity.y += level.attributes.gravity;
    }

}
