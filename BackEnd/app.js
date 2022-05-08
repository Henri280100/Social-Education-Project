const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const routes = require('./Routers/index.router');

const app = express();

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

route(app);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});