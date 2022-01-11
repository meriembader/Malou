const express = require('express');
var cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const app = express();
app.use(cors({credentials: true, origin: true}));

/* Get Environment Variables */
const port = process.env.PORT || 3000;

var postRouter = require('./routes/post.routes');

app.use('/', postRouter);

app.listen(port, '127.0.0.1', function(){
    console.log('Server is listening on '+port)
})
