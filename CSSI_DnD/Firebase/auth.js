import { getAuth, signOut, EmailAuthProvider, GoogleAuthProvider, PhoneAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js';
import { auth } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase.js'; // think causes error - is this not a module?
import { AuthUI } from 'https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js'; // also causes error - is this not a module?

export class Auth {

  constructor() {
    this.authUI = new AuthUI(auth());
    this.displayName = null; // display name will be null if user is not signed in

    this.uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        PhoneAuthProvider.PROVIDER_ID,
        {
          provider: GoogleAuthProvider.PROVIDER_ID,
          recaptchaParameters: {
            size: 'invisible'
          }
        }
      ]
    };
  }

  signIn() {
    this.authUI.start('#firebaseui-auth-container', uiConfig);
    this.displayName = getAuth().currentUser.displayName;
  }

  signOut() {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(getAuth()).then(() => {
        this.displayName = null;
      }).catch((error) => {
        alert(`Error signing out. Error code: ${error}`);
      })
    }
  }

}