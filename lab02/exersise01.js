"use strict";

let math = require('./node_modules/mathjs')

class Point {
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }

    getPoint() {
        return this;
    }
}

class Segment {
    constructor(x1, y1, x2, y2) {
        this._pointStart = new Point(x1, y1);
        this._pointEnd = new Point(x2, y2);
    }

    getSegment() {
        return this;
    }

    lengthCalc() {
        return math.sqrt(math.pow(this._pointStart._x - this._pointEnd._x, 2) + math.pow(this._pointStart._y - this._pointEnd._y, 2))
    }
}

var point = new Point(5, 5);
console.log(point.getPoint());
var segment = new Segment(0, 0, 4, 3);
console.log(segment.getSegment());
console.log(segment.lengthCalc());