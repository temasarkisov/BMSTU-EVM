"use strict";

const fs = require('fs');
const readlineSync = require('readline-sync');
const compileFunction = require('vm');
const path = require('path');
const dir = require('console');

const stringsEvenLengthInput = (fileName) => {  // Exersise 1
    let n; 
    let string;
    let stringArray = [];

    n = readlineSync.question("Input N: ");
    for (let i = 0; i < n; i++) {
        string = readlineSync.question("Input string: ");
        if (string.length % 2 === 0) {
            stringArray.push(string);
        }
    }

    console.log("Array of strings only EVEN length: ", stringArray); 
    const jsonStringArray = JSON.stringify(stringArray, null, 4);
    fs.writeFileSync(fileName, jsonStringArray);
}

const stringsVowelsOutput = (fileName) => {  // Exersise 2
    let stringArray = [];
    let vowels = "aeiou";

    if (fs.existsSync(fileName)) {
        const contentString = fs.readFileSync(fileName, "utf8");
        stringArray = JSON.parse(contentString);

        stringArray.forEach(string => {
            for (let i = 0; i <= string.length - 1; i++) {
                if (vowels.indexOf(string.toLowerCase().charAt(i)) < 0) {
                    stringArray.splice(stringArray.indexOf(string), 1);
                }
            }
        });

        console.log("Array of strings consist of only vowels: ", stringArray);
    }
}

const fileContentWithRigthExtension = () => {  // Exersise 3
    const folderName = readlineSync.question("Input folder name: ");
    const extensionName = readlineSync.question("Input extension name (without .): ");

    const filesArray = fs.readdirSync(folderName);

    filesArray.forEach(fileName => {
        if (fileName.split('.')[1] === extensionName) {
            console.log('\n');
            console.log(fileName + ': ');
            console.log(fs.readFileSync(fileName, "utf8"));
        }
    });
}

const filesOutputByPath = (dirPath) => {  // Exersise 4
    fs.readdirSync(dirPath).forEach(function(file) {
        let filepath = path.join(dirPath, file);
        let stat = fs.statSync(filepath);
        if (stat.isDirectory()) {            
            filesOutputByPath(filepath);
        } else {
            (fs.readFileSync(filepath).length <= 10) ? console.log(`\n${filepath} \n${fs.readFileSync(filepath)}`) : null;                     
        }
    });
}

const combineFilesByNames = () => {  // Exersise 5
    let n; 
    let fileName;
    let filesContentArray = [];
    let filesContentCombined = "";

    n = readlineSync.question("Input N: ");
    for (let i = 0; i < n; i++) {
        fileName = readlineSync.question("Input file name: ");
        if (fs.existsSync(fileName)) {
            filesContentArray.push(fs.readFileSync(fileName, "utf8"));
        }
    }
    
    filesContentArray.forEach(fileContent => {
        filesContentCombined += fileContent;
    });

    fs.writeFileSync("combine.txt", filesContentCombined);
}

const findMaxAvailableNestingLevel = () => {  // Exersise 6
    let jsonString;
    let objString = '{"k":""}';
    let flag = true;
    let levelNumber = 0;
    
    while (flag !== false) {
        objString = objString.replace('""', '{"k":""}');
        levelNumber++;
        
        //fs.writeFileSync("data2.txt", objString);
        //jsonString = fs.readFileSync("data2.txt", "utf8");
        const obj = JSON.parse(objString);

        try {
            jsonString = JSON.stringify(obj);
        } catch (err) {
            console.error(err.message);
            console.log("Nesting level - ", levelNumber);
            flag = false;
        }

        if (levelNumber % 1000 === 0) {
            console.log(levelNumber);
        }
    }
}

function findObjectMaxNestingLevel(obj) {
    let arr = [];
    let maxVal = 0;
    let finalObj;
    getProp(obj, 0, arr);

    function getProp(o, id, stack) {

        for (const prop in o) {
            if (typeof(o[prop]) === 'object') {
                let clone = stack.slice();
                clone.push(prop);
                getProp(o[prop], id + 1, clone);
            }

            if (id > maxVal) {
                maxVal = id
                finalObj = stack
                finalObj.push(prop)
            }
        }
    }
    console.log(maxVal, finalObj)
}



const fileName = "data.txt";
const filePath = "/Users/temasarkisov/Uni/BMSTU/BMSTU-EVM/lab03/example04";

const objectExample = {
    a1: {
        b1: {
            c: 1
        },
        b2: {
            c: 222
        },
        b3: {
            c: {
                d: 33,
                e: 2.5,
                f: {
                    g: 9999,
                    h: {
                        i: {
                            j: 1001,
                            k: 'string',
                            l: [1,2,3],
                        }
                    }
                }
            }
        }
    }
}

stringsEvenLengthInput(fileName);
stringsVowelsOutput(fileName);
fileContentWithRigthExtension();
filesOutputByPath(filePath);
combineFilesByNames();
findMaxAvailableNestingLevel();
console.log(getMaxNestingLevel(fileName));
findObjectMaxNestingLevel(objectExample);
