require('dotenv/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const middlewares = require('./src/middlewares/ErrorHandler');
const responseHelper = require('./src/helpers/ResponseHelper').helper();

const app = express();
const port = process.env.PORT || 3001;
const routerNav = require('./src/index');

app.use(responseHelper);

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/', routerNav);

app.use(middlewares.errorLogger)
app.use(middlewares.errorResponder)
app.use(middlewares.invalidPathHandler)

app.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
});

module.exports = app;
