import { db } from "./firebase-config.js";
import {
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { logActivity } from "./logger.js";

function fetchPatients() {
  const patientRef = ref(db, "patients/");
  onValue(patientRef, (snapshot) => {
    const data = snapshot.val();
    const displayDiv = document.getElementById("patients");
    displayDiv.innerHTML = "";

    if (!data) {
      displayDiv.innerHTML = "<p>No patients available.</p>";
      return;
    }

    let newPatientsFound = false;

    for (let id in data) {
      const patient = data[id];

      // Show only patients without a prescription (new patients)
      if (!patient.prescription) {
        newPatientsFound = true;

        const patientCard = document.createElement("div");
        patientCard.classList.add("card");
        patientCard.innerHTML = `
                    <h4>${patient.name} (Token: ${patient.token})</h4>
                    <p>Age: ${patient.age}</p>
                    <p>Symptoms: ${patient.symptoms}</p>
                    <p>Registration Date: ${patient.registrationDate}</p>

                    <div class="prescription-input">
                    
    <textarea id="prescription_${id}" placeholder="Enter Prescription"></textarea>
    <button onclick="addPrescription('${id}', document.getElementById('prescription_${id}').value)">Add Prescription</button>
</div>

                `;
        displayDiv.appendChild(patientCard);
      }
    }

    if (!newPatientsFound) {
      displayDiv.innerHTML = "<p>No new patients waiting for consultation.</p>";
    }
  });
}

function addPrescription(patientId, prescription) {
  const patientRef = ref(db, "patients/" + patientId);
  update(patientRef, { prescription: prescription })
    .then(() => {
      alert("Prescription added successfully.");
      logActivity("Prescription added for patient: " + patientId);
    })
    .catch((error) => {
      console.error("Error adding prescription:", error);
    });
}

window.fetchPatients = fetchPatients;
window.addPrescription = addPrescription;