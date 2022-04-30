const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const dbConfig = require('./Config/config');
const routes = require('./Services/index.router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

mongoose.connect(dbConfig.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Yay! You have successfully connected to your DB");
}).catch(err => {
    console.log(':( Cannot connect to the database. Exiting now...', err);
    process.exit();
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
    console.info(`Server is up! and running on port ${port}`);
})