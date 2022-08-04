const auth = firebase.auth();

export function signIn() {
  const authUI = new firebaseui.auth.AuthUI(auth);
  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/dashboard',
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
    auth.signOut().then(() => {
      window.displayName = null;
      window.location.href = '/index';
    }).catch((error) => {
      alert(`Error signing out. Error code: ${error}`);
    })
  }
}