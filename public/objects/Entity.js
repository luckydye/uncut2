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
        this.colliding = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }

        this.width = 40;
        this.height = 80;
    }

    getBounds() {
        const w = this.width;
        const h = this.height;
        return {
            type: 'box',
            top: this.position.y + h,
            right: this.position.x + w,
            bottom: this.position.y,
            left: this.position.x,
        }
    }

    update(delta, level, tick) {
        const colliders = level.objects.filter(obj => {
            return obj !== this;
        });
        this.colliding.top = 0;
        this.colliding.bottom = 0;
        this.colliding.left = 0;
        this.colliding.right = 0;

        const collidingObjects = new Set();

        // update X
        this.position.x += this.velocity.x;
        
        // collide X
        if(!this.static) {
            const r1 = this.getBounds();

            for(let obj2 of colliders) {
                const r2 = obj2.getBounds();

                if(r1.top > r2.bottom && r1.bottom < r2.top) {
                    if(r1.left < r2.left && r1.right > r2.left) {
                        // right side colliding
                        if(obj2.collider) {
                            const diff = r1.right - r2.left;
                            this.position.x -= diff + 1;
                            this.velocity.x = 0;
                        }
                        this.colliding.right = 1;
                        collidingObjects.add(obj2);
                    } 
                    if(r1.right > r2.right && r2.right > r1.left) {
                        // left side colliding
                        if(obj2.collider) {
                            const diff = r1.left - r2.right;
                            this.position.x -= diff - 1;
                            this.velocity.x = 0;
                        }
                        this.colliding.left = 1;
                        collidingObjects.add(obj2);
                    }
                }
            }
        }

        //x
        // air friction
        this.velocity.x *= 0.75;
        this.velocity.x += this.acceleration.x;
        
        // accel friction
        this.acceleration.x *= 0.65;

        // update Y
        this.position.y += this.velocity.y;

        // collide Y
        if(!this.static) {
            const r1 = this.getBounds();

            for(let obj2 of colliders) {
                const r2 = obj2.getBounds();

                if (r1.right > r2.left && r1.left < r2.right) {
                    if(r1.top > r2.top && r1.bottom < r2.top) {
                        // bottom side colliding
                        if(obj2.collider) {
                            const diff = r1.bottom - r2.top;
                            this.position.y -= diff;
                            this.velocity.y = 0;
                        }
                        this.colliding.bottom = 1;
                        collidingObjects.add(obj2);
                    } 
                    if(r1.bottom < r2.bottom && r1.top > r2.bottom) {
                        // top side colliding
                        if(obj2.collider) {
                            const diff = r1.top - r2.bottom;
                            this.position.y -= diff;
                            this.velocity.y = 0;
                        }
                        this.colliding.top = 1;
                        collidingObjects.add(obj2);
                    }
                }
            }
        }

        // y
        // air friction
        this.velocity.y *= 0.9;
        if(!this.static) {
            this.acceleration.y -= level.attributes.gravity;
        }
        this.velocity.y += this.acceleration.y;
        
        // accel friction
        this.acceleration.y *= 0.65;

        this.onUpdate();

        for(let obj of collidingObjects) {
            this.onCollision(obj, level);
        }

        const spriteLen = 8;
        const spriteIndex = Math.floor(level.tick / 12) % spriteLen;
    }

    draw(renderer) {
        const bounds = this.getBounds();
        renderer.drawBox(
            bounds.left,
            bounds.bottom,
            bounds.right - bounds.left,
            bounds.top - bounds.bottom,
            "red"
        );
    }

}
