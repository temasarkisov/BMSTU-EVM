// localhost:5015/api/save?login=tema&password=tema&hobby=doka2&age=20
// http://localhost:5015/api/get

"use strict";

let userData = [];

const express = require("express");
const cookieSession = require("cookie-session");

const app = express();
const port = 5015;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    maxAge: 24 * 60 * 60 * 1000 * 365
}));

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/save", function(request, response) {
    const login = request.query.login;
    const password = request.query.password;
    const hobby = request.query.hobby;
    const age = request.query.age;

    request.session.login = login;
    request.session.password = password;
    request.session.hobby = hobby;
    request.session.age = age;

    response.end("Set cookie ok");
});

// получить cookie
app.get("/api/get", function(request, response) {
    // контролируем существование cookie
    if(!request.session.login) return response.end("Not exists");
    if(!request.session.password) return response.end("Not exists");
    if(!request.session.hobby) return response.end("Not exists");
    if(!request.session.age) return response.end("Not exists");
    // отправляем ответ с содержимым cookie
    const login = request.session.login;
    const password = request.session.password;
    const hobby = request.session.hobby;
    const age = request.session.age;
    response.end(JSON.stringify({
        login,
        password,
        hobby,
        age
    }));
});

// удалить все cookie
app.get("/api/delete", function(request, response) {
    request.session = null;
    response.end("Delete cookie ok");
});

