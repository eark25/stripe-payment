const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('express-async-errors');

const express = require('express');
const app = express();

// controller
const stripePayment = require('./controllers/stripeController');

// error handler
const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMiddleware = require('./middleware/errorHandler');

app.use(express.json());
app.use(express.static('./public'));

// stripe
app.post('/stripe', stripePayment);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
