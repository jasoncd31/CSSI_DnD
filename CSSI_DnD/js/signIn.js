import { Auth } from '../Firebase/auth';
export let auth = {};

function signIn() {
  auth = new Auth();
  auth.signIn();
}