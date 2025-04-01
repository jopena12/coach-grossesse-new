// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [weekNumber, setWeekNumber] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validation de base
    if (!email || !password || !confirmPassword || !name) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Créer l'utilisateur dans Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Créer le document utilisateur dans Firestore
      const userData = {
        nom: name,
        email: email,
        semaine: weekNumber ? parseInt(weekNumber) : 0,
        dueDate: dueDate || null,
        poidsInitial: 0,
        taille: 0,
        poidsActuel: 0,
        derniereSaisie: new Date().toLocaleDateString('fr-FR'),
        historiquePoidsDate: [],
        historiquePoids: [],
        rdvMedicaux: [],
        notes: '',
        essaiGratuit: {
          debut: new Date().toISOString(),
          joursRestants: 15
        },
        abonnement: {
          statut: 'essai',
          dateExpiration: null
        },
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, "users", userCredential.user.uid), userData);
      
      // Rediriger vers la page de profil pour compléter les informations
      navigate('/profil');
    } catch (error) {
      let errorMessage = "Une erreur s'est produite lors de l'inscription";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Cette adresse email est déjà utilisée";
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Le mot de passe est trop faible (minimum 6 caractères)";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "L'adresse email n'est pas valide";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="card-title">Créer un compte</h2>
      
      <div className="card">
        <form onSubmit={handleRegister}>
          {error && (
            <div style={{
              backgroundColor: '#fed7d7',
              color: '#c53030',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}
          
          <div style={{marginBottom: '16px'}}>
            <label 
              htmlFor="name"
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Prénom *
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px'
              }}
              placeholder="Votre prénom"
              required
            />
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px'
              }}
              placeholder="Votre adresse email"
              required
            />
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label 
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Mot de passe *
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px'
              }}
              placeholder="Créez un mot de passe"
              required
            />
          </div>
          
          <div style={{marginBottom: '16px'}}>
            <label 
              htmlFor="confirmPassword"
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Confirmer le mot de passe *
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #cbd5e0',
                borderRadius: '4px'
              }}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>
          
          <div style={{
            backgroundColor: '#f0fff4', 
            padding: '16px', 
            borderRadius: '4px',
            marginBottom: '16px'
          }}>
            <h3 style={{fontSize: '16px', fontWeight: '500', marginTop: 0, marginBottom: '12px'}}>
              Information de grossesse (facultatif)
            </h3>
            
            <div style={{marginBottom: '12px'}}>
              <label 
                htmlFor="weekNumber"
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Semaine de grossesse
              </label>
              <input
                id="weekNumber"
                type="number"
                value={weekNumber}
                onChange={(e) => setWeekNumber(e.target.value)}
                min="1"
                max="42"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
                placeholder="Ex: 24"
              />
            </div>
            
            <div>
              <label 
                htmlFor="dueDate"
                style={{
                  display: 'block',
                  marginBottom: '4px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Date prévue d'accouchement
              </label>
              <input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#805ad5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Création en cours...' : 'Créer mon compte'}
          </button>
        </form>
        
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          backgroundColor: '#f7fafc',
          borderRadius: '4px'
        }}>
          <p style={{margin: 0, marginBottom: '8px'}}>Déjà un compte ?</p>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#805ad5',
              border: '1px solid #805ad5',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;