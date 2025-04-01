import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { scheduleAppointmentReminder } from '../services/notifications';

function MedicalTracker() {
  const { userData, addAppointment, updateNotes, user } = useContext(UserContext);
  const [newAppointment, setNewAppointment] = useState({
    titre: '',
    date: '',
    medecin: '',
    notes: ''
  });
  const [newNote, setNewNote] = useState('');
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showUpcomingAppointments, setShowUpcomingAppointments] = useState(true);
  const [showPastAppointments, setShowPastAppointments] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulons un historique de notes pour la démonstration
  // Dans une vraie application, cela serait stocké dans le contexte
  const notesHistory = [
    { date: '28/03/2025', contenu: userData.notes },
    { date: '21/03/2025', contenu: "Légères douleurs lombaires aujourd'hui, mais sinon tout va bien. Bébé bouge beaucoup!" },
    { date: '14/03/2025', contenu: "Rendez-vous avec la sage-femme aujourd'hui. Tout se passe normalement. Prise de sang prévue la semaine prochaine." },
    { date: '07/03/2025', contenu: "Je me sens plus énergique cette semaine. Les nausées ont complètement disparu." }
  ];

  // Effet pour programmer les notifications pour les rendez-vous à venir
  useEffect(() => {
    if (user) {
      // Programmer des notifications pour les rendez-vous à venir
      userData.rdvMedicaux.forEach(rdv => {
        const dateParts = rdv.date.split('/');
        if (dateParts.length === 3) {
          const appointmentDate = new Date(
            parseInt(dateParts[2]), // année
            parseInt(dateParts[1]) - 1, // mois (0-11)
            parseInt(dateParts[0]) // jour
          );
          
          // Ne programmer que pour les dates futures
          if (appointmentDate > new Date()) {
            scheduleAppointmentReminder({
              id: rdv.id,
              title: rdv.titre,
              date: appointmentDate
            });
          }
        }
      });
    }
  }, [userData.rdvMedicaux, user]);

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAppointment = async () => {
    if (newAppointment.titre && newAppointment.date) {
      setLoading(true);
      
      try {
        await addAppointment(newAppointment);
        
        // Programmer un rappel pour ce nouveau rendez-vous
        if (user) {
          const dateParts = newAppointment.date.split('/');
          if (dateParts.length === 3) {
            const appointmentDate = new Date(
              parseInt(dateParts[2]), // année
              parseInt(dateParts[1]) - 1, // mois (0-11)
              parseInt(dateParts[0]) // jour
            );
            
            if (appointmentDate > new Date()) {
              scheduleAppointmentReminder({
                title: newAppointment.titre,
                date: appointmentDate
              });
            }
          }
        }
        
        setNewAppointment({ titre: '', date: '', medecin: '', notes: '' });
      } catch (error) {
        console.error("Erreur lors de l'ajout du rendez-vous:", error);
        alert("Une erreur est survenue lors de l'enregistrement du rendez-vous.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Veuillez au moins remplir le titre et la date du rendez-vous");
    }
  };

  const handleAddNote = async () => {
    if (newNote.trim()) {
      setLoading(true);
      
      try {
        await updateNotes(newNote);
        setNewNote('');
      } catch (error) {
        console.error("Erreur lors de l'ajout de la note:", error);
        alert("Une erreur est survenue lors de l'enregistrement de la note.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Trier les rendez-vous par date
  const sortedAppointments = [...userData.rdvMedicaux].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateA - dateB;
  });

  // Séparer les rendez-vous à venir et passés
  const today = new Date();
  const upcomingAppointments = sortedAppointments.filter(appt => {
    const apptDate = new Date(appt.date.split('/').reverse().join('-'));
    return apptDate >= today;
  });
  
  const pastAppointments = sortedAppointments.filter(appt => {
    const apptDate = new Date(appt.date.split('/').reverse().join('-'));
    return apptDate < today;
  });

  // Le prochain rendez-vous est le premier de la liste des rendez-vous à venir
  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;
  // Les autres rendez-vous à venir (sans le prochain)
  const otherUpcomingAppointments = upcomingAppointments.slice(1);

  return (
    <div>
      <h2 className="card-title">Vos rendez-vous médicaux</h2>
      
      <div className="card">
        {/* Section prochain rendez-vous - toujours visible */}
        {nextAppointment && (
          <div style={{marginBottom: '24px'}}>
            <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '8px'}}>Prochain rendez-vous</h3>
            <div style={{padding: '16px', backgroundColor: '#f5f3ff', borderRadius: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <p style={{fontWeight: 'bold'}}>{nextAppointment.titre}</p>
                  <p style={{fontSize: '14px', color: '#666'}}>{nextAppointment.date} - {nextAppointment.medecin}</p>
                </div>
                <div style={{
                  backgroundColor: '#e9d8fd', 
                  padding: '4px 12px', 
                  borderRadius: '9999px', 
                  fontSize: '14px', 
                  fontWeight: '500', 
                  color: '#805ad5'
                }}>
                  Prochain
                </div>
              </div>
              {nextAppointment.notes && (
                <p style={{fontSize: '14px', marginTop: '8px'}}>{nextAppointment.notes}</p>
              )}
              {/* Indicateur de rappel si l'utilisateur est connecté */}
              {user && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '12px',
                  padding: '8px',
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#4c51bf',
                    display: 'inline-block',
                    marginRight: '8px'
                  }}></span>
                  Rappel programmé
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section autres rendez-vous à venir */}
        {otherUpcomingAppointments.length > 0 && (
          <div style={{marginBottom: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h3 style={{fontSize: '16px', fontWeight: '500', margin: 0}}>
                Autres rendez-vous à venir ({otherUpcomingAppointments.length})
              </h3>
              <button 
                onClick={() => setShowUpcomingAppointments(!showUpcomingAppointments)}
                style={{
                  padding: '4px 12px',
                  backgroundColor: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {showUpcomingAppointments ? 'Masquer' : 'Voir'}
              </button>
            </div>

            {showUpcomingAppointments && (
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {otherUpcomingAppointments.map((rdv, index) => (
                  <div 
                    key={index} 
                    style={{
                      padding: '16px', 
                      backgroundColor: '#f7fafc', 
                      borderRadius: '8px'
                    }}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <p style={{fontWeight: 'bold'}}>{rdv.titre}</p>
                        <p style={{fontSize: '14px', color: '#666'}}>{rdv.date} - {rdv.medecin}</p>
                      </div>
                      <div style={{
                        backgroundColor: '#edf2f7', 
                        padding: '4px 12px', 
                        borderRadius: '9999px', 
                        fontSize: '14px', 
                        fontWeight: '500', 
                        color: '#4a5568'
                      }}>
                        À venir
                      </div>
                    </div>
                    {rdv.notes && (
                      <p style={{fontSize: '14px', marginTop: '8px'}}>{rdv.notes}</p>
                    )}
                    {/* Indicateur de rappel si l'utilisateur est connecté */}
                    {user && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '12px',
                        fontSize: '13px',
                        color: '#4a5568'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#4c51bf',
                          display: 'inline-block',
                          marginRight: '6px'
                        }}></span>
                        Rappel programmé
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Message quand il n'y a pas de rendez-vous du tout */}
        {upcomingAppointments.length === 0 && (
          <div style={{padding: '16px', backgroundColor: '#f7fafc', borderRadius: '8px', textAlign: 'center', marginBottom: '24px'}}>
            <p style={{color: '#718096'}}>Aucun rendez-vous à venir</p>
            <p style={{fontSize: '14px', color: '#718096'}}>Utilisez le formulaire ci-dessous pour ajouter votre prochain rendez-vous</p>
          </div>
        )}
        
        {/* Section rendez-vous passés */}
        <div style={{marginBottom: '24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
            <h3 style={{fontSize: '16px', fontWeight: '500', margin: 0}}>
              Historique des rendez-vous ({pastAppointments.length})
            </h3>
            <button 
              onClick={() => setShowPastAppointments(!showPastAppointments)}
              style={{
                padding: '4px 12px',
                backgroundColor: '#f7fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              {showPastAppointments ? 'Masquer' : 'Voir'}
            </button>
          </div>

          {showPastAppointments && pastAppointments.length > 0 && (
            <div>
              {pastAppointments.map((rdv, index) => (
                <div key={index} style={{padding: '12px 0', borderBottom: index < pastAppointments.length - 1 ? '1px solid #e2e8f0' : 'none'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <p style={{fontWeight: '500'}}>{rdv.titre}</p>
                      <p style={{fontSize: '14px', color: '#666'}}>{rdv.date} - {rdv.medecin}</p>
                    </div>
                    <div style={{
                      backgroundColor: '#f7fafc', 
                      padding: '4px 12px', 
                      borderRadius: '9999px', 
                      fontSize: '14px', 
                      fontWeight: '500', 
                      color: '#4a5568'
                    }}>
                      Passé
                    </div>
                  </div>
                  {rdv.notes && (
                    <p style={{fontSize: '14px', marginTop: '4px'}}>{rdv.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {showPastAppointments && pastAppointments.length === 0 && (
            <div style={{padding: '16px', backgroundColor: '#f7fafc', borderRadius: '8px', textAlign: 'center'}}>
              <p style={{color: '#718096'}}>Aucun rendez-vous passé</p>
            </div>
          )}
        </div>
        
        {/* Formulaire pour ajouter un nouveau rendez-vous */}
        <div style={{padding: '16px', backgroundColor: '#f7fafc', borderRadius: '8px'}}>
          <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>Ajouter un nouveau rendez-vous</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <input 
              type="text" 
              name="titre"
              placeholder="Titre du rendez-vous" 
              value={newAppointment.titre}
              onChange={handleAppointmentChange}
              disabled={loading}
              style={{padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px'}} 
            />
            <div style={{display: 'flex', gap: '12px'}}>
              <input 
                type="text" 
                name="date"
                placeholder="Date (JJ/MM/AAAA)" 
                value={newAppointment.date}
                onChange={handleAppointmentChange}
                disabled={loading}
                style={{flex: 1, padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px'}} 
              />
              <input 
                type="text" 
                name="medecin"
                placeholder="Médecin" 
                value={newAppointment.medecin}
                onChange={handleAppointmentChange}
                disabled={loading}
                style={{flex: 1, padding: '8px', border: '1px solid #cbd5e0', borderRadius: '4px'}} 
              />
            </div>
            <textarea 
              name="notes"
              placeholder="Notes" 
              value={newAppointment.notes}
              onChange={handleAppointmentChange}
              disabled={loading}
              style={{
                padding: '8px', 
                border: '1px solid #cbd5e0', 
                borderRadius: '4px',
                height: '80px',
                resize: 'none'
              }} 
            />
            <button 
              onClick={handleAddAppointment}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer le rendez-vous'}
            </button>
            
            {/* Notification si l'utilisateur est connecté */}
            {user && (
              <p style={{
                fontSize: '13px',
                color: '#4a5568',
                margin: '4px 0 0 0',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#4c51bf',
                  display: 'inline-block',
                  marginRight: '6px'
                }}></span>
                Les rappels seront automatiquement programmés pour vos rendez-vous
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Section journal de grossesse */}
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
          <h3 className="card-title" style={{margin: 0}}>Journal de grossesse</h3>
          <button 
            onClick={() => setShowAllNotes(!showAllNotes)}
            style={{
              padding: '4px 12px',
              backgroundColor: '#f7fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            {showAllNotes ? 'Masquer l\'historique' : 'Voir l\'historique'}
          </button>
        </div>
        
        {/* Note actuelle */}
        <div style={{marginBottom: '16px'}}>
          <p style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>Dernière note - {userData.derniereSaisie}</p>
          <div style={{padding: '12px', backgroundColor: '#fefcbf', borderRadius: '8px'}}>
            <p>{userData.notes}</p>
          </div>
        </div>
        
        {/* Historique des notes */}
        {showAllNotes && (
          <div style={{marginBottom: '16px'}}>
            <h4 style={{fontSize: '14px', fontWeight: '500', marginBottom: '8px'}}>Historique des notes</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              {notesHistory.slice(1).map((note, index) => (
                <div key={index} style={{padding: '12px', backgroundColor: '#f7fafc', borderRadius: '8px'}}>
                  <p style={{fontSize: '14px', color: '#666', marginBottom: '4px'}}>{note.date}</p>
                  <p>{note.contenu}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Formulaire pour ajouter une nouvelle note */}
        <div>
          <textarea 
            placeholder="Comment vous sentez-vous aujourd'hui? Notez vos symptômes, questions pour votre médecin..." 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            disabled={loading}
            style={{
              padding: '12px', 
              border: '1px solid #cbd5e0', 
              borderRadius: '4px',
              width: '100%',
              height: '96px',
              resize: 'none'
            }}
          />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px'}}>
            <button 
              onClick={handleAddNote}
              disabled={loading}
              style={{
                padding: '8px 16px',
                backgroundColor: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            
            {/* Indicateur de synchronisation */}
            {user && (
              <p style={{
                fontSize: '13px',
                color: '#4a5568',
                margin: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
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
    </div>
  );
}

export default MedicalTracker;