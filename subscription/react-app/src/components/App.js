import React from 'react';
// Components
import HomePage from './HomePage';
// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// Styles
import '../index.scss';

const stripePromise = loadStripe('pk_test_51HdMs9HOAxUNfXshPhVqx5DaOR8u481inkzpmMVM7MEJLkj98gwzi441XDhamgHFg1s3DckjCwsbqQfQhqB7LZb800O7RC4osH');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  );
}

export default App;
