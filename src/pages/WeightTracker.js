import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

function WeightTracker() {
  const { userData, addWeight, user } = useContext(UserContext);
  const [newWeight, setNewWeight] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculer la prise de poids actuelle
  const prisePoidsCourante = userData.poidsActuel - userData.poidsInitial;

  // Fonction pour calculer les poids recommandés
  const calculerPrisePoids = () => {
    const semaine = userData.semaine;
    if (semaine <= 12) {
      return { min: 0, max: 2 };
    } else if (semaine <= 24) {
      return { min: 2, max: 6 };
    } else if (semaine <= 36) {
      return { min: 6, max: 11 };
    } else {
      return { min: 11, max: 16 };
    }
  };

  const prisePoids = calculerPrisePoids();

  // Fonction pour ajouter un nouveau poids
  const handleAddWeight = async () => {
    if (newWeight && !isNaN(newWeight)) {
      setLoading(true);
      
      try {
        // La fonction addWeight du contexte gère maintenant la sauvegarde locale et cloud
        await addWeight(parseFloat(newWeight));
        setNewWeight('');
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du poids:", error);
        alert("Une erreur est survenue lors de l'enregistrement du poids.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="card-title">Suivi de votre prise de poids</h2>
      
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
          <div>
            <p style={{fontSize: '14px', color: '#666'}}>Poids initial</p>
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>{userData.poidsInitial} kg</p>
          </div>
          <div>
            <p style={{fontSize: '14px', color: '#666'}}>Poids actuel</p>
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>{userData.poidsActuel} kg</p>
          </div>
          <div>
            <p style={{fontSize: '14px', color: '#666'}}>Poids total</p>
            <p style={{fontSize: '18px', fontWeight: 'bold'}}>{prisePoidsCourante} kg</p>
          </div>
        </div>

        <div style={{marginBottom: '20px'}}>
          <p style={{fontSize: '14px', color: '#666', marginBottom: '8px'}}>
            Objectif recommandé pour la semaine {userData.semaine}
          </p>
          <div style={{width: '100%', height: '16px', backgroundColor: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden'}}>
            <div 
              style={{
                height: '16px', 
                borderRadius: '9999px',
                width: `${Math.min(100, (prisePoidsCourante / prisePoids.max) * 100)}%`,
                backgroundColor: prisePoidsCourante > prisePoids.max ? '#fc8181' : 
                               prisePoidsCourante < prisePoids.min ? '#63b3ed' : '#68d391'
              }}
            ></div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px'}}>
            <span>{prisePoids.min} kg</span>
            <span>{prisePoids.max} kg</span>
          </div>
        </div>

        <div style={{padding: '16px', backgroundColor: '#f7fafc', borderRadius: '8px'}}>
          <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '8px'}}>Ajouter une nouvelle mesure</h3>
          <div style={{display: 'flex'}}>
            <input 
              type="number" 
              placeholder="Poids en kg" 
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                marginRight: '8px'
              }}
              disabled={loading}
            />
            <button 
              onClick={handleAddWeight}
              style={{
                padding: '8px 16px',
                backgroundColor: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
          
          {/* Indicateur de synchronisation pour montrer que les données sont enregistrées dans le cloud */}
          {user && (
            <p style={{
              fontSize: '12px', 
              color: '#718096', 
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#68d391',
                display: 'inline-block',
                marginRight: '6px'
              }}></span>
              Synchronisé avec votre compte
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeightTracker;