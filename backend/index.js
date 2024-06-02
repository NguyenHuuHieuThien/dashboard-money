const express = require('express')
const DB = require('./db');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const port = 3000;
const router = require('./router');
DB.Connect();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json(
    { limit: '128mb' }
));
app.use(router);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})