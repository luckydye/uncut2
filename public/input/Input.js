const keymap = {};

export default class Input {

    static handleKey(e) {
        if(e.type == "keydown") {
            keymap[e.key] = true;
        } else {
            keymap[e.key] = false;
        }
    }

    static checkKey(key) {
        return keymap[key];
    }

}

window.addEventListener('keydown', Input.handleKey.bind(Input));
window.addEventListener('keyup', Input.handleKey.bind(Input));
