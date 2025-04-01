import { useContext, useEffect } from 'react';
import { UserContext } from '..//contexts/UserContext';

function WeekUpdater() {
  const { userData, updateUserInfo } = useContext(UserContext);

  // Fonction pour mettre à jour les semaines automatiquement
  useEffect(() => {
    // Ne rien faire si la date d'accouchement n'est pas définie
    if (!userData.dateAccouchementPrevue) return;

    // Fonction pour calculer les semaines d'aménorrhée actuelles
    const updateWeeks = () => {
      try {
        // Convertir la date d'accouchement prévue en Date
        const [day, month, year] = userData.dateAccouchementPrevue.split('/').map(num => parseInt(num, 10));
        const dueDate = new Date(year, month - 1, day);
        
        // Calculer la date des dernières règles (40 semaines avant l'accouchement)
        const ddrDate = new Date(dueDate);
        ddrDate.setDate(dueDate.getDate() - 280);
        
        // Calculer les semaines d'aménorrhée actuelles
        const today = new Date();
        const diffTime = Math.abs(today - ddrDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const currentSA = Math.floor(diffDays / 7);
        
        // Mettre à jour seulement si les semaines ont changé
        if (currentSA !== userData.semaine) {
          updateUserInfo({ semaine: currentSA });
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour des semaines:", error);
      }
    };

    // Mettre à jour les semaines immédiatement
    updateWeeks();
    
    // Configurer une mise à jour quotidienne
    const intervalId = setInterval(updateWeeks, 24 * 60 * 60 * 1000); // Une fois par jour
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [userData.dateAccouchementPrevue, userData.semaine, updateUserInfo]);

  // Ce composant ne rend rien, il effectue uniquement des mises à jour en arrière-plan
  return null;
}

export default WeekUpdater;