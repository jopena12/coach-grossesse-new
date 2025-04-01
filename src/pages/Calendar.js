import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';

function Calendar() {
  const { userData } = useContext(UserContext);
  const [milestones, setMilestones] = useState([]);
  const [upcomingMilestones, setUpcomingMilestones] = useState([]);

  // Générer les jalons (milestones) de la grossesse basés sur la semaine actuelle
  useEffect(() => {
    if (!userData.dateAccouchementPrevue || !userData.semaine) return;

    // Liste des jalons importants de la grossesse
    const allMilestones = [
      { week: 6, title: 'Le cœur du bébé commence à battre', description: 'Entre 6 et 7 semaines, le cœur commence à battre et peut être visible à l\'échographie.', category: 'development' },
      { week: 8, title: 'Premier rendez-vous prénatal', description: 'Il est recommandé de consulter un médecin pour confirmer la grossesse et vérifier votre santé.', category: 'checkup' },
      { week: 12, title: 'Fin du premier trimestre', description: 'Les nausées et la fatigue commencent généralement à diminuer. Le risque de fausse couche diminue significativement.', category: 'trimester' },
      { week: 13, title: 'Échographie du premier trimestre', description: 'Première échographie officielle pour vérifier le développement du bébé et dater la grossesse.', category: 'checkup' },
      { week: 16, title: 'Les mouvements du bébé', description: 'Vous pourriez commencer à sentir les premiers mouvements du bébé (surtout si ce n\'est pas votre première grossesse).', category: 'development' },
      { week: 18, title: 'Échographie morphologique', description: 'Une échographie détaillée pour examiner l\'anatomie du bébé et potentiellement connaître son sexe.', category: 'checkup' },
      { week: 20, title: 'Mi-parcours de la grossesse', description: 'Vous êtes à mi-chemin ! Votre bébé mesure environ 25 cm et pèse environ 300g.', category: 'development' },
      { week: 24, title: 'Test du diabète gestationnel', description: 'Un test important pour vérifier si vous avez développé un diabète pendant la grossesse.', category: 'checkup' },
      { week: 27, title: 'Fin du deuxième trimestre', description: 'Entrée dans le dernier trimestre de la grossesse.', category: 'trimester' },
      { week: 28, title: 'Début du troisième trimestre', description: 'Le bébé peut ouvrir les yeux et réagit à la lumière. Ses chances de survie hors de l\'utérus augmentent considérablement.', category: 'development' },
      { week: 32, title: 'Préparation à l\'accouchement', description: 'C\'est le moment idéal pour commencer les cours de préparation à l\'accouchement.', category: 'preparation' },
      { week: 34, title: 'Consultion du 8ème mois', description: 'Votre médecin vérifiera la position du bébé et discutera du plan d\'accouchement.', category: 'checkup' },
      { week: 36, title: 'Dernière ligne droite', description: 'Le bébé est presque à terme. Préparez votre valise pour la maternité.', category: 'preparation' },
      { week: 37, title: 'Terme précoce', description: 'Votre bébé est considéré comme à terme précoce. Ses poumons sont presque matures.', category: 'development' },
      { week: 38, title: 'Consultation du 9ème mois', description: 'Dernière consultation avant l\'accouchement dans la plupart des cas.', category: 'checkup' },
      { week: 40, title: 'Date d\'accouchement prévue', description: 'C\'est la date estimée pour la naissance de votre bébé, mais seulement 5% des bébés naissent exactement à cette date.', category: 'birth' },
      { week: 41, title: 'Post-terme', description: 'Si vous n\'avez pas encore accouché, votre médecin pourrait envisager un déclenchement.', category: 'checkup' },
      { week: 42, title: 'Limite post-terme', description: 'À ce stade, un déclenchement est généralement recommandé si l\'accouchement n\'a pas eu lieu naturellement.', category: 'checkup' }
    ];

    // Filtrer les jalons passés et à venir
    const pastAndCurrent = allMilestones.filter(m => m.week <= userData.semaine);
    const upcoming = allMilestones.filter(m => m.week > userData.semaine);

    setMilestones(pastAndCurrent);
    setUpcomingMilestones(upcoming.slice(0, 5)); // Afficher les 5 prochains jalons

  }, [userData.dateAccouchementPrevue, userData.semaine]);

  // Fonction pour obtenir la couleur d'arrière-plan selon la catégorie
  const getCategoryColor = (category) => {
    switch (category) {
      case 'development':
        return '#E9D8FD'; // Violet clair
      case 'checkup':
        return '#BEE3F8'; // Bleu clair
      case 'trimester':
        return '#FEFCBF'; // Jaune clair
      case 'preparation':
        return '#C6F6D5'; // Vert clair
      case 'birth':
        return '#FED7D7'; // Rouge clair
      default:
        return '#EDF2F7'; // Gris clair
    }
  };

  // Fonction pour obtenir une icône selon la catégorie
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'development':
        return '👶';
      case 'checkup':
        return '🩺';
      case 'trimester':
        return '📅';
      case 'preparation':
        return '📝';
      case 'birth':
        return '🎊';
      default:
        return '📌';
    }
  };

  return (
    <div>
      <h2 className="card-title">Calendrier de grossesse</h2>
      
      {userData.semaine && (
        <div className="card" style={{marginBottom: '16px'}}>
          <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Votre grossesse</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
            <div>
              <p style={{fontSize: '14px', color: '#4a5568'}}>Semaine actuelle</p>
              <p style={{fontSize: '24px', fontWeight: 'bold'}}>{userData.semaine} SA</p>
            </div>
            <div>
              <p style={{fontSize: '14px', color: '#4a5568'}}>Trimestre</p>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                {userData.semaine <= 14 ? '1er' : userData.semaine <= 27 ? '2ème' : '3ème'} trimestre
              </p>
            </div>
            <div>
              <p style={{fontSize: '14px', color: '#4a5568'}}>Accouchement prévu</p>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>{userData.dateAccouchementPrevue}</p>
            </div>
          </div>
          
          {/* Barre de progression */}
          <div style={{marginBottom: '16px'}}>
            <div style={{width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden'}}>
              <div style={{
                width: `${Math.min(100, (userData.semaine / 42) * 100)}%`,
                height: '100%',
                backgroundColor: '#805AD5',
                borderRadius: '4px'
              }}></div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px'}}>
              <span>0</span>
              <span>14</span>
              <span>27</span>
              <span>40</span>
            </div>
          </div>
          
          {/* Statistiques */}
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
            <div style={{padding: '12px', backgroundColor: '#F7FAFC', borderRadius: '8px'}}>
              <p style={{fontSize: '14px', color: '#4a5568'}}>Semaines écoulées</p>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>{userData.semaine} semaines</p>
            </div>
            <div style={{padding: '12px', backgroundColor: '#F7FAFC', borderRadius: '8px'}}>
              <p style={{fontSize: '14px', color: '#4a5568'}}>Semaines restantes</p>
              <p style={{fontSize: '18px', fontWeight: 'bold'}}>{40 - userData.semaine} semaines</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Prochains jalons */}
      {upcomingMilestones.length > 0 && (
        <div className="card" style={{marginBottom: '16px'}}>
          <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Prochaines étapes</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {upcomingMilestones.map((milestone, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: getCategoryColor(milestone.category),
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  fontSize: '20px'
                }}>
                  {getCategoryIcon(milestone.category)}
                </div>
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                    <h4 style={{fontSize: '16px', fontWeight: '500'}}>{milestone.title}</h4>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      backgroundColor: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px'
                    }}>
                      Semaine {milestone.week}
                    </span>
                  </div>
                  <p style={{fontSize: '14px'}}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Historique des jalons */}
      {milestones.length > 0 && (
        <div className="card">
          <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Étapes franchies</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {[...milestones].reverse().map((milestone, index) => (
              <div key={index} style={{
                padding: '12px',
                backgroundColor: '#F7FAFC',
                borderRadius: '8px',
                borderLeft: `4px solid ${getCategoryColor(milestone.category)}`,
              }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                  <h4 style={{fontSize: '16px', fontWeight: '500'}}>{milestone.title}</h4>
                  <span style={{fontSize: '14px', color: '#718096'}}>
                    Semaine {milestone.week}
                  </span>
                </div>
                <p style={{fontSize: '14px'}}>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;