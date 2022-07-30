import { getAuth } from "firebase/auth";

class Auth {

  constructor() {
    this.authUI = new firebaseui.auth.AuthUI(firebase.auth());

    this.uiConfig = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: 'invisible'
          }
        }
      ]
    }
  }

  signIn() {
    authUI.start('#firebaseui-auth-container', uiConfig);
  }

  signOut() {

  }
}

// export default Auth.authUI

// import {authUI} from 'auth'