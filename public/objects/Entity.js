import GameObject from "../GameObject.js";
import Vec from "../Vec.js";

export default class Entity extends GameObject {

    // has position, velocity and can collide with other objects
    // set to static makes it a static non movable entity

    onCollision() { }

    onUpdate() { }

    constructor(optns = {}) {
        super();

        this.position = optns.position || new Vec();
        this.velocity = optns.velocity || new Vec();
        this.acceleration = new Vec();
        this.static = optns.static || false;
        this.collider = true;

        this.width = 40;
        this.height = 80;
    }

    getBoundingBox() {
        const w = this.width;
        const h = this.height;
        return {
            left: this.position.x,
            top: this.position.y,
            right: this.position.x + w,
            bottom: this.position.y + h,
        }
    }

    collides(collider) {
        this.onCollision(collider);

        if(this.static) return;

        this.velocity.y = 0;
        const bounds = collider.getBoundingBox();
        this.position.y = bounds.bottom;
    }

    update(delta, level) {
        this.onUpdate();

        if(!this.static) {
            // air friction
            this.velocity.multiply(0.9);

            this.acceleration.y -= level.attributes.gravity;
            this.velocity.add(this.acceleration);

            this.position.add(this.velocity);
            
            // accel friction
            this.acceleration.multiply(0.75);
        }
    }

    draw(renderer) {
        const ctxt = renderer.context;
        const bounds = this.getBoundingBox();

        ctxt.strokeStyle = "red";
        ctxt.strokeRect(
            bounds.left,
            bounds.bottom,
            bounds.right - bounds.left,
            bounds.top - bounds.bottom
        );
    }

}
