let math = require('./node_modules/mathjs');

"use strict";

class Triangle {
    length1 = 0;
    length2 = 0;
    length3 = 0;

    constructor(length1, length2, length3) {
        this.length1 = length1;
        this.length2 = length2;
        this.length3 = length3;
    }

    initLengths(length1, length2, length3) {
        this.length1 = length1;
        this.length2 = length2;
        this.length3 = length3;
    }

    isExist() {
        if (this.length1 + this.length2 > this.length3 &&
            this.length1 + this.length3 > this.length2 &&
            this.length3 + this.length2 > this.length1) {
                return true;
            }
        return false;
    }

    perimeterCalc() {
        return this.length1 + this.length2 + this.length3;
    }

    areaCalc() {
        let sp = this.perimeterCalc() / 2;
        return math.sqrt(sp * (sp - this.length1) * (sp - this.length2) * (sp - this.length3)); 
    }

    isEqual(a, b, eps) {
        return Math.abs(a - b) < eps;
    }

    isRight(eps) {
        return this.isEqual(this.length1 * this.length1, this.length2 * this.length2 + this.length3 * this.length3, eps) ||
               this.isEqual(this.length2 * this.length2, this.length1 * this.length1 + this.length3 * this.length3, eps) ||
               this.isEqual(this.length3 * this.length3, this.length2 * this.length2 + this.length1 * this.length1, eps);
    }
}

var triangle = new Triangle(3, 4, 5);
console.log(triangle.isExist());
console.log(triangle.perimeterCalc());
console.log(triangle.areaCalc());
console.log(triangle.isRight(0.001));
