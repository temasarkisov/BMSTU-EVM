let math = require('./node_modules/mathjs');

"use strict";

class Triangle {
    static length1 = 0;
    static length2 = 0;
    static length3 = 0;

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

    isRight() {
        if (math.pow(this.length1, 2) + math.pow(this.length2, 2) === math.pow(this.length3, 2) ||
            math.pow(this.length1, 2) + math.pow(this.length3, 2) === math.pow(math.powthis.length2) ||
            math.pow(this.length3, 2) + math.pow(this.length2, 2) === math.pow(this.length1, 2)) {
                return true;
        }
        return false;
    }


}

var triangle = new Triangle(3, 4, 5);
console.log(triangle.isExist());
console.log(triangle.perimeterCalc());
console.log(triangle.areaCalc());
console.log(triangle.isRight());