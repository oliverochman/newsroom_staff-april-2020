import React, { useState } from "react";
import { Header, Form, Button, Segment } from "semantic-ui-react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import axios from "axios";

const SubscriptionForm = props => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let userEmail = JSON.parse(localStorage.getItem("J-tockAuth-Storage")).uid;
  const [message, setMessage] = useState(undefined)

  const submitPayment = async event => {
    event.preventDefault();
    const response = await props.stripe.createToken()

    try {
      let paymentStatus = await axios.post(
        "/subscriptions",
        {
          stripeToken: response.token.id,
          email: userEmail
        },
        { headers: headers }
      );

      if (paymentStatus.status === 200)
        setMessage(paymentStatus.message);
    } catch (error) {
      setMessage(error.response.data.message)
    }
  }

  return (
    <>
      <div id="payment">
        <form id="payment-form">
          <h2>
            Payment Form
            </h2>
          <h5>
            Step above the crowd with our Premium Platinum Plan for only 10,000SEK per year.
            </h5>
          <h5>
            This yearly subscription will allow you to access all the amazing ultra premium content in addition to our free content.
            </h5>
  
          <div id="card-info">
            <label>Card Number: </label>
            <CardNumberElement id="cardnumber" />
            <label>"Expiry Date: </label>
            <CardExpiryElement id="exp-date" />
            <label>CVC: </label>
            <CardCVCElement id="cvc" />
            <button
              onClick={event => {
                submitPayment(event);
              }}
            >
              Submit Payment
              </button>
          </div>
        </form>
        <p id="subscription-message">{message}</p>
      </div>
    </>
  );
};


export default injectStripe(SubscriptionForm);
