// http://localhost:5015/page/games/?minAge=10

"use strict";

let gamesArray = [{name: "Смешарики", description: "Игра для детей", minAge: 5},
                  {aname: "Among Us", description: "Игра для мужиков", minAge: 10},
                  {name: "World of tanks", description: "Игра для дедов", minAge: 0},
                  {name: "Dota 2", description: "Игра для пацанов", minAge: 15}]

const express = require("express");

const app = express();
const port = 5015;
app.listen(port);

app.set("view engine", "hbs");

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/page/games", function(request, response) {
    const minAge = parseInt(request.query.minAge);

    let validGames = [];

    for (let i = 0; i < gamesArray.length; i++) {
        if (gamesArray[i]['minAge'] <= minAge) {
            validGames.push(gamesArray[i]);
        }
    }

    const infoObject = {
        descriptionValue: "Список игр",
        gamesArray: validGames
    };

    response.render("games.hbs", infoObject);
});

