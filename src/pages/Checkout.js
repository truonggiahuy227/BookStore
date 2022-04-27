import React, {useState, useEffect} from 'react'
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import Auth from './Auth'

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51KrnERJRfHDPeKGRnsUu8JI9wkcszMXRAaMKGWBQFymHjDivETati0BtHLfmFziwYU9mNOFIjL8vTGKJ9Njkaap0004r1Y4Dyq');


    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);


    return authState === AuthState.SignedIn && user ? (
        <section className="checkout-wrapper">
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
        </section>
    ) : (<Auth/>)
}

export default Checkout
