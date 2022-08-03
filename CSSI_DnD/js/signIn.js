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
document.querySelector('#sign-in').addEventListener('click', () => {
  authUI.start('#firebaseui-auth-container', uiConfig);
  window.displayName = getAuth().currentUser.displayName;
})