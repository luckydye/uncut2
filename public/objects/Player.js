import { Action } from "../input/Actions.js";
import Sprite from "../Sprite.js";
import Entity from "./Entity.js";
import Item from "./Item.js";

export default class Player extends Entity {

    static = false;
    mass = 1;
    texture = new Sprite("../assets/textures/cat_ear.png", 256, 256);
    force = [0, 0];

    constructor() {
        super(...arguments);

        Action.register({
            name: 'forward',
            shortcut: ['d'],
            hold: true,
            onAction: (args, event, action) => {
                if(action.state) {
                    this.force[0] += 1;
                } else {
                    this.force[0] -= 1;
                }
            }
        });
        Action.register({
            name: 'backward',
            shortcut: ['a'],
            hold: true,
            onAction: (args, event, action) => {
                if(action.state) {
                    this.force[0] -= 1;
                } else {
                    this.force[0] += 1;
                }
            }
        });
        Action.register({
            name: 'jump',
            shortcut: ['space'],
            onAction: (args, event, action) => {
                this.jump();
            }
        });
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
        this.jumped = true;
        if(this.colliding.bottom) {
            this.acceleration.y = 8;
        } else if((this.colliding.left || this.colliding.right) && !this.colliding.bottom) {
            this.acceleration.y = 10;
            this.acceleration.x = -25 * this.direction.x;
        }
    }

    onCollision(obj, level) {
        if(obj instanceof Item && !obj.destoryed) {
            level.remove(obj);
            obj.onCollect(this);
            console.log('Item collected');
        }
        if(this.colliding.bottom) {
            this.jumped = false;
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
