"use strict";

const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const port = 5080;
app.listen(port);

app.use(express.static(path.join(__dirname, "static")));

app.get("/page", function(request, response) {
    const nameString = request.query.p;
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
};

app.get("/getUserData", function(request, response) {
    const mail = request.query.mail;

    let jsonContents = JSON.parse(fs.readFileSync("task1.json"));
    let userExists = false;
    let resultObject = [];

    for (let i = 0; i < jsonContents.length; i++) {
        if (jsonContents[i]['mail'] == mail) {
            userExists = true;
            resultObject = { mail: jsonContents[i]['mail'], surname: jsonContents[i]['surname'], phoneNumber: jsonContents[i]['phoneNumber']};
            break;
        }
    }

    if (!userExists) {
        resultObject = {result: "User not found!"};
    }

    console.log(resultObject);

    const answerJSON = JSON.stringify(resultObject);
    response.end(answerJSON);
});

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const mail = obj['mail'];
        const surname = obj['surname'];
        const phoneNumber = obj['phoneNumber'];
        
        let fileContents = fs.readFileSync("task1.json");
        let jsonContents = JSON.parse(fileContents);
        let isUnique = true;

        for (let i = 0; i < jsonContents.length; i++) {
            if (jsonContents[i]['mail'] == mail) {
                isUnique = false;
                break;
            }
            else if (jsonContents[i]['phoneNumber'] == phoneNumber) {
                isUnique = false;
                break;
            }
        }

        let resultString = "";

        if (!isUnique) {
            resultString = "Почта и номер телефона не уникальны!";
        }
        else {
            let newUser = { mail: mail, surname: surname, phoneNumber: phoneNumber};
            jsonContents.push(newUser);
            fs.writeFileSync("task1.json", JSON.stringify(jsonContents));
            resultString = "Пользователь успешно добавлен!";
        }
         
        const answerJSON = JSON.stringify({result: resultString});
        response.end(answerJSON);
    });
});
