import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import articles from '../data/articles';

function Resources() {
  const { userData, updateUserInfo } = useContext(UserContext);

  // Initialiser l'état des numéros d'urgence
  const [emergencyContacts, setEmergencyContacts] = useState({
    maternite: userData.emergencyContacts?.maternite || '01 23 45 67 89',
    sageFemme: userData.emergencyContacts?.sageFemme || '01 23 45 67 90',
    medecinTraitant: userData.emergencyContacts?.medecinTraitant || '01 23 45 67 91',
    samu: userData.emergencyContacts?.samu || '15'
  });
  
  // État pour savoir si on est en mode édition
  const [editMode, setEditMode] = useState(false);

  // Gérer les changements dans les champs de numéros
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setEmergencyContacts(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Sauvegarder les modifications
  const saveContacts = () => {
    updateUserInfo({ emergencyContacts });
    setEditMode(false);
  };

  // Filtrer les articles en fonction du trimestre
  const getArticlesForTrimester = () => {
    const week = userData.semaine || 0;
    let trimester;
    
    if (week <= 13) trimester = 1;
    else if (week <= 27) trimester = 2;
    else trimester = 3;
    
    return articles.filter(article => article.trimester === trimester);
  };

  const filteredArticles = getArticlesForTrimester();

  return (
    <div>
      <h2 className="card-title">Ressources et informations</h2>
      
      {/* Articles adaptés à la semaine de grossesse */}
      <div className="card">
        <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>
          Articles pour semaine {userData.semaine || "de grossesse"}
        </h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {filteredArticles.map((article, index) => (
            <div key={index} style={{padding: '16px', backgroundColor: article.color, borderRadius: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                <h4 style={{fontWeight: '500'}}>{article.title}</h4>
                <span style={{
                  fontSize: '12px',
                  padding: '2px 8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                  color: article.textColor,
                  fontWeight: '500'
                }}>
                  {article.category}
                </span>
              </div>
              <p style={{fontSize: '14px', marginTop: '4px'}}>
                {article.desc}
              </p>
              <Link 
                to={`/article/${article.id}`}
                style={{
                  marginTop: '8px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: article.textColor,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'inline-block',
                  textDecoration: 'none'
                }}
              >
                Lire l'article →
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Numéros d'urgence */}
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
          <h3 style={{fontSize: '16px', fontWeight: '500', margin: 0}}>Numéros utiles</h3>
          <button 
            onClick={() => editMode ? saveContacts() : setEditMode(true)}
            style={{
              padding: '6px 12px',
              backgroundColor: editMode ? '#38a169' : '#805ad5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {editMode ? 'Enregistrer' : 'Modifier'}
          </button>
        </div>
        
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px', 
            backgroundColor: '#ffe6e6', 
            borderRadius: '8px',
            alignItems: 'center'
          }}>
            <div>
              <p style={{fontWeight: '500'}}>Maternité</p>
              <p style={{fontSize: '14px', color: '#718096'}}>Urgences 24h/24</p>
            </div>
            {editMode ? (
              <input 
                type="text" 
                name="maternite"
                value={emergencyContacts.maternite}
                onChange={handleContactChange}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  width: '120px'
                }}
              />
            ) : (
              <div style={{fontWeight: '500'}}>{emergencyContacts.maternite}</div>
            )}
          </div>
          
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px', 
            backgroundColor: '#e6f7ff', 
            borderRadius: '8px',
            alignItems: 'center'
          }}>
            <div>
              <p style={{fontWeight: '500'}}>Sage-femme de garde</p>
              <p style={{fontSize: '14px', color: '#718096'}}>Conseil et orientation</p>
            </div>
            {editMode ? (
              <input 
                type="text" 
                name="sageFemme"
                value={emergencyContacts.sageFemme}
                onChange={handleContactChange}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  width: '120px'
                }}
              />
            ) : (
              <div style={{fontWeight: '500'}}>{emergencyContacts.sageFemme}</div>
            )}
          </div>
          
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px', 
            backgroundColor: '#e6ffe6', 
            borderRadius: '8px',
            alignItems: 'center'
          }}>
            <div>
              <p style={{fontWeight: '500'}}>Médecin traitant</p>
              <p style={{fontSize: '14px', color: '#718096'}}>Dr. Martin</p>
            </div>
            {editMode ? (
              <input 
                type="text" 
                name="medecinTraitant"
                value={emergencyContacts.medecinTraitant}
                onChange={handleContactChange}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  width: '120px'
                }}
              />
            ) : (
              <div style={{fontWeight: '500'}}>{emergencyContacts.medecinTraitant}</div>
            )}
          </div>
          
          <div style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px', 
            backgroundColor: '#fefcbf', 
            borderRadius: '8px',
            alignItems: 'center'
          }}>
            <div>
              <p style={{fontWeight: '500'}}>SAMU</p>
              <p style={{fontSize: '14px', color: '#718096'}}>Urgences vitales</p>
            </div>
            {editMode ? (
              <input 
                type="text" 
                name="samu"
                value={emergencyContacts.samu}
                onChange={handleContactChange}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  width: '120px'
                }}
              />
            ) : (
              <div style={{fontWeight: '500'}}>{emergencyContacts.samu}</div>
            )}
          </div>
        </div>
        
        {editMode && (
          <p style={{fontSize: '13px', fontStyle: 'italic', marginTop: '12px', color: '#718096', textAlign: 'center'}}>
            N'oubliez pas d'enregistrer vos modifications
          </p>
        )}
      </div>

      {/* Ressources supplémentaires */}
          <div style={{padding: '16px', backgroundColor: '#ffe6e6', borderRadius: '8px'}}>
            <h4 style={{fontWeight: '500'}}>Liste de vérification avant l'arrivée de bébé</h4>
            <p style={{fontSize: '14px', marginTop: '4px'}}>
              Tout ce que vous devez préparer avant la naissance : achats essentiels, démarches administratives...
            </p>
            <Link 
              to="/article/liste-verification" 
              style={{
                marginTop: '8px', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#e53e3e', 
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Télécharger →
            </Link>
          </div>
        </div>
      
  );
}

export default Resources;