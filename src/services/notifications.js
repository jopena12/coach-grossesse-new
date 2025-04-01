// src/services/notifications.js
import { messaging } from "../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Demander la permission pour les notifications
export const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.log('Ce navigateur ne prend pas en charge les notifications');
      return false;
    }
    
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      try {
        const currentToken = await getToken(messaging, {
          vapidKey: 'VOTRE_CLE_VAPID' // Remplacez par votre clé VAPID
        });
        
        if (currentToken && auth.currentUser) {
          // Sauvegarder le token dans Firestore
          await setDoc(
            doc(db, "users", auth.currentUser.uid),
            { fcmToken: currentToken },
            { merge: true }
          );
        }
        
        return true;
      } catch (error) {
        console.error("Erreur lors de l'obtention du token:", error);
        return false;
      }
    } else {
      console.log('Permission de notification refusée');
      return false;
    }
  } catch (error) {
    console.error("Erreur lors de la demande de permission:", error);
    return false;
  }
};

// Configurer la réception de notifications
export const setupNotifications = () => {
  onMessage(messaging, (payload) => {
    console.log('Message reçu:', payload);
    
    if (payload.notification) {
      showCustomNotification(
        payload.notification.title,
        payload.notification.body
      );
    }
  });
};

// Afficher une notification personnalisée dans l'application
const showCustomNotification = (title, body) => {
  // Créer l'élément de notification
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'app-notification';
  notificationContainer.style.position = 'fixed';
  notificationContainer.style.top = '20px';
  notificationContainer.style.right = '20px';
  notificationContainer.style.zIndex = '1000';
  notificationContainer.style.backgroundColor = 'white';
  notificationContainer.style.borderRadius = '8px';
  notificationContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  notificationContainer.style.overflow = 'hidden';
  notificationContainer.style.width = '300px';
  notificationContainer.style.animation = 'slideIn 0.3s ease-out';
  
  // Créer le contenu de la notification
  const content = `
    <div style="background-color: #805ad5; color: white; padding: 12px 16px; position: relative;">
      <h4 style="margin: 0; font-size: 16px;">${title}</h4>
      <button style="position: absolute; top: 8px; right: 8px; background: none; border: none; color: white; font-size: 16px; cursor: pointer;">×</button>
    </div>
    <div style="padding: 16px;">
      <p style="margin: 0; color: #4a5568;">${body}</p>
    </div>
  `;
  
  notificationContainer.innerHTML = content;
  document.body.appendChild(notificationContainer);
  
  // Ajouter l'animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Configurer le bouton de fermeture
  const closeButton = notificationContainer.querySelector('button');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(notificationContainer);
  });
  
  // Supprimer automatiquement après 5 secondes
  setTimeout(() => {
    if (document.body.contains(notificationContainer)) {
      document.body.removeChild(notificationContainer);
    }
  }, 5000);
};

// Programmer une notification pour un rendez-vous
export const scheduleAppointmentReminder = (appointment) => {
  // Vérifier si l'objet et la date sont valides
  if (!appointment || !appointment.date) {
    console.error("Données de rendez-vous invalides pour la programmation de rappel");
    return false;
  }
  
  let appointmentDate;
  
  // Convertir la date en objet Date
  if (appointment.date instanceof Date) {
    appointmentDate = appointment.date;
  } else if (typeof appointment.date === 'string') {
    // Si c'est une chaîne au format JJ/MM/AAAA
    if (appointment.date.includes('/')) {
      const [day, month, year] = appointment.date.split('/');
      appointmentDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );
    } else {
      // Essayer de parser comme une date ISO
      appointmentDate = new Date(appointment.date);
    }
  }
  
  if (isNaN(appointmentDate.getTime())) {
    console.error("Date de rendez-vous invalide");
    return false;
  }
  
  // Calculer la date du rappel (1 jour avant)
  const reminderDate = new Date(appointmentDate);
  reminderDate.setDate(reminderDate.getDate() - 1);
  
  // Ne programmer que si la date de rappel est dans le futur
  const now = new Date();
  if (reminderDate <= now) {
    console.log("La date de rappel est déjà passée");
    return false;
  }
  
  // Calculer le délai jusqu'au rappel
  const timeToReminder = reminderDate.getTime() - now.getTime();
  
  // Programmer la notification locale
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Rappel de rendez-vous', {
        body: `Vous avez un rendez-vous "${appointment.title || appointment.titre}" demain`,
        icon: '/logo.svg'
      });
      
      // Ouvrir l'application au clic sur la notification
      notification.onclick = function() {
        window.focus();
      };
    }
  }, timeToReminder);
  
  console.log(`Rappel programmé pour ${appointment.title || appointment.titre} le ${reminderDate.toLocaleDateString()}`);
  return true;
};