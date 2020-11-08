"use strict";

let number = parseInt(process.argv[2])

let result = 1;

while (number != 1) {
    result *= number;
    number -= 1;
}

console.log(result);