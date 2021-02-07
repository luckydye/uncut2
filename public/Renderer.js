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

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
