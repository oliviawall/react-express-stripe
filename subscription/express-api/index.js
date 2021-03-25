const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const stripe = require('stripe')('pk_test_51HdMs9HOAxUNfXshPhVqx5DaOR8u481inkzpmMVM7MEJLkj98gwzi441XDhamgHFg1s3DckjCwsbqQfQhqB7LZb800O7RC4osH');

const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.post('/pay', async (req, res) => {
    const {email} = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 5000,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
        receipt_email: email,
      });

      res.json({'client_secret': paymentIntent['client_secret']})
})

app.post('/sub', async (req, res) => {
  const {email, payment_method} = req.body;

  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: 'price_1IQO4AHOAxUNfXshYjATGSNH' }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({'client_secret': client_secret, 'status': status});
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))