import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-items">
        <NavLink to="/" className={({isActive}) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Accueil</span>
        </NavLink>
        
        <NavLink to="/poids" className={({isActive}) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <span className="nav-icon">⚖️</span>
          <span className="nav-text">Poids</span>
        </NavLink>
        
        <NavLink to="/medical" className={({isActive}) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <span className="nav-icon">🩺</span>
          <span className="nav-text">Médical</span>
        </NavLink>
        
        <NavLink to="/ressources" className={({isActive}) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <span className="nav-icon">📚</span>
          <span className="nav-text">Ressources</span>
        </NavLink>
        
        <NavLink to="/profil" className={({isActive}) => 
          `nav-link ${isActive ? 'active' : ''}`
        }>
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;