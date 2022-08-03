import { signIn } from '../Firebase/auth.js';

document.querySelector('#sign-in').addEventListener('click', signIn);