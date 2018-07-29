// import React from 'react'
// import axios from 'axios';
// import StripeCheckout from 'react-stripe-checkout';

// const STRIPE_PUBLISHABLE = 'pk_test_Jh4PfCKnHVRs1AvfG0w5KEwL';
// const PAYMENT_SERVER_URL = '/charge';

// const CURRENCY = 'USD';
// const fromUSDtoCent = amount => amount * 100;

// const successPayment = data => {
//   axios.post('/charge').then(res => {
//     console.log(res)
//   })
//     console.log('Payment Successful', data);
//   };

//   const errorPayment = data => {
//     console.log('Payment Error', data);
//   };

//   const onToken = (amount) => token =>
//   axios.post(PAYMENT_SERVER_URL,
//     {
//       source: token.id,
//       currency: CURRENCY,
//       amount: fromUSDtoCent(amount)
//     })
//     .then(successPayment)
//     .catch(errorPayment);

//     const Checkout = ({ name, description, amount }) =>
//   <StripeCheckout
//     name={name}
//     description={description}
//     amount={fromUSDtoCent(amount)}
//     token={onToken(amount)}
//     currency={CURRENCY}
//     stripeKey={STRIPE_PUBLISHABLE}
//   />

//   export default Checkout