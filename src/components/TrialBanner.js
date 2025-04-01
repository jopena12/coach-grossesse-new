import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function TrialBanner() {
  const { userData, updateSubscription } = useContext(UserContext);
  
  // Si l'utilisateur est déjà abonné, ne montrez pas la bannière
  if (userData.abonnement.statut !== 'essai') {
    return null;
  }
  
  return (
    <div style={{
      backgroundColor: '#f5f3ff',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{fontSize: '14px'}}>
        <span style={{fontWeight: 'bold', color: '#805ad5'}}>
          Essai gratuit : {userData.essaiGratuit.joursRestants} jours restants
        </span>
      </div>
      <button 
        onClick={() => updateSubscription('showModal')}
        style={{
          backgroundColor: '#805ad5',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '8px',
          fontSize: '12px',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        S'abonner maintenant
      </button>
    </div>
  );
}

export default TrialBanner;