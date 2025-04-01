import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'bug', // 'bug' ou 'suggestion'
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Dans une version réelle, vous enverriez ces données à un serveur
    console.log('Formulaire soumis:', formData);
    
    // Simuler un envoi réussi
    setSubmitStatus('success');
    
    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: 'bug',
        message: ''
      });
      setSubmitStatus(null);
    }, 3000);
  };

  return (
    <div>
      <h2 className="card-title">Contactez-nous</h2>
      
      <div className="card">
        <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>
          Signaler un problème ou suggérer une amélioration
        </h3>
        <p style={{marginBottom: '16px', fontSize: '14px', color: '#718096'}}>
          Nous sommes à l'écoute de vos retours pour améliorer l'application Coach Virtuel de Grossesse.
        </p>
        
        {submitStatus === 'success' ? (
          <div style={{
            padding: '16px',
            backgroundColor: '#f0fff4',
            borderRadius: '8px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <p style={{color: '#38a169', fontWeight: '500'}}>
              Votre message a été envoyé avec succès!
            </p>
            <p style={{fontSize: '14px', marginTop: '4px'}}>
              Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            <div>
              <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                Votre nom
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
                Votre email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
                Sujet
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                <option value="bug">Signaler un bug</option>
                <option value="suggestion">Suggérer une amélioration</option>
                <option value="other">Autre question</option>
              </select>
            </div>
            
            <div>
              <label style={{display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '4px'}}>
                Votre message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '4px',
                  minHeight: '120px',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                padding: '10px 16px',
                backgroundColor: '#805ad5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Envoyer
            </button>
          </form>
        )}
      </div>
      
      <div className="card">
        <h3 style={{fontSize: '16px', fontWeight: '500', marginBottom: '12px'}}>
          Informations de contact
        </h3>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span style={{fontSize: '20px'}}>📧</span>
            <p>support@coachgrossesse.com</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Contact;