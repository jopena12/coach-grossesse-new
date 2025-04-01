// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      let errorMessage = "Une erreur s'est produite lors de la connexion";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = "Email ou mot de passe incorrect";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Trop de tentatives échouées, veuillez réessayer plus tard";
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="card-title">Connexion</h2>
      
      <div className="card">
        <form className="login-form" onSubmit={handleLogin}>
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
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '4px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Email
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
              Mot de passe
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
              placeholder="Votre mot de passe"
            />
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
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
        
        <div style={{
          marginTop: '24px',
          textAlign: 'center',
          padding: '16px',
          backgroundColor: '#f7fafc',
          borderRadius: '4px'
        }}>
          <p style={{margin: 0, marginBottom: '8px'}}>Pas encore de compte ?</p>
          <button
            onClick={() => navigate('/register')}
            style={{
              padding: '8px 16px',
              backgroundColor: 'transparent',
              color: '#805ad5',
              border: '1px solid #805ad5',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;