import React from 'react';
import { Link } from 'react-router-dom';

function Terms() {
  return (
    <div>
      <h2 className="card-title">Conditions d'Utilisation</h2>
      
      <div className="card">
        <p style={{marginBottom: '16px'}}>
          Dernière mise à jour : 31 mars 2025
        </p>
        
        <p style={{marginBottom: '16px', lineHeight: '1.6'}}>
          Bienvenue sur Coach Virtuel de Grossesse. Veuillez lire attentivement ces conditions d'utilisation avant d'utiliser notre application et notre site web.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          1. Acceptation des conditions
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          En accédant ou en utilisant notre Service, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas toutes les conditions de cet accord, vous ne pouvez pas accéder au Service.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          2. Admissibilité
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Vous devez être âgé d'au moins 18 ans pour utiliser notre Service. En utilisant le Service, vous déclarez et garantissez que vous avez 18 ans ou plus.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          3. Votre compte
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Pour utiliser certaines fonctionnalités du Service, vous devrez peut-être créer un compte. Vous êtes responsable du maintien de la confidentialité de votre compte et de votre mot de passe. Vous acceptez d'être responsable de toutes les activités qui se produisent sous votre compte.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          4. Abonnements et paiements
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Certaines parties de notre Service sont proposées sur la base d'un abonnement payant. Les abonnements sont automatiquement renouvelés jusqu'à ce que vous les annuliez.
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous proposons les options d'abonnement suivantes :
        </p>
        <ul style={{marginLeft: '20px', marginBottom: '12px', lineHeight: '1.6'}}>
          <li><strong>Essai gratuit</strong> : 15 jours d'accès complet sans frais</li>
          <li><strong>Abonnement mensuel</strong> : 8,99€ par mois</li>
          <li><strong>Forfait grossesse</strong> : 49,99€ pour toute la durée de la grossesse</li>
        </ul>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Vous pouvez annuler votre abonnement à tout moment en accédant à vos paramètres de compte. Les remboursements sont accordés conformément à notre politique de remboursement.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          5. Non-responsabilité médicale
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          <strong>Notre Service ne fournit pas de conseils médicaux.</strong> Le contenu fourni par notre Service est uniquement à titre informatif et éducatif et ne doit pas être considéré comme un conseil médical, un diagnostic ou un traitement.
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Consultez toujours des professionnels de la santé qualifiés pour toute question médicale. N'ignorez jamais les conseils médicaux professionnels et ne retardez pas la consultation médicale en raison de quelque chose que vous avez lu sur notre Service.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          6. Propriété intellectuelle
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Notre Service et son contenu original, ses fonctionnalités et ses fonctionnalités sont et resteront la propriété exclusive de Coach Virtuel de Grossesse et de ses concédants de licence. Le Service est protégé par le droit d'auteur, les marques de commerce et d'autres lois.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          7. Contenu utilisateur
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Notre Service vous permet de publier, de lier, de stocker, de partager et de mettre à disposition certaines informations, textes ou autres éléments ("Contenu"). Vous êtes responsable du Contenu que vous publiez sur ou via le Service, y compris sa légalité, sa fiabilité et son caractère approprié.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          8. Limitation de responsabilité
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          En aucun cas, Coach Virtuel de Grossesse, ses administrateurs, employés, partenaires, agents, fournisseurs ou affiliés ne seront responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de profits, de données, d'utilisation, de bonne volonté ou d'autres pertes immatérielles, résultant de votre accès ou de votre utilisation ou de votre incapacité à accéder ou à utiliser le Service.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          9. Modifications des conditions
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d'au moins 30 jours avant que les nouvelles conditions prennent effet.
        </p>

        <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', marginTop: '24px'}}>
          10. Contact
        </h3>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Si vous avez des questions concernant ces Conditions, veuillez nous contacter :
        </p>
        <p style={{marginBottom: '12px', lineHeight: '1.6'}}>
          Par email : support@coachgrossesse.com<br />
          Via notre <Link to="/contact" style={{color: '#805ad5'}}>formulaire de contact</Link>
        </p>
      </div>
    </div>
  );
}

export default Terms;