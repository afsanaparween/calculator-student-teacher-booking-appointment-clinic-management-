import { db } from "./firebase-config.js";
import {
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { logActivity } from "./logger.js";

function generateToken() {
  return "TKN" + Math.floor(1000 + Math.random() * 9000);
}

function registerPatient(name, age, symptoms) {
  const token = generateToken();
  const patientRef = push(ref(db, "patients/"));

  // Save the current date and time
  const registrationDate = new Date().toLocaleString();

  set(patientRef, {
    token: token,
    name: name,
    age: age,
    symptoms: symptoms,
    registrationDate: registrationDate, // ✅ Save the date here
  })
    .then(() => {
      alert("Patient Registered with Token: " + token);
      logActivity("New patient registered with token: " + token);
      document.getElementById("patientForm").reset();
    })
    .catch((error) => {
      console.error("Error adding patient:", error);
    });
}

document
  .getElementById("patientForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const symptoms = document.getElementById("patientSymptoms").value;
    registerPatient(name, age, symptoms);
  });