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

    getBoundingBox() {
        const w = this.points[1].x - this.points[0].x;
        const h = this.points[2].y - this.points[1].y;
        return {
            left: this.position.x,
            right: this.position.x + w,
            bottom: this.position.y - h,
            top: this.position.y,
        }
    }

    draw(renderer) {
        const transformPoint = (p) => {
            return [
                p.x + this.position.x, 
                -p.y + this.position.y,
                0
            ]
        }

        const points = this.points.map(p => transformPoint(p));
        renderer.drawLine(points, "#eee");
        
        // super.draw(renderer);
    }    

}
