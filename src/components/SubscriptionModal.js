import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

function SubscriptionModal() {
  const { userData, updateSubscription } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  // Vérifiez si l'utilisateur est en période d'essai et si elle est terminée
  useEffect(() => {
    if (userData.abonnement.statut === 'showModal') {
      setShowModal(true);
      // Réinitialiser le statut pour éviter de montrer le modal en boucle
      updateSubscription('essai'); 
    }
  }, [userData.abonnement.statut, updateSubscription]);
  
  const handleSubscribe = (type) => {
    updateSubscription(type);
    setShowModal(false);
  };
  
  const remindLater = () => {
    setShowModal(false);
    // Dans une application réelle, on définirait un rappel
  };
  
  // Si la modal ne doit pas être affichée, ne rendez rien
  if (!showModal) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '100%',
        padding: '24px'
      }}>
        <div style={{marginBottom: '24px', textAlign: 'center'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', color: '#805ad5', marginBottom: '8px'}}>
            Votre période d'essai est terminée
          </h2>
          <p style={{color: '#718096'}}>
            Continuez à suivre votre grossesse sereinement avec Coach Virtuel
          </p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px'}}>
          <div 
            onClick={() => handleSubscribe('mensuel')} 
            style={{
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer'
            }}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
              <h3 style={{fontWeight: 'bold'}}>Abonnement mensuel</h3>
              <span style={{fontWeight: 'bold', color: '#805ad5'}}>8,99€/mois</span>
            </div>
            <p style={{fontSize: '14px', color: '#718096'}}>Accès à toutes les fonctionnalités premium</p>
            <p style={{fontSize: '14px', color: '#718096'}}>Prélevé mensuellement, annulable à tout moment</p>
          </div>

          <div 
            onClick={() => handleSubscribe('grossesse')} 
            style={{
              border: '2px solid #805ad5',
              borderRadius: '8px',
              padding: '16px',
              cursor: 'pointer',
              backgroundColor: '#f5f3ff',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '12px',
              backgroundColor: '#805ad5',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              Recommandé
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
              <h3 style={{fontWeight: 'bold'}}>Forfait grossesse</h3>
              <div>
                <span style={{fontWeight: 'bold', color: '#805ad5'}}>49,99€</span>
                <span style={{fontSize: '12px', color: '#718096', marginLeft: '4px'}}>paiement unique</span>
              </div>
            </div>
            <p style={{fontSize: '14px', color: '#718096'}}>Économisez plus de 30€ sur 9 mois</p>
            <p style={{fontSize: '14px', color: '#718096'}}>Accès illimité jusqu'à 3 mois après l'accouchement</p>
            <div style={{
              marginTop: '8px',
              backgroundColor: '#e9d8fd',
              borderRadius: '9999px',
              padding: '4px 12px',
              display: 'inline-block'
            }}>
              <p style={{fontSize: '12px', fontWeight: '500', color: '#805ad5'}}>Économie de 40%</p>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <button 
            onClick={remindLater}
            style={{
              padding: '12px',
              color: '#718096',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Me le rappeler plus tard
          </button>
          <p style={{fontSize: '12px', textAlign: 'center', color: '#718096'}}>
            En vous abonnant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
            Votre abonnement sera automatiquement renouvelé jusqu'à annulation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionModal;