const express = require('express'); 
const api = express(); 
const serverless = require('serverless-http'); 
require("dotenv").config();
const cors = require("cors");
api.use(cors());

const currentRouter = express.Router(); 
const hourlyRouter = express.Router(); 

currentRouter.get("/:city", async (req, res) => {
  console.log("currently info");
  const { city } = req.params;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API}`
    );
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error("City current weather not found.");
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

hourlyRouter.get("/:city", async (req, res) => {
  console.log("hourly info");
  const { city } = req.params;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API}`
    );
    if (response.ok) {
      const data = await response.json();
      res.json(data);
    } else {
      throw new Error("City houly weather not found.");
    }
  } catch (err) {
    console.error(err);
    res.send(err);
  }
});

api.use("/.netlify/functions/api/current", currentRouter); 
api.use("/.netlify/functions/api/hourly", hourlyRouter); 


module.exports.handler = serverless(api);