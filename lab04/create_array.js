"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const jsonArray = JSON.stringify(array);
fs.writeFileSync("array_info.txt", jsonArray);