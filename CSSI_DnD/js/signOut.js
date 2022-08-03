import { signOut } from '../Firebase/auth.js';

// needs sign out button with id="sign-out" (maybe only show if user is signed in?)
// import displayName from initializeFirebase.js to check
document.querySelector('#sign-out').addEventListener('click', signOut);