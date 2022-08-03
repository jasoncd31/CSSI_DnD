export const app = firebase.initializeApp(firebaseConfig);
export let displayName = null; // display name will be null if user is not signed in

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    displayName = user.displayName ? user.displayName : user.email.split('@')[0];
  }
  else {
    displayName = null;
  }
});