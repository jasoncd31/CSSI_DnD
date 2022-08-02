// import { Auth } from '../Firebase/auth.js'; // todo why is this broken
export let auth = {};

function signIn() {
    console.log("function called");
    auth = new Auth();
    auth.signIn();
}

console.log("script running");
document.querySelector("#sign-in").addEventListener("click", signIn);
