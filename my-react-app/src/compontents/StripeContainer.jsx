
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const Public_key =
  'pk_test_51NbKBLSECynzp1hn5WSscPAiDvjqVirhlO1c3etR5g5RKa6SWRCOFJg5vuZBEM9LdTvtMVkhaG82C8T72jP8THdO009DwS4AGo';

const stripeTestPromise = loadStripe(Public_key);

const StripeContainer = () => {
  const [count, setCount] = useState(0);
  const [showItem, setShowItem] = useState(false);

  const handlePurchaseClick = () => {
    setShowItem(true);
  };

  return (
    <>
      <div className="App">
        <h1>something</h1>
        {showItem ? (
          <Elements stripe={stripeTestPromise}>
            <PaymentForm />
          </Elements>
        ) : (
          <>
            <h3>
              <button onClick={handlePurchaseClick}> Purchase it </button>
            </h3>
          </>
        )}
      </div>
    </>
  );
};

export default StripeContainer;
