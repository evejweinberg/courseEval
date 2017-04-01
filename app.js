const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const routes = require('././controller');
/* eslint-disable no-console */
const app = express();
// mongoose.connect('mongodb://localhost:27017/courseeval', (err) => {
//     if (err) return console.log(err);
//     console.log('Connected to mongo');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) return console.log(err);
    return console.log(`Listening on ${PORT}`);
});
