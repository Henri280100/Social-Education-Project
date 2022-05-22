const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/config');
const routes = require('./Routers/index.router');
const path = require('path');
const app = express();
const morgan = require('morgan');

//connect to db 
db.connect;
app.use(express.static(path.join(path.join(__dirname, 'public'))));
//HTTP logger
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

const port = process.env.PORT || '3000';
app.set('port', port);


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});