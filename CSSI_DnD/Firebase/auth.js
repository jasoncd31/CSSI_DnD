import { getAuth, signOut } from "firebase/auth";

export default class Auth {

  constructor() {
    this.authUI = new firebaseui.auth.AuthUI(firebase.auth());
    this.displayName = 'You';

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
    this.displayName = getAuth().currentUser.displayName;
  }

  signOut() {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(getAuth()).then(() => {
        alert('Successfully signed out!') // todo do we want this or is this just annoying
      }).catch((error) => {
        alert(`Error signing out. Error code: ${error}`)
      })
    }
  }

  // getDisplayName() {
  //   const user = getAuth().currentUser;
    
  //   if (user !== null) {
  //     return user.displayName;
  //   }
  // }

}