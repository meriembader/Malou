const express = require('express');
var cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors({credentials: true, origin: true}));

/* Get Environment Variables */
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL;
const access_token = process.env.ACCESS_TOKEN


/* Add API Token to Request Header */
let headers = {
    Authorization: 'Bearer ' + access_token,
};

/* Get Posts of a given Day */
app.get('/postsByDay', async function (req, res) {
        await axios.get(apiUrl + 'posts?day=' + req.query.day, {headers: headers}).then(
            (data) => {
                res.send(data.data.posts);
            }).catch(error => res.send(error));
    }
);

app.listen(port, '127.0.0.1', function(){
    console.log('Server is listening on '+port)
})
