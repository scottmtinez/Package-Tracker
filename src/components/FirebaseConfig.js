// Import Firebase modules
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyCumCkz_VqXhkffH0QLlRVaMfY5Sv_fv1c",
    authDomain: "package-tracker-280db.firebaseapp.com",
    projectId: "package-tracker-280db",
    storageBucket: "package-tracker-280db.appspot.com",
    messagingSenderId: "18655878023",
    appId: "1:18655878023:web:c846f5012d2f937ffd5122",
    measurementId: "G-4P7PL07CGS"
    };

// Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app); // Initialize Firebase Authentication

    export { auth };
