export default class Vec {

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    set x(val) {
        this[0] = val;
    }

    set y(val) {
        this[1] = val;
    }

    set z(val) {
        this[2] = val;
    }

    set w(val) {
        this[3] = val;
    }

    constructor(x = 0, y = 0, z = 0, w = 0) {
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
    }

    add(vecOrNum) {
        if(typeof vecOrNum === "number") {
            this[0] += vecOrNum;
            this[1] += vecOrNum;
            this[2] += vecOrNum;
            this[3] += vecOrNum;
        } else {
            this[0] += vecOrNum[0];
            this[1] += vecOrNum[1];
            this[2] += vecOrNum[2];
            this[3] += vecOrNum[3];
        }
    }

    subtract(vecOrNum) {
        if(typeof vecOrNum === "number") {
            this[0] -= vecOrNum;
            this[1] -= vecOrNum;
            this[2] -= vecOrNum;
            this[3] -= vecOrNum;
        } else {
            this[0] -= vecOrNum[0];
            this[1] -= vecOrNum[1];
            this[2] -= vecOrNum[2];
            this[3] -= vecOrNum[3];
        }
    }

    multiply(vecOrNum) {
        if(typeof vecOrNum === "number") {
            this[0] *= vecOrNum;
            this[1] *= vecOrNum;
            this[2] *= vecOrNum;
            this[3] *= vecOrNum;
        } else {
            this[0] *= vecOrNum[0];
            this[1] *= vecOrNum[1];
            this[2] *= vecOrNum[2];
            this[3] *= vecOrNum[3];
        }
    }

    distVec(vec) {
        return new Vec(
            this[0] - vec[0],
            this[1] - vec[1],
            this[2] - vec[2],
            this[3] - vec[3],
        );
    }

}
