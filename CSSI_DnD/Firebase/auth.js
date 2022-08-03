export function signIn() {
  const authUI = new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
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
  };
  authUI.start('#firebaseui-auth-container', uiConfig);
}

export function signOut() {
  if (window.confirm('Are you sure you want to sign out?')) {
    firebase.auth().signOut().then(() => {
      window.displayName = null;
    }).catch((error) => {
      alert(`Error signing out. Error code: ${error}`);
    })
  }
}