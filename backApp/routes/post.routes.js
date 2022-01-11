var express = require('express');
var router = express.Router();
const axios = require('axios');

const apiUrl = process.env.API_URL;
const access_token = process.env.ACCESS_TOKEN


/* Add API Token to Request Header */
let headers = {
    Authorization: 'Bearer ' + access_token,
};
/* Get Posts of a given Day */
router.get('/postsByDay', async function (req, res) {
    await axios.get(apiUrl + 'posts?day=' + req.query.day, {headers: headers}).then(
        (data) => {
            res.send(data.data.posts);
        }).catch(error => res.send(error));
}
);

module.exports =router;
