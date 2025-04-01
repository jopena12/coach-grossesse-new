import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';

function Profile() {
  const { userData, updateUserInfo } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    nom: userData.nom || '',
    prenom: userData.prenom || '',
    email: userData.email || '',
    telephone: userData.telephone || '',
    dateNaissance: userData.dateNaissance || '',
    dateAccouchementPrevue: userData.dateAccouchementPrevue || '',
    semaine: userData.semaine || '',
    poidsInitial: userData.poidsInitial || '',
    taille: userData.taille || ''
  });
  
  // États pour le calculateur
  const [calculMethod, setCalculMethod] = useState('ddr'); // ddr = date dernières règles, conception = date de conception
  const [ddr, setDdr] = useState('');
  const [dateConception, setDateConception] = useState('');
  const [calculResult, setCalculResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo(profileData);
    alert('Vos informations ont été mises à jour !');
  };

  // Fonction pour calculer la date d'accouchement
  const calculateDueDate = () => {
    let dueDate = null;
    let currentSA = 0;
    const today = new Date();
    
    if (calculMethod === 'ddr' && ddr) {
      // Convertir la date format JJ/MM/AAAA en objet Date
      const [day, month, year] = ddr.split('/').map(num => parseInt(num, 10));
      const ddrDate = new Date(year, month - 1, day); // mois en JS commence à 0
      
      // Ajouter 280 jours (40 semaines) à la date des dernières règles
      dueDate = new Date(ddrDate);
      dueDate.setDate(ddrDate.getDate() + 280);
      
      // Calculer les semaines d'aménorrhée actuelles
      const diffTime = Math.abs(today - ddrDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      currentSA = Math.floor(diffDays / 7);
    } 
    else if (calculMethod === 'conception' && dateConception) {
      // Convertir la date format JJ/MM/AAAA en objet Date
      const [day, month, year] = dateConception.split('/').map(num => parseInt(num, 10));
      const conceptionDate = new Date(year, month - 1, day);
      
      // Ajouter 266 jours (38 semaines) à la date de conception
      dueDate = new Date(conceptionDate);
      dueDate.setDate(conceptionDate.getDate() + 266);
      
      // Calculer les semaines d'aménorrhée (conception = 2 semaines après DDR)
      const ddrEstimated = new Date(conceptionDate);
      ddrEstimated.setDate(conceptionDate.getDate() - 14);
      const diffTime = Math.abs(today - ddrEstimated);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      currentSA = Math.floor(diffDays / 7);
    }
    
    if (dueDate) {
      const formattedDueDate = `${dueDate.getDate().toString().padStart(2, '0')}/${(dueDate.getMonth() + 1).toString().padStart(2, '0')}/${dueDate.getFullYear()}`;
      
      setCalculResult({
        dueDate: formattedDueDate,
        currentSA: currentSA,
        // Trimestre actuel
        trimester: currentSA <= 14 ? 1 : currentSA <= 27 ? 2 : 3,
        // Semaines restantes
        weeksLeft: 40 - currentSA
      });
      
      // Mettre à jour le formulaire avec les résultats du calcul
      setProfileData(prev => ({
        ...prev,
        dateAccouchementPrevue: formattedDueDate,
        semaine: currentSA
      }));
    }
  };

  return (
    <div>
      <h2 className="card-title">Votre profil</h2>
      
      {/* Calculateur de date d'accouchement */}
      <div className="card" style={{marginBottom: '16px'}}>
        <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>
          Calculateur de date d'accouchement et semaines d'aménorrhée (SA)
        </h3>
        
        <div style={{display: 'flex', gap: '12px', marginBottom: '16px'}}>
          <button 
            onClick={() => setCalculMethod('ddr')}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: calculMethod === 'ddr' ? '#805ad5' : '#EDF2F7',
              color: calculMethod === 'ddr' ? 'white' : '#4A5568',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            À partir de la date des dernières règles
          </button>
          
          <button 
            onClick={() => setCalculMethod('conception')}
            style={{
              flex: 1,
              padding: '8px',
              backgroundColor: calculMethod === 'conception' ? '#805ad5' : '#EDF2F7',
              color: calculMethod === 'conception' ? 'white' : '#4A5568',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            À partir de la date de conception
          </button>
        </div>
        
        <div style={{marginBottom: '16px'}}>
          {calculMethod === 'ddr' ? (
            <div>
              <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                Date des dernières règles (JJ/MM/AAAA)
              </label>
              <div style={{display: 'flex', gap: '8px'}}>
                <input 
                  type="text"
                  placeholder="JJ/MM/AAAA"
                  value={ddr}
                  onChange={(e) => setDdr(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
                <button 
                  onClick={calculateDueDate}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#805ad5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Calculer
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                Date de conception estimée (JJ/MM/AAAA)
              </label>
              <div style={{display: 'flex', gap: '8px'}}>
                <input 
                  type="text"
                  placeholder="JJ/MM/AAAA"
                  value={dateConception}
                  onChange={(e) => setDateConception(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
                <button 
                  onClick={calculateDueDate}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#805ad5',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Calculer
                </button>
              </div>
            </div>
          )}
        </div>
        {calculResult && (
          <div style={{
            padding: '16px',
            backgroundColor: '#f5f3ff',
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <h4 style={{fontSize: '15px', fontWeight: '500', marginBottom: '8px'}}>Résultats du calcul</h4>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
              <div style={{padding: '8px', backgroundColor: 'white', borderRadius: '4px'}}>
                <p style={{fontSize: '14px', color: '#4a5568'}}>Date d'accouchement estimée</p>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{calculResult.dueDate}</p>
              </div>
              <div style={{padding: '8px', backgroundColor: 'white', borderRadius: '4px'}}>
                <p style={{fontSize: '14px', color: '#4a5568'}}>Semaines d'aménorrhée (SA)</p>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{calculResult.currentSA} semaines</p>
              </div>
              <div style={{padding: '8px', backgroundColor: 'white', borderRadius: '4px'}}>
                <p style={{fontSize: '14px', color: '#4a5568'}}>Trimestre</p>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{calculResult.trimester}<sup>ème</sup> trimestre</p>
              </div>
              <div style={{padding: '8px', backgroundColor: 'white', borderRadius: '4px'}}>
                <p style={{fontSize: '14px', color: '#4a5568'}}>Semaines restantes</p>
                <p style={{fontSize: '16px', fontWeight: 'bold'}}>{calculResult.weeksLeft} semaines</p>
              </div>
            </div>
            <p style={{fontSize: '13px', fontStyle: 'italic', marginTop: '12px', color: '#718096'}}>
              Note: Ces calculs sont des estimations. Votre médecin pourra vous donner une date plus précise.
            </p>
          </div>
        )}
      </div>
      
      {/* Formulaire de profil */}
      <div className="card">
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Informations personnelles</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div style={{display: 'flex', gap: '12px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                    Prénom
                  </label>
                  <input 
                    type="text"
                    name="prenom"
                    value={profileData.prenom}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                    Nom
                  </label>
                  <input 
                    type="text"
                    name="nom"
                    value={profileData.nom}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
              
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                  Email
                </label>
                <input 
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                  Téléphone
                </label>
                <input 
                  type="tel"
                  name="telephone"
                  value={profileData.telephone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                  Date de naissance
                </label>
                <input 
                  type="text"
                  name="dateNaissance"
                  placeholder="JJ/MM/AAAA"
                  value={profileData.dateNaissance}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Informations de grossesse</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                  Date d'accouchement prévue
                </label>
                <input 
                  type="text"
                  name="dateAccouchementPrevue"
                  placeholder="JJ/MM/AAAA"
                  value={profileData.dateAccouchementPrevue}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div>
                <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                  Semaine d'aménorrhée (SA) actuelle
                </label>
                <input 
                  type="number"
                  name="semaine"
                  value={profileData.semaine}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px'
                  }}
                />
              </div>
              
              <div style={{display: 'flex', gap: '12px'}}>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                    Poids avant grossesse (kg)
                  </label>
                  <input 
                    type="number"
                    name="poidsInitial"
                    value={profileData.poidsInitial}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px'
                    }}
                  />
                </div>
                <div style={{flex: 1}}>
                  <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                    Taille (cm)
                  </label>
                  <input 
                    type="number"
                    name="taille"
                    value={profileData.taille}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <button 
            type="submit"
            style={{
              marginTop: '8px',
              padding: '12px 16px',
              backgroundColor: '#805ad5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;