const express = require('express'); 
const api = express(); 
const serverless = require('serverless-http'); 
require("dotenv").config();
const cors = require("cors");
api.use(cors());

const currentRouter = express.Router(); 
const hourlyRouter = express.Router(); 

currentRouter.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API}`
    );
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      throw new Error("City current weather not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

hourlyRouter.get("/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API}`
    );
    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data);
    } else {
      throw new Error("City houly weather not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

api.use("/.netlify/functions/api/current", currentRouter); 
api.use("/.netlify/functions/api/hourly", hourlyRouter); 


module.exports.handler = serverless(api);