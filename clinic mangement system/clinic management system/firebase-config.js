import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAVNmwu4qC3TXPF3GDRvxMaX5WAaBjVkk",
  authDomain: "clinic-management-system-89797.firebaseapp.com",
  databaseURL:
    "https://clinic-management-system-89797-default-rtdb.firebaseio.com",
  projectId: "clinic-management-system-89797",
  storageBucket: "clinic-management-system-89797.appspot.com",
  messagingSenderId: "432733743798",
  appId: "1:432733743798:web:51525e0fe610349e10d417",
  measurementId: "G-C6S8TD6X25",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };