import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js';
import { firestore } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyBWsaTGRve33eBNZKm87rJCYW0nfn2J3rc",
  authDomain: "cssi-project-8bf38.firebaseapp.com",
  projectId: "cssi-project-8bf38",
  storageBucket: "cssi-project-8bf38.appspot.com",
  messagingSenderId: "963989694906",
  appId: "1:963989694906:web:916f0d06a18f4dea8fd583"
};

export const app = initializeApp(firebaseConfig);