export const app = firebase.initializeApp(firebaseConfig);
let displayName = null; // display name will be null if user is not signed in

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    displayName = user.displayName ? user.displayName : user.email.split('@')[0];
    console.log('displayName');
  }
  else {
    console.log('signed out somehow');
    displayName = null;
  }
});

export function getDisplayName() {
  return displayName;
}