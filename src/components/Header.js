import React, { useState, useEffect} from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Link } from 'react-router-dom';

const Header = () => {


    const [authState, setAuthState] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData);
        });
    }, []);




    return (
        <header className="main-head">
            <nav>
                <h1 id="logo">Book Store</h1>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    <li>
                        <Link to="/checkout">Checkout</Link>
                    </li>
                    {authState === AuthState.SignedIn && user ? (
                        
                        <AmplifySignOut></AmplifySignOut>
                    ):(
                        <li>
                        <Link to="/auth">Sign in/Sign up</Link>
                    </li>)
                }
                    
                </ul>
            </nav>
        </header>
    )
}

export default Header
