const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payments", cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    console.log("some   ");
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "Thing",
      payment_method: id,
      confirm: true,
      return_url: 'http://localhost:5174/thankYoupage'
    });
    console.log("Payment", payment);
    res.json({
      message: "Payment successful   1",
      success: true
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening on port 3000");
});
// $env:STRIPE_SECRET_KEY = 'sk_test_51NbKBLSECynzp1hnHl6eEspeYOtSVPZyhuaZORJxxCglX9ELH74vHcXjwwX9vUxJ5NgpnXOtaUfyBGuNEEqlFUOd00TAhfadgA'
