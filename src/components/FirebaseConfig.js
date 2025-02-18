// Import Firebase modules
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
    const firebaseConfig = {
        "HIDDEN"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app); 

    export { auth };
