/*
function secondRangeOutput(counter) {
    if (typeof(secondRangeOutput.outputNum) == 'undefined') {
        secondRangeOutput.outputNum = 4;
    }
    if (secondRangeOutput.outputNum === 20) {
        counter = 2;
        firstRangeOutput();
    }
    secondRangeOutput.outputNum++;
    console.log("second: " + secondRangeOutput.outputNum);
}

function firstRangeOutput(counter) {
    if (typeof(firstRangeOutput.outputNum) == 'undefined' ) {
        firstRangeOutput.outputNum = 0;
    }
    if (firstRangeOutput.outputNum === 5) {
        counter /= 2;/
        firstRangeOutput.outputNum = 0;
        secondRangeOutput();
    }
    firstRangeOutput.outputNum++;
    console.log("first: " + firstRangeOutput.outputNum);
}*/

/* Disgusting idea!
function outputValueEasy() {
    let timeID;
    let delay = 2000;
    for (let value = 1; value <= 20; value += 1) {
        if (value > 3) {
            timeID = setTimeout(() => console.log(value), delay)
        }
        if (value === 6) {
            value = 1; 
        }
        timeID = setTimeout(() => console.log(value), delay)
    }
}*/

/*
let delay = 2000;

function outputValue() {
    if (typeof(outputValue.value) === 'undefined') {
        outputValue.value = 0;
    }
    if (outputValue.value === 4) {
        delay /= 2;
    }
    if (outputValue.value === 8) {
        delay *= 2;
        outputValue.value = 0
    }
    outputValue.value += 1;
    console.log(outputValue.value);

}

let interval = setInterval(function outputValue() {
    if (typeof(outputValue.value) === 'undefined') {
        outputValue.value = 0;
    }
    if (outputValue.value === 4) {
        delay /= 2;
    }
    if (outputValue.value === 8) {
        delay *= 2;
        outputValue.value = 0
    }
    outputValue.value += 1;
    console.log(outputValue.value);
    
    interval = setInterval(outputValue, delay);

}, delay);*/

/*
let delay = 2000;

function startInterval(interval) {
    if (typeof(startInterval.value) === 'undefined') {
        startInterval.value = 0;
    }
    let intervalID = setInterval(() => {
        startInterval.value += 1;
        console.log(startInterval.value);
        
        if (startInterval.value === 3) {
            clearInterval(intervalID);
            let intervalIDNext = setInterval(() => {
                startInterval.value += 1;
                console.log(startInterval.value);
                
                if (startInterval.value === 6) {
                    clearInterval(intervalIDNext);
                }
            }, 1000);
        }
    }, interval);
}

startInterval(2000);*/

"use strict";

function continueInterval() {
    let value = 3;
    let intervalIDContinue = setInterval(() => {
        value += 1;
        console.log(value);    
        if (value === 6) {
            clearInterval(intervalIDContinue);
            startInterval();
        }
    }, 1000);
}

function startInterval() {
    let value = 0;
    let intervalIDStart = setInterval(() => {
        value += 1;
        console.log(value);    
        if (value === 3) {
            clearInterval(intervalIDStart);
            continueInterval();
        }
    }, 2000);
}

startInterval();

