import { db } from "./firebase-config.js";

function login(userType, username, password) {
  if (
    userType === "doctor" &&
    username === "doctor" &&
    password === "DOCTORd456"
  ) {
    window.location.href = "doctor.html";
  } else if (
    userType === "receptionist" &&
    username === "receptionist" &&
    password === "RECEPTIONr456"
  ) {
    window.location.href = "receptionist.html";
  } else {
    alert("Invalid Credentials");
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    login(role, username, password);
  });