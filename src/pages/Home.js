import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function Home() {
  const { userData } = useContext(UserContext);

  const prisePoidsCourante = userData.poidsActuel - userData.poidsInitial;
  const imc = (userData.poidsInitial / ((userData.taille / 100) ** 2)).toFixed(1);

  return (
    <div>
      <div className="card card-purple">
        <h2 className="card-title">Bonjour {userData.prenom}!</h2>
        <p>Vous êtes à <span style={{fontWeight: 'bold'}}>semaine {userData.semaine}</span> de votre grossesse.</p>
        <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
          <div style={{width: '64px', height: '64px', backgroundColor: '#e9d8fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: '20px', fontWeight: 'bold', color: '#805ad5'}}>{userData.semaine}</span>
          </div>
          <div style={{marginLeft: '16px'}}>
            <p style={{fontSize: '14px', color: '#666'}}>Il vous reste environ {40 - userData.semaine} semaines avant l'arrivée de bébé!</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Résumé de votre suivi</h3>
        <div className="stats-grid">
          <div className="stat-box blue">
            <p className="stat-label">Poids actuel</p>
            <p className="stat-value">{userData.poidsActuel} kg</p>
          </div>
          <div className="stat-box green">
            <p className="stat-label">Prise de poids</p>
            <p className="stat-value">{prisePoidsCourante} kg</p>
          </div>
          <div className="stat-box yellow">
            <p className="stat-label">IMC pré-grossesse</p>
            <p className="stat-value">{imc}</p>
          </div>
          <div className="stat-box purple">
            <p className="stat-label">Prochain RDV</p>
            <p className="stat-value">{userData.rdvMedicaux[0].date}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Conseils de la semaine</h3>
        <div style={{display: 'flex', marginBottom: '16px'}}>
          <div style={{width: '40px', height: '40px', backgroundColor: '#e6f7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <span>💧</span>
          </div>
          <div style={{marginLeft: '16px'}}>
            <p style={{fontWeight: '500'}}>Hydratation</p>
            <p style={{fontSize: '14px', color: '#666'}}>Pensez à boire au moins 1,5L d'eau par jour pour éviter les désagréments du 3ème trimestre.</p>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{width: '40px', height: '40px', backgroundColor: '#e6ffe6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
            <span>🥗</span>
          </div>
          <div style={{marginLeft: '16px'}}>
            <p style={{fontWeight: '500'}}>Alimentation</p>
            <p style={{fontSize: '14px', color: '#666'}}>Privilégiez les aliments riches en fer (lentilles, épinards) pour prévenir l'anémie.</p>
          </div>
        </div>
      </div>

      <div style={{marginTop: '16px', padding: '12px', backgroundColor: '#f5f3ff', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <h3 style={{fontSize: '16px', fontWeight: 'bold', color: '#805ad5'}}>Calendrier de grossesse</h3>
          <p style={{fontSize: '14px'}}>Suivez les étapes importantes et préparez-vous pour chaque phase</p>
        </div>
        <Link to="/calendrier" style={{
          padding: '8px 16px',
          backgroundColor: '#805ad5',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '14px'
        }}>
          Voir
        </Link>
      </div>
    </div>
  );
}

export default Home;