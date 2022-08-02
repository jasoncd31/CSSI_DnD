import { Auth } from '../Firebase/auth';
export let auth = {};

function signIn() {
  console.log('script running');
  auth = new Auth();
  auth.signIn();
}

document.querySelector('#sign-in').addEventListener('click', signIn);