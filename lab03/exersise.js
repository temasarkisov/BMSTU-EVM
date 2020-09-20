"use strict";

const fs = require("fs");
const readlineSync = require('readline-sync');
const { compileFunction } = require("vm");

function stringsEvenLengthInput(fileName) {  // Exersise 1
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

function stringsVowelsOutput(fileName) {  // Exersise 2
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

function fileContentWithRigthExtension() {  // Exersise 3
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

function filePathShorten(filePath) {  // Exersise 4
    let filePathArray = filePath.split('/');
    filePath = filePath.slice(0, filePath.length - filePathArray[filePathArray.length - 1].length - 1);
    return filePath;
}

function filesOutputByPath(filePath) {  // Exersise 4
    let fileContent;

    while (filePath !== '') {
        console.log('\n');
        console.log(filePath);
        const filesArray = fs.readdirSync(filePath);
        console.log(filesArray);
        filesArray.forEach(fileName => {  
            if (fileName.split('.')[1] === "txt") {
                fileContent = fs.readFileSync(fileName, "utf8");
                if (fileContent.length <= 1000) {
                    console.log('\n');
                    console.log(fileName);
                    console.log(fileContent);
                }
            }
            //else if (fileName.indexOf('.') < 0) {
            //    filesOutputByPath
            //}
        });

        filePath = filePathShorten(filePath);
    }
}

function combineFilesByNames() {  // Exersise 5
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

function findMaxNestingLevel() {  // Exersise 6
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

function getNestingLevel(object, nestingLevelsNumber) {
    console.log('Object:', object);
    nestingLevelsNumber.levelNumber++;
    console.log('Nesting level -', nestingLevelsNumber.levelNumber);

    for (var objectProp in object) {
        if (typeof(object[objectProp]) === 'object') {
            getNestingLevel(object[objectProp], nestingLevelsNumber);
        } else {
            console.log('Value: ' + object[objectProp]);
        }
    }

    //return nestingLevelsNumber;
}

function getMaxNestingLevel(fileName) {
    getMaxNestingLevel.nestingLevelsNumber = 0;
    
    let objectExample = {
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
    
    const objString = JSON.stringify(objectExample);
    //const objString = fs.readFileSync(fileName, "utf8");
    const obj = JSON.parse(objString);

    let nestingLevelsNumber = {levelNumber: -1};
    getNestingLevel(obj, nestingLevelsNumber);
    return nestingLevelsNumber.levelNumber;
}






const fileName = "data.txt";
const filePath = "/Users/temasarkisov/My/BMSTU/BMSTU-EVM/lab03";

//stringsEvenLengthInput(fileName);
//stringsVowelsOutput(fileName);
//fileContentWithRigthExtension();
//filesOutputByPath(filePath);
//combineFilesByNames();
//findMaxNestingLevel();
console.log(getMaxNestingLevel(fileName));
