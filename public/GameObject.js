export default class GameObject {

    constructor() {
        this.destoryed = false;
    }

    onCreate() {
        
    }

    onDestory() {

    }

    update() {

    }

    draw() {

    }

    destory() {
        this.onDestory();
        this.destoryed = true;
    }

}
