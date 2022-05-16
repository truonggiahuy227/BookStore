import React, { useState, useEffect} from 'react'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';


const Auth = () => {
   
    return (
        <div className='auth-form'>
        <AmplifyAuthenticator >
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            { type: 'username' },
            { type: 'password' },
            { type: 'email' },
          ]}
        />
      </AmplifyAuthenticator>
        </div>
    )

}

export default Auth;