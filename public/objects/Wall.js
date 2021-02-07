import Vec from "../Vec.js";
import Entity from "./Entity.js";

export default class Wall extends Entity {

    // has position, velocity and can collide with other objects
    // set to static makes it a static non movable entity

    constructor(points) {
        super();

        this.points = points;

        this.position = new Vec(0, 0);
        this.static = true;
    }

    draw(renderer) {
        const transformPoint = (p) => {
            return [
                p.x + this.position.x, 
                p.y + this.position.y
            ]
        }

        const ctxt = renderer.context;
        ctxt.beginPath();
        ctxt.moveTo(...transformPoint(this.points[0]));
        for(let point of this.points) {
            ctxt.lineTo(...transformPoint(point));
        }
        ctxt.closePath();
        ctxt.fillStyle = "white";
        ctxt.fill();
    }    

}
