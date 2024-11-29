// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeuSTgFZuiVnaCeXSBrm_iijVHk5fV79A",
    authDomain: "fir-app-40659.firebaseapp.com",
    databaseURL: "https://fir-app-40659-default-rtdb.firebaseio.com",
    projectId: "fir-app-40659",
    storageBucket: "fir-app-40659.firebasestorage.app",
    messagingSenderId: "60644023497",
    appId: "1:60644023497:web:44cf4ddb56fa9044de4118"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Handle Sign-In
  document.getElementById("signinForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;
  
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("authToken", idToken);
      window.location.href = "welcome.html"; // Redirect to the welcome page
    } catch (error) {
      document.getElementById("signinMessage").innerText = error.message;
    }
  });
  
  // Handle Sign-Up
  document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
  
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      document.getElementById("signupMessage").innerText = "Account created successfully!";
    } catch (error) {
      document.getElementById("signupMessage").innerText = error.message;
    }
  });
  