
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzd-iryb1Ago9h4puoScN_3urdsInprcw",
  authDomain: "magictouch-ecomemrce.firebaseapp.com",
  databaseURL: "https://magictouch-ecomemrce-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "magictouch-ecomemrce",
  storageBucket: "magictouch-ecomemrce.firebasestorage.app",
  messagingSenderId: "290719268142",
  appId: "1:290719268142:web:f087a30956ca17af3c0ebf"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
