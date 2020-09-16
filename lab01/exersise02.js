"use strict";

function createStudent(studentsStorage, groupName, studentID, marks) {
    if (studentsStorage.length !== 0) {
        for (let student of studentsStorage) {
            if (student["studentID"] == studentID) {
                return;
            }
        }
    } 
    studentsStorage.push({"groupName" : groupName, "studentID" : studentID, "marks" : marks});
}

function deleteStudent(studentsStorage, studentID) {
    for (let student of studentsStorage) {
        if (student["studentID"] == studentID) {
            let index = studentsStorage.indexOf(student);
            studentsStorage.splice(index, 1);
            return;
        }
    }
}

function updateStudent(studentsStorage, groupName, studentID, marks) {
    for (let student of studentsStorage) {
        if (student["studentID"] == studentID) {
            student["groupName"] = groupName;
            student["studentID"] = studentID;
            student["marks"] = marks;
            return;
        }
    }
}

function readStudent(studentsStorage, studentID) {
    for (let student of studentsStorage) {
        if (student["studentID"] == studentID) {
            return student;
        }
    }
}

function averageMark(studentsStorage, studentID) {
    let sum = 0;
    let number = 0;
    for (let student of studentsStorage) {
        if (student["studentID"] == studentID) {
            for (let mark of student["marks"]) {
                sum += mark;
                number += 1;
            }
            break;
        }
    }
    if (number === 0) {
        return;
    }
    return sum / number;
}

function groupStudentsInfo(studentsStorage, groupName) {
    let studentsInfo = [];
    for (let student of studentsStorage) {
        if (student["groupName"] == groupName) {
            studentsInfo.push(student);  
        }
    }
    return studentsInfo;
}

function maxMarksNumberStudentInfo(studentsStorage, groupName) {
    let studentInfo;
    let maxNumber = 0;
    for (let student of studentsStorage) {
        if (student["groupName"] == groupName && student["marks"].length > maxNumber) {
            studentInfo = student;
        }
    }
    return studentInfo;
}

function withoutMarksStudentInfo(studentsStorage) {
    let studentInfo;
    for (let student of studentsStorage) {
        if (student["marks"].length === 0) {
            studentInfo = student;
        }
    }

    return studentInfo;
}

let studentsStorage = [];

createStudent(studentsStorage, "IU753", 666, [5, 5, 5]);
createStudent(studentsStorage, "IU753", 667, [5, 4, 5]);
createStudent(studentsStorage, "IU753", 668, [3, 5, 5, 6]);
createStudent(studentsStorage, "IU753", 669, []);
//deleteStudent(studentsStorage, 666);
updateStudent(studentsStorage, "IU754", 666, [3, 5, 5]);
console.log(studentsStorage);

console.log(readStudent(studentsStorage, 666));
console.log(averageMark(studentsStorage, 666));
console.log(groupStudentsInfo(studentsStorage, "IU753"));
console.log(maxMarksNumberStudentInfo(studentsStorage, "IU753"));
console.log(withoutMarksStudentInfo(studentsStorage));

