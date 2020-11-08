"use strict";

let argsNumber = parseInt(process.argv[2])
let resultArray = []

for (let i = 0; i < argsNumber; i++) {
    let result = 1;
    let number = parseInt(process.argv[3 + i]);

    while (number != 1) {
        result *= number;
        number -= 1;
    }

    resultArray.push(result);
}

console.log(resultArray);