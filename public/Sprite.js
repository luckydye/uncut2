export default class Sprite {

    getTexture(time) {
        // tiled sprites
        const fps = 6;
        const index = Math.floor(((time / 100) * fps) % this._tileCount);
        this.setTile(index, 0);
        return this.canvas;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    setTile(x = 0, y = 0) {
        this._uvOffset[0] = this._width * x;
        this._uvOffset[1] = this._height * y;
        this.update();
    }

    update() {
        if(this.loaded) {
            this.context.clearRect(0, 0, this._width, this._height);
            this.context.drawImage(
                this.image, 
                this.uv[0] + this._uvOffset[0], this.uv[1] + this._uvOffset[1], 
                this._width, this._height,
                0, 0, 
                this._width, this._height
            );
        } else if(this.error) {
            this.context.fillStyle = "rgb(255, 0, 255)";
            this.context.fillRect(0, 0, this._width, this._height);
        } else {
            this.context.fillStyle = "black";
            this.context.fillRect(0, 0, this._width, this._height);
        }
    }

    constructor(imgPath, w, h, tiles = 1) {
        this._width = w;
        this._height = h;
        this.uv = [0, 0];
        this._uvOffset = [0, 0];
        this._tileCount = tiles;
        this.error = false;
        this.loaded = false;
        this.imageSource = imgPath;

        this.canvas = new OffscreenCanvas(w, h);
        this.context = this.canvas.getContext("2d");

        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.update();
        }
        this.image.onerror = () => {
            this.error = true;
            this.update();
        }
        this.image.src = this.imageSource;
        this.update();
    }

}
