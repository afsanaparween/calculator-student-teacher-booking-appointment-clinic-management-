import { db } from "./firebase-config.js";
import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

function loadPatientHistory() {
  const patientRef = ref(db, "patients/");
  onValue(patientRef, (snapshot) => {
    const data = snapshot.val();
    const historyDiv = document.getElementById("patientHistory");
    historyDiv.innerHTML = "";

    for (let id in data) {
      const patient = data[id];
      const patientCard = document.createElement("div");
      patientCard.innerHTML = `
                <h4>${patient.name} (Token: ${patient.token})</h4>
                <p>Age: ${patient.age}</p>
                <p>Symptoms: ${patient.symptoms}</p>
                <p>Registration Date: ${patient.registrationDate}</p>
                <p>Prescription: ${patient.prescription || "Not added yet"}</p>
                <p>Bill Amount: ${patient.billAmount || "Not generated yet"}</p>
                <hr>
            `;
      historyDiv.appendChild(patientCard);
    }
  });
}

window.loadPatientHistory = loadPatientHistory;