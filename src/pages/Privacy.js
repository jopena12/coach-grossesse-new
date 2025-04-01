import React from 'react';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <div>
      <h2 className="card-title">Politique de Confidentialité</h2>
      
      <div className="card">
        <p style={{marginBottom: '16px'}}>
          Dernière mise à jour : 31 mars 2025
        </p>
        
        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          1. Introduction
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Coach Virtuel de Grossesse ("nous", "notre", "nos") s'engage à protéger votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre application mobile et notre site web (collectivement, le "Service").
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          En utilisant notre Service, vous consentez à la collecte et à l'utilisation de vos informations conformément à cette politique. Nous vous encourageons à lire attentivement ce document.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          2. Informations que nous collectons
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous collectons les types d'informations suivants :
        </p>
        <ul style={{marginLeft: '20px', marginBottom: '12px', lineHeight: '1.6'}}>
          <li><strong>Informations personnelles</strong> : Nom, prénom, adresse email, numéro de téléphone, date de naissance.</li>
          <li><strong>Informations de grossesse</strong> : Date des dernières règles, date d'accouchement prévue, semaine de grossesse, poids initial et actuel, taille.</li>
          <li><strong>Données de santé</strong> : Rendez-vous médicaux, notes de journal, évolution du poids.</li>
          <li><strong>Informations de paiement</strong> : Si vous souscrivez à un abonnement payant, nous collectons les informations nécessaires au traitement des paiements.</li>
        </ul>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          3. Comment nous utilisons vos informations
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous utilisons vos informations pour :
        </p>
        <ul style={{marginLeft: '20px', marginBottom: '12px', lineHeight: '1.6'}}>
          <li>Fournir, maintenir et améliorer notre Service</li>
          <li>Personnaliser votre expérience et vous offrir des conseils adaptés à votre stade de grossesse</li>
          <li>Traiter vos transactions et gérer votre abonnement</li>
          <li>Vous envoyer des notifications importantes concernant votre grossesse ou votre compte</li>
          <li>Communiquer avec vous concernant nos services, promotions ou mises à jour</li>
          <li>Analyser l'utilisation de notre Service pour l'améliorer</li>
        </ul>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          4. Stockage et sécurité des données
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Actuellement, toutes vos données sont stockées localement sur votre appareil. Dans les futures versions de l'application, nous pourrons proposer une synchronisation cloud, auquel cas vos données seront également stockées de manière sécurisée sur nos serveurs.
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous mettons en œuvre des mesures de sécurité appropriées pour protéger contre l'accès non autorisé, l'altération, la divulgation ou la destruction de vos informations personnelles.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          5. Partage des informations
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les situations suivantes :
        </p>
        <ul style={{marginLeft: '20px', marginBottom: '12px', lineHeight: '1.6'}}>
          <li>Avec votre consentement explicite</li>
          <li>Avec nos fournisseurs de services qui nous aident à fournir le Service</li>
          <li>Pour se conformer à la loi ou protéger nos droits</li>
          <li>En cas de fusion, vente ou acquisition d'entreprise</li>
        </ul>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          6. Vos droits
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Vous avez le droit de :
        </p>
        <ul style={{marginLeft: '20px', marginBottom: '12px', lineHeight: '1.6'}}>
          <li>Accéder à vos données personnelles</li>
          <li>Rectifier vos données inexactes</li>
          <li>Supprimer vos données (droit à l'oubli)</li>
          <li>Limiter le traitement de vos données</li>
          <li>Recevoir vos données dans un format structuré (portabilité)</li>
          <li>Vous opposer au traitement de vos données</li>
        </ul>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Pour exercer ces droits, veuillez nous contacter via <Link to="/contact" style={{color: '#805ad5'}}>notre formulaire de contact</Link>.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          7. Modifications de cette politique
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Nous vous informerons de tout changement en publiant la nouvelle politique de confidentialité sur cette page et en vous envoyant une notification.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          8. Contact
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter :
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Par email : support@coachgrossesse.com<br />
          Via notre <Link to="/contact" style={{color: '#805ad5'}}>formulaire de contact</Link>
        </p>
      </div>
    </div>
  );
}

export default Privacy;