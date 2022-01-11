var  api =require( "../api");

var express = require("express");

var router = express.Router();

/* Get Posts of a given Day */
router.get("/postsByDay", async function (req, res) {
  const reponse = await api.getPosts(req.query.day).catch();
    res.send(reponse.data.posts);
});

module.exports = router;
