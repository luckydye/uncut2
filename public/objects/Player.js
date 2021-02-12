import { Action } from "../input/Actions.js";
import Input from "../input/Input.js";
import Vec from "../Vec.js";
import Entity from "./Entity.js";
import Item from "./Item.js";

export default class Player extends Entity {

    // static = true;

    constructor() {
        super(...arguments);
        window.player = this;

        this.force = [0, 0];

        Action.register({
            name: 'forward',
            shortcut: 'd',
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
            shortcut: 'a',
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
            shortcut: 'space',
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
    }

    forward() {
        this.acceleration.x = 1.5;
    }

    backward() {
        this.acceleration.x = -1.5;
    }

    jump() {
        if(this.colliding.bottom) {
            this.acceleration.y =+ 18;
        }
    }

    onCollision(obj, level) {
        if(obj instanceof Item) {
            level.remove(obj);
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

        super.draw(renderer);
    }

}
