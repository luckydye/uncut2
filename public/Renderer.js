export default class Renderer {

    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener('resize', e => this.format());

        this.format();
    }

    format() {
        this.canvas.width = this.canvas.parentNode.clientWidth;
        this.canvas.height = this.canvas.parentNode.clientHeight;
    }

    clear(camera) {
        const ctxt = this.context;
        ctxt.restore();
        ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        ctxt.save();

        ctxt.scale(1, -1);
        ctxt.translate(0, -ctxt.canvas.height);
        ctxt.translate(
            -camera.position.x,
            -camera.position.y
        );
    }

    draw(camera) {
        camera.width = this.canvas.width;
        camera.height = this.canvas.height;
    }

    drawSprite(x, y, w, h, color = 0xffffff) {
        const ctxt = this.context;
        ctxt.strokeStyle = color;
        ctxt.fillRect(x, y, w, h);
    }

    drawBox(x, y, w, h, color = 0xffffff) {
        const ctxt = this.context;
        ctxt.strokeStyle = color;
        ctxt.strokeRect(x, y, w, h);
    }

    drawLine(points, color = 0xffffff) {
        const ctxt = this.context;
        ctxt.beginPath();
        ctxt.moveTo(...points[0]);
        for(let point of points) {
            ctxt.lineTo(point[0], point[1]);
        }
        ctxt.closePath();
        ctxt.fillStyle = color;
        ctxt.fill();
    }

}
