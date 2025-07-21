import { db } from "./firebase-config.js";
import {
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { logActivity } from "./logger.js";

function fetchPatientsForBilling() {
  const patientRef = ref(db, "patients/");
  onValue(patientRef, (snapshot) => {
    const data = snapshot.val();
    const billingDiv = document.getElementById("billingSection");
    billingDiv.innerHTML = "";

    if (!data) {
      billingDiv.innerHTML = "<p>No patients available.</p>";
      return;
    }

    let unbilledPatientsFound = false;

    for (let id in data) {
      const patient = data[id];

      // Show only patients without a bill amount
      if (!patient.billAmount) {
        unbilledPatientsFound = true;

        const billingCard = document.createElement("div");
        billingCard.classList.add("card");
        billingCard.innerHTML = `
                    <h4>${patient.name} (Token: ${patient.token})</h4>
                    <p>Age: ${patient.age}</p>
                    <p>Symptoms: ${patient.symptoms}</p>
                    <p>Registration Date: ${patient.registrationDate}</p>

                    <p>Prescription: ${
                      patient.prescription || "Not added yet"
                    }</p>
                    <div class="prescription-input">
                        <input type="number" id="bill_${id}" placeholder="Enter Bill Amount">
                        <button onclick="generateBill('${id}', document.getElementById('bill_${id}').value)">Generate Bill</button>
                    </div>
                `;
        billingDiv.appendChild(billingCard);
      }
    }

    if (!unbilledPatientsFound) {
      billingDiv.innerHTML = "<p>No new patients waiting for billing.</p>";
    }
  });
}

function generateBill(patientId, amount) {
  const patientRef = ref(db, "patients/" + patientId);
  update(patientRef, { billAmount: amount })
    .then(() => {
      alert("Bill generated successfully.");
      logActivity(
        "Bill generated for patient: " + patientId + " with amount: " + amount
      );
    })
    .catch((error) => {
      console.error("Error generating bill:", error);
    });
}

window.fetchPatientsForBilling = fetchPatientsForBilling;
window.generateBill = generateBill;