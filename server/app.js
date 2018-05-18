require('dotenv').config({ silent: true });

const express = require('express');
const app = express();

let server = app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
    if (process.env.NODE_ENV === 'development') {
        require('open')(`http://localhost:${process.env.PORT}`);
    }
});

app.use(require('./middlewares/renderer')(server));
app.use(require('./controllers'));
app.use(require('./middlewares/error-handler'));