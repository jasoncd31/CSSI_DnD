import { getAuth, signOut, EmailAuthProvider, GoogleAuthProvider, PhoneAuthProvider } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js';

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

// export class Auth {

//   constructor() {
//     this.authUI = new firebaseui.auth.AuthUI(firebase.auth());
//     this.displayName = null; // display name will be null if user is not signed in

//     this.uiConfig = {
//       signInOptions: [
//         EmailAuthProvider.PROVIDER_ID,
//         PhoneAuthProvider.PROVIDER_ID,
//         {
//           provider: GoogleAuthProvider.PROVIDER_ID,
//           recaptchaParameters: {
//             size: 'invisible'
//           }
//         }
//       ]
//     };
//   }

//   signIn() {
//     this.authUI.start('#firebaseui-auth-container', uiConfig);
//     this.displayName = getAuth().currentUser.displayName;
//   }

//   signOut() {
//     if (window.confirm('Are you sure you want to sign out?')) {
//       signOut(getAuth()).then(() => {
//         window.displayName = null;
//       }).catch((error) => {
//         alert(`Error signing out. Error code: ${error}`);
//       })
//     }
//   }

// }