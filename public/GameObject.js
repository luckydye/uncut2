export default class GameObject {

    constructor() {
        this.destoryed = false;
    }

    onCreate() {
        
    }

    onDestory() {

    }

    update(ms, level) {

    }

    draw(renderer) {

    }

    destory() {
        this.onDestory();
        this.destoryed = true;
    }

}
