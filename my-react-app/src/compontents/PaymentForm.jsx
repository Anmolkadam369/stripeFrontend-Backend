import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null); // Added error state
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3000/payments", {
          amount: 999999,
          id,
        });
        if (response.data.success) {
            console.log(response)
          console.log("successful payment");
          setSuccess(true);
        } else {
          setError("Payment failed");
        }
      } catch (error) {
        console.error("Error from catch", error);
        setError("Payment failed");
      }
    } else {
      console.error(error.message);
      setError(error.message); // Set the error state
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>PAY</button>
          {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message */}
        </form>
      ) : (
        <div>
          <h2>You just bought our membership</h2>
        </div>
      )}
    </div>
  );
}
