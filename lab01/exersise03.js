let math = require('./node_modules/mathjs');

"use strict";

class pointsStorage {
    pointsStorage = {};

    createPoint(pointName, coordX, coordY) {
        if (pointName in this.pointsStorage == false) {
            this.pointsStorage[pointName] = [coordX, coordY];
        }
    }

    deletePoint(pointName) {
        delete this.pointsStorage[pointName];
    }

    updatePoint(pointName, coordX, coordY) {
        this.pointsStorage[pointName] = [coordX, coordY];
    }

    readPoint(pointName) {
        return this.pointsStorage[pointName];
    }

    distanceBetweenCalc(point1, point2) {
        return math.sqrt(math.pow(point1[0] - point2[0], 2) + math.pow(point1[1] - point2[1], 2))
    }

    pointsMaxDistanceBetween() {
        let maxDistance = 0;
        let pointsInfo;
        for (let key1 in this.pointsStorage) {
            for (let key2 in this.pointsStorage) {
                if (key1 != key2 && this.distanceBetweenCalc(this.pointsStorage[key1], this.pointsStorage[key2]) > maxDistance) {
                    maxDistance = this.distanceBetweenCalc(this.pointsStorage[key1], this.pointsStorage[key2]);
                    pointsInfo = [{"pointName" : key1, "coordX" : this.pointsStorage[key1][0], "coordY" : this.pointsStorage[key1][1]},
                                  {"pointName" : key2, "coordX" : this.pointsStorage[key2][0], "coordY" : this.pointsStorage[key2][1]}]
                } 
            }
        }
        return pointsInfo;
    }

    pointsDistanceEnough(coordX, coordY, distance) {
        let pointsInfo = [];
        for (let key in this.pointsStorage) {
            if (this.distanceBetweenCalc(this.pointsStorage[key], [coordX, coordY]) <= distance) {
                pointsInfo.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
        }
        return pointsInfo;
    }

    pointsByAxis(axisCenter) {
        let pointsInfo = [];
        let pointsInfoRightSide = [];
        let pointsInfoLeftSide = [];
        let pointsInfoUpSide = [];
        let pointsInfoDownSide = [];
        for (let key in this.pointsStorage) {
            if (this.pointsStorage[key][0] > axisCenter[0]) {
                pointsInfoRightSide.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
            if (this.pointsStorage[key][0] < axisCenter[0]) {
                pointsInfoLeftSide.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
            if (this.pointsStorage[key][1] > axisCenter[1]) {
                pointsInfoUpSide.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
            if (this.pointsStorage[key][1] < axisCenter[1]) {
                pointsInfoDownSide.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
        }
        pointsInfo = {"rightSide" : pointsInfoRightSide, "leftSide" : pointsInfoLeftSide, "upSide" : pointsInfoUpSide, "downSide" : pointsInfoDownSide}

        return pointsInfo;
    }

    pointsInsideRectangle(coordDownLeft, coordUpRight) {
        let pointsInfo = [];
        for (let key in this.pointsStorage) {
            if (this.pointsStorage[key][0] > coordDownLeft[0] && 
                this.pointsStorage[key][0] < coordUpRight[0] &&
                this.pointsStorage[key][1] > coordDownLeft[1] && 
                this.pointsStorage[key][1] < coordUpRight[1]) {
                pointsInfo.push({"pointName" : key, "coordX" : this.pointsStorage[key][0], "coordY" : this.pointsStorage[key][1]});
            }
        }
        return pointsInfo;
    }
}


var ps = new pointsStorage();
ps.createPoint("A", 10, 20);
ps.createPoint("B", 10, 10);
ps.createPoint("C", 40, 40);
console.log(ps.pointsStorage);
console.log(ps.pointsMaxDistanceBetween());
console.log(ps.pointsDistanceEnough(20, 20, 10));
console.log(ps.pointsInsideRectangle([0, 0], [20, 20]));
console.log(ps.pointsByAxis([100, 100]));
