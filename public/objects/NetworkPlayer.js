import Entity from "./Entity.js";
import Item from "./Item.js";

export default class NetworkPlayer extends Entity {

    // static = true;
    mass = 1;
    textureImage = "../assets/textures/cat_ear.png";
    force = [0, 0];
    username = "unknown";

    constructor(username) {
        super();

        this.username = username;
    }

    onUpdate() {
        if(this.force[0] > 0) {
            this.forward();
        } else if(this.force[0] < 0) {
            this.backward();
        }

        if((this.colliding.left || this.colliding.right) && 
            !this.colliding.bottom) {
                
            this.velocity.multiply(0.5);
        }
    }

    forward() {
        this.acceleration.x = 1.5;
    }

    backward() {
        this.acceleration.x = -1.5;
    }

    jump() {
        if(this.colliding.bottom) {
            this.acceleration.y = 8;
        } else if((this.colliding.left || this.colliding.right) && !this.colliding.bottom) {
            this.acceleration.y = 10;
            this.acceleration.x = -25 * this.direction.x;
        }
    }

    onCollision(obj, level) {
        if(obj instanceof Item) {
            level.remove(obj);
            obj.onCollect(this);
            console.log('Item collected');
        }
    }

    draw(renderer) {
        renderer.drawSprite(
            this.position.x,
            this.position.y,
            this.width,
            this.height,
            "white"
        );

        if(this.cat) {
            renderer.drawSprite(
                this.position.x,
                this.position.y + 25,
                this.width,
                this.width,
                this.texture
            );
        }

        // super.draw(renderer);
    }

}
