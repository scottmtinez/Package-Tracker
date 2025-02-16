// Import Firebase modules
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
    const firebaseConfig = {
    apiKey: "HIDDEN",
    authDomain: "HIDDEN",
    projectId: "HIDDEN",
    storageBucket: "HIDDEN",
    messagingSenderId: "HIDDEN",
    appId: "HIDDEN",
    measurementId: "G-4P7PL07CGS"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app); // Initialize Firebase Authentication

    export { auth };
