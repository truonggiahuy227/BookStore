import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BookContext } from "../context/books";
import { CartContext } from "../context/cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Popup from './Popup';
import Loading from './Loading';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

const CheckoutForm = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { checkout } = useContext(BookContext);
  const [orderDetails, setOrderDetails] = useState({ cart, total, address: null, token: null });
  const [error, setError] = useState(null);
  const [btnPopup, setBtnPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect( () => {
    async function fetchData (){
      if (orderDetails.token) {
        setLoading(true);
        await checkout(orderDetails);
        setLoading(false);
        setBtnPopup(true);
        //clearCart();
        //history.push("/");
      }
    }
    fetchData();
  }, [orderDetails]);

  // Handle real-time validation errors from the card Element.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      // Inform the user if there was an error.
      setError(result.error.message);
    } else {
      setError(null);
      // Send the token to your server.
      const token = result.token;
      setOrderDetails({ ...orderDetails, token: token.id });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="checkout-form">
          <label htmlFor="checkout-address">Shipping Address</label>
          <input
            id="checkout-address"
            type="text"
            onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
          />
          <div className="stripe-section">
            <label htmlFor="stripe-element"> Credit or debit card </label>
            <CardElement id="stripe-element" options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
          </div>
          <div className="card-errors" role="alert">
            {error}
          </div>
        </div>
        <button type="submit" className="btn">
          Submit Payment
        </button>
      </form>


      <Loading trigger={loading} setTrigger = {setLoading}/>

      <Popup trigger={btnPopup} setTrigger = {setBtnPopup}>
          <h2>Order is successful</h2>
      </Popup>

    </div>
  );
};

export default CheckoutForm;
