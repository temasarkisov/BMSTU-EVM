"use strict";

function continueInterval() {
    let value = 10;
    let intervalIDContinue = setInterval(() => {
        value += 1;
        console.log(value);    
        if (value === 20) {
            clearInterval(intervalIDContinue);
            startInterval();
        }
    }, 500);
}

function startInterval() {
    let value = 0;
    let intervalIDStart = setInterval(() => {
        value += 1;
        console.log(value);    
        if (value === 10) {
            clearInterval(intervalIDStart);
            continueInterval();
        }
    }, 1000);
}

startInterval();

