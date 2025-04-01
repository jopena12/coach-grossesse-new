import { scheduleAppointmentReminder } from '../services/notifications';
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// Créer le contexte
export const UserContext = createContext();

// Fournisseur de contexte
export const UserProvider = ({ children }) => {
  // État de l'utilisateur Firebase
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // État des données utilisateur
  const [userData, setUserData] = useState(() => {
    // Les données par défaut (à utiliser pour les nouveaux utilisateurs)
    const defaultData = {
      nom: 'Marie',
      semaine: 24,
      poidsInitial: 62,
      taille: 165,
      poidsActuel: 68,
      derniereSaisie: '28/03/2025',
      historiquePoidsDate: ['01/03/2025', '15/03/2025', '28/03/2025'],
      historiquePoids: [64, 66, 68],
      rdvMedicaux: [
        { id: 1, date: '15/04/2025', titre: 'Échographie 3ème trimestre', medecin: 'Dr. Dubois', notes: 'Apporter carnet de santé' },
        { id: 2, date: '28/03/2025', titre: 'Consultation mensuelle', medecin: 'Dr. Martin', notes: 'Fait - Tout va bien' },
      ],
      notes: 'Un peu de fatigue cette semaine, mais les nausées ont disparu.',
      essaiGratuit: {
        debut: new Date().toISOString(),
        joursRestants: 15
      },
      abonnement: {
        statut: 'essai', // 'essai', 'mensuel', 'grossesse', 'inactif'
        dateExpiration: null
      }
    };

    // En premier lieu, essayer de récupérer depuis localStorage (pour compatibilité)
    const savedData = localStorage.getItem('pregnancyAppUserData');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  // Observer les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // L'utilisateur est connecté, récupérer ses données depuis Firestore
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          
          if (docSnap.exists()) {
            // Données trouvées dans Firestore
            setUserData(docSnap.data());
          } else {
            // Premier login après inscription, utiliser les données locales actuelles
            // et les sauvegarder dans Firestore
            await setDoc(userDocRef, userData);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      }
      
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Sauvegarder les données utilisateur dans localStorage pour compatibilité
  // ET dans Firestore si l'utilisateur est connecté
  useEffect(() => {
    // Toujours sauvegarder dans localStorage pour le mode offline
    localStorage.setItem('pregnancyAppUserData', JSON.stringify(userData));
    
    // Si l'utilisateur est connecté, sauvegarder dans Firestore
    if (user) {
      const saveToFirestore = async () => {
        try {
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, userData);
        } catch (error) {
          // Si le document n'existe pas encore (updateDoc échoue)
          if (error.code === 'not-found') {
            try {
              const userDocRef = doc(db, "users", user.uid);
              await setDoc(userDocRef, userData);
            } catch (setError) {
              console.error("Erreur lors de la création du document:", setError);
            }
          } else {
            console.error("Erreur lors de la sauvegarde des données:", error);
          }
        }
      };
      
      saveToFirestore();
    }
  }, [userData, user]);

  // Fonctions pour mettre à jour les données (inchangées)
  const updateUserInfo = (newInfo) => {
    setUserData(prev => ({
      ...prev,
      ...newInfo
    }));
  };

  // Ajouter un nouveau poids
  const addWeight = (weight) => {
    const today = new Date().toLocaleDateString('fr-FR');
    setUserData(prev => ({
      ...prev,
      poidsActuel: weight,
      derniereSaisie: today,
      historiquePoidsDate: [...prev.historiquePoidsDate, today],
      historiquePoids: [...prev.historiquePoids, weight]
    }));
  };

  // Ajouter un rendez-vous médical
  const addAppointment = (appointment) => {
    const newId = userData.rdvMedicaux.length > 0 
      ? Math.max(...userData.rdvMedicaux.map(rdv => rdv.id)) + 1 
      : 1;
    
    const newAppointment = {
      id: newId,
      ...appointment
    };
    
    setUserData(prev => ({
      ...prev,
      rdvMedicaux: [...prev.rdvMedicaux, newAppointment]
    }));
    
    // Programmer une notification pour ce rendez-vous si disponible
    if (typeof scheduleAppointmentReminder === 'function') {
      scheduleAppointmentReminder(newAppointment);
    }
  };

  // Mettre à jour les notes
  const updateNotes = (notes) => {
    setUserData(prev => ({
      ...prev,
      notes: notes
    }));
  };

  // Mettre à jour l'abonnement
  const updateSubscription = (subscriptionType) => {
    let expiration = null;
    
    if (subscriptionType === 'mensuel') {
      const date = new Date();
      date.setMonth(date.getMonth() + 1);
      expiration = date.toISOString();
    } else if (subscriptionType === 'grossesse') {
      const date = new Date();
      date.setMonth(date.getMonth() + 9); // 9 mois
      expiration = date.toISOString();
    }
    
    setUserData(prev => ({
      ...prev,
      abonnement: {
        statut: subscriptionType,
        dateExpiration: expiration
      }
    }));
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  // Valeur du contexte étendue
  const value = {
    user,      // Nouvel état pour l'utilisateur Firebase
    userData,
    loading,   // Nouvel état pour indiquer le chargement
    updateUserInfo,
    addWeight,
    addAppointment,
    updateNotes,
    updateSubscription,
    logout     // Nouvelle fonction pour la déconnexion
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};