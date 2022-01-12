const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors({credentials: true, origin: true}));

/* Get Environment Variables */
const port = process.env.PORT || 3000;

var postRouter = require('./routes/post.routes');

app.use('/', postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`)) 
