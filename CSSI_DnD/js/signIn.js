import { Auth } from "../Firebase/auth";
export let auth = {};

function signIn() {
    console.log("function called");
    auth = new Auth();
    auth.signIn();
}

console.log("script running");
document.querySelector("#sign-in").addEventListener("click", signIn);
