import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
const PAYMENT_SERVER_URL = 'http://localhost:3000';

const CURRENCY = 'USD';
const fromUSDtoCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
  };

  const errorPayment = data => {
    alert('Payment Error');
  };

  const onToken = (amount) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDtoCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

    const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDtoCent(amount)}
    token={onToken(amount)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

  export default Checkout