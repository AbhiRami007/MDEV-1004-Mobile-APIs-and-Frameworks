// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeuSTgFZuiVnaCeXSBrm_iijVHk5fV79A",
  authDomain: "fir-app-40659.firebaseapp.com",
  databaseURL: "https://fir-app-40659-default-rtdb.firebaseio.com/",
  projectId: "fir-app-40659",
  storageBucket: "fir-app-40659.firebasestorage.app",
  messagingSenderId: "60644023497",
  appId: "1:60644023497:web:44cf4ddb56fa9044de4118",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Handle Sign-In
document.getElementById("signinForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signinEmail").value;
  const password = document.getElementById("signinPassword").value;

  try {
    const response = await fetch("http://localhost:3000/firebase/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        try {
            const userCredential = await firebase.auth().signInWithCustomToken(data.token);
            console.log("Signed in successfully:", userCredential);
        
            // Now retrieve the ID token after successful sign-in
            const idToken = await userCredential.user.getIdToken();
            console.log("ID Token:", idToken);
        
            // Store the ID token in localStorage or use it as needed
            localStorage.setItem("authToken", idToken);
            window.location.href = "welcome.html";
          } catch (error) {
            console.error("Error signing in with custom token:", error.message);
          }
      } else {
        document.getElementById("signinMessage").innerText = "No token found.";
      }
    } else {
      document.getElementById("signinMessage").innerText =
        data.error || "An unknown error occurred.";
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    document.getElementById("signinMessage").innerText =
      "An error occurred. Please try again.";
  }
});

// Handle Sign-Up
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const response = await fetch("http://localhost:3000/firebase/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("signupMessage").innerText =
        "Account created successfully!";
    } else {
      document.getElementById("signupMessage").innerText = data.error;
    }
  } catch (error) {
    console.error("Error during sign-up:", error);
    document.getElementById("signupMessage").innerText =
      "An error occurred. Please try again.";
  }
});
