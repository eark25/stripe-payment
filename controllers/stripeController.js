const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { StatusCodes } = require('http-status-codes');

const stripePayment = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'usd',
  });
  console.log(paymentIntent);
  res.status(StatusCodes.OK).json({
    clientSecret: paymentIntent.client_secret,
  });
};

module.exports = stripePayment;
