const express = require("express");
const app = express();

const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8098;

app.use(cors());

//import json data
const data = require("./data.json");

app.get("/", (request, response) => {
  response.json(" Excellent it works");
});

//filter game by title
function filterGameByTitle(title) {
  const theGame = data.find((game) => game.title == title);
  return theGame;
}

//filter game by year
function filterGameByYear(year) {
  const theYear = data.find((game) => game.year == year);
  return theYear;
}

app.get("/games", (request, response) => {
  let dataToReturn = data;

  if (request.query.tile) {
    dataToReturn = filterGameByTitle(request.query.tile);
  } else if (request.query.year) {
    dataToReturn = filterGameByYear(request.query.year);
  }
  response.json(dataToReturn);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
