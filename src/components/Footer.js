import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer style={{
      padding: '16px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#718096',
      borderTop: '1px solid #e2e8f0',
      marginTop: '32px'
    }}>
      <p style={{marginBottom: '8px'}}>
        © 2025 Coach Virtuel de Grossesse
      </p>
      <div style={{display: 'flex', justifyContent: 'center', gap: '16px'}}>
        <Link to="/contact" style={{color: '#805ad5', textDecoration: 'none'}}>
          Contact
        </Link>
        <Link to="/confidentialite" style={{color: '#805ad5', textDecoration: 'none'}}>
          Confidentialité
        </Link>
        <Link to="/conditions" style={{color: '#805ad5', textDecoration: 'none'}}>
          Conditions d'utilisation
        </Link>
      </div>
    </footer>
  );
}

export default Footer;