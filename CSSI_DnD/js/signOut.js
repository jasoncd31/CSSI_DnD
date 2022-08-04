import { signOut } from '../Firebase/auth.js';

// needs sign out button with id="sign-out"
document.querySelector('#sign-out').addEventListener('click', signOut);