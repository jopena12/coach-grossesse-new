// src/components/Header.js
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user, userData, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Coach Virtuel de Grossesse</h1>
        
        {user ? (
          <div className="user-menu">
            <span className="username">{userData.nom}</span>
            <button 
              onClick={handleLogout}
              className="logout-button"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="auth-button login-button"
            >
              Connexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;