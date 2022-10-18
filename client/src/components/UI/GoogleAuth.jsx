import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { GOOGLE_CLIENT_ID } from '../../Constant'

const GoogleAuth = (props) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleLogin  onSuccess={props.onSuccess}>
      <i className="fa-brands fa-google"></i>
      Sign in with google
    </GoogleLogin>
  </GoogleOAuthProvider>
  )
}

export default GoogleAuth