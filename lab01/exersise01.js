"use strict";

function createChild(childrenStorage, surname, age) {
    if (surname in childrenStorage == false) {
        childrenStorage[surname] = age;
    }
}

function deleteChild(childrenStorage, surname) {
    delete childrenStorage[surname];
}

function updateChild(childrenStorage, surname, age) {
    childrenStorage[surname] = age;
}

function readChild(childrenStorage, surname) {
    return childrenStorage[surname];
}

function averageAge(childrenStorage) {
    let sum = 0;
    let number = 0; 
    for (let key in childrenStorage) {
        sum += childrenStorage[key];
        number += 1; 
    }
    if (number === 0) {
        return;
    }
    return sum / number;
}

function oldestChildInfo(childrenStorage) {
    let maxAge = 0;
    let info; 
    for (let key in childrenStorage) {
        if (childrenStorage[key] > maxAge) {
            maxAge = childrenStorage[key];
            info = {surname: key, age: childrenStorage[key]}; 
        }
    }
    return info;
}

function ageRangeInfo(childrenStorage, minAge, maxAge) {
    let infoArray = [];
    for (let key in childrenStorage) {
        if (childrenStorage[key] <= maxAge && childrenStorage[key] >= minAge) {
            infoArray.push({surname: key, age: childrenStorage[key]});
        }
    }
    return infoArray;
}


function startWithLetterInfo(childrenStorage, letter) {
    let infoArray = [];
    for (let key in childrenStorage) {
        if (key.charAt(0) === letter) {
            infoArray.push({surname: key, age: childrenStorage[key]});
        }
    }
    return infoArray;
}

function longerSurnameInfo(childrenStorage, length) {
    let infoArray = [];
    for (let key in childrenStorage) {
        if (key.length > length) {
            infoArray.push({surname: key, age: childrenStorage[key]});
        }
    }
    return infoArray;
}

function startWithVowelInfo(childrenStorage) {
    let infoArray = [];
    var vowels = "aeiouy"; 
    for (let key in childrenStorage) {
        if (vowels.indexOf(key.toLowerCase().charAt(0)) >= 0) {
            infoArray.push({surname: key, age: childrenStorage[key]});
        }
    }
    return infoArray;
}


let childrenStorage = {};

createChild(childrenStorage, "Bogdanov", 21);
createChild(childrenStorage, "Sarkisov", 20);
createChild(childrenStorage, "Korneva", 19);
createChild(childrenStorage, "Abbadon", 300);
//deleteChild(childrenStorage, "Bogdanov");
console.log(childrenStorage)
console.log(readChild(childrenStorage, "Sarkisov"));

console.log(averageAge(childrenStorage));
console.log(oldestChildInfo(childrenStorage));
console.log(ageRangeInfo(childrenStorage, 21, 200));
console.log(startWithLetterInfo(childrenStorage, 'S'));
console.log(longerSurnameInfo(childrenStorage, 7));
console.log(startWithVowelInfo(childrenStorage));

