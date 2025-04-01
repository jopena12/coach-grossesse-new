// src/services/database.js
import { db } from "../firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { auth } from "../firebase";

// Fonction pour sauvegarder/mettre à jour le profil utilisateur
export const saveUserProfile = async (profileData) => {
  try {
    const userId = auth.currentUser.uid;
    await setDoc(doc(db, "users", userId), {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du profil:", error);
    throw error;
  }
};

// Fonction pour sauvegarder un rendez-vous médical
export const saveMedicalAppointment = async (appointmentData) => {
  try {
    const userId = auth.currentUser.uid;
    if (appointmentData.id) {
      // Mise à jour d'un rendez-vous existant
      const appointmentRef = doc(db, "users", userId, "medicalAppointments", appointmentData.id);
      await updateDoc(appointmentRef, {
        ...appointmentData,
        updatedAt: serverTimestamp()
      });
      return appointmentData.id;
    } else {
      // Création d'un nouveau rendez-vous
      const appointmentsRef = collection(db, "users", userId, "medicalAppointments");
      const docRef = await addDoc(appointmentsRef, {
        ...appointmentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    }
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du rendez-vous:", error);
    throw error;
  }
};

// Fonction pour récupérer tous les rendez-vous médicaux
export const getMedicalAppointments = async () => {
  try {
    const userId = auth.currentUser.uid;
    const appointmentsRef = collection(db, "users", userId, "medicalAppointments");
    const q = query(appointmentsRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);
    const appointments = [];
    querySnapshot.forEach((doc) => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    return appointments;
  } catch (error) {
    console.error("Erreur lors de la récupération des rendez-vous:", error);
    throw error;
  }
};

// Fonction pour supprimer un rendez-vous médical
export const deleteMedicalAppointment = async (appointmentId) => {
  try {
    const userId = auth.currentUser.uid;
    await deleteDoc(doc(db, "users", userId, "medicalAppointments", appointmentId));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression du rendez-vous:", error);
    throw error;
  }
};

// Fonction pour sauvegarder un suivi de poids
export const saveWeightEntry = async (weightData) => {
  try {
    const userId = auth.currentUser.uid;
    const weightsRef = collection(db, "users", userId, "weightTracker");
    const docRef = await addDoc(weightsRef, {
      ...weightData,
      date: weightData.date || new Date(),
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du poids:", error);
    throw error;
  }
};

// Fonction pour récupérer tous les suivis de poids
export const getWeightEntries = async () => {
  try {
    const userId = auth.currentUser.uid;
    const weightsRef = collection(db, "users", userId, "weightTracker");
    const q = query(weightsRef, orderBy("date", "asc"));
    const querySnapshot = await getDocs(q);
    const weights = [];
    querySnapshot.forEach((doc) => {
      weights.push({ id: doc.id, ...doc.data() });
    });
    return weights;
  } catch (error) {
    console.error("Erreur lors de la récupération des poids:", error);
    throw error;
  }
};