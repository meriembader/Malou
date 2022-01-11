var  api =require( "../api");

var express = require("express");

var router = express.Router();
const axios = require("axios");

const apiUrl = process.env.API_URL;
const access_token = process.env.ACCESS_TOKEN;

/* Add API Token to Request Header */
let headers = {
  Authorization: "Bearer " + access_token,
};
/* Get Posts of a given Day */
router.get("/postsByDay", async function (req, res) {
  const reponse = await api.getPosts(req.query.day).catch();
    res.send(reponse.data.posts);
});

module.exports = router;
