import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8fOo6_7hrvWQk3ucNqJMRc5slhQ4dzzw",
  authDomain: "rconnect-397008.firebaseapp.com",
  projectId: "rconnect-397008",
  storageBucket: "rconnect-397008.appspot.com",
  messagingSenderId: "647035752821",
  appId: "1:647035752821:web:26c3c5b8d5d56d2e26833c",
  measurementId: "G-MHR4YJ5VM7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
