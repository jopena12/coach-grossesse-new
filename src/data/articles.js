const articles = [
    {
      id: 'developpement-bebe-premier-trimestre',
      title: 'Le développement de bébé au premier trimestre',
      desc: 'Découvrez les changements fascinants qui se produisent pendant les 12 premières semaines.',
      color: '#f5f3ff',
      textColor: '#805ad5',
      category: 'Développement',
      trimester: 1,
      content: [
        "Le premier trimestre marque le début incroyable du voyage de votre bébé. Ce qui commence comme une seule cellule se transforme rapidement en un petit être humain avec des organes en formation.",
        "Semaines 1-4 : Après la fécondation, le blastocyste s'implante dans la paroi utérine.",
        "Semaines 5-8 : Tous les organes majeurs commencent à se développer.",
        "Semaines 9-12 : Le bébé n'est plus un embryon mais un fœtus. Les organes continuent de se développer."
      ]
    },
    {
      id: 'nausees-matinales',
      title: 'Gérer les nausées matinales',
      desc: 'Des conseils pratiques pour soulager les nausées et les vomissements.',
      color: '#e6f7ff',
      textColor: '#3182ce',
      category: 'Bien-être',
      trimester: 1,
      content: [
        "Les nausées matinales touchent environ 70 à 80% des femmes enceintes au cours du premier trimestre.",
        "Mangez de petits repas fréquents plutôt que trois gros repas.",
        "Privilégiez les aliments fades comme le pain grillé, les crackers, les bananes, le riz.",
        "Évitez les aliments épicés ou très odorantes qui peuvent déclencher les nausées."
      ]
    },
    {
      id: 'alimentation-premier-trimestre',
      title: 'Alimentation durant le premier trimestre',
      desc: 'Les nutriments essentiels et les aliments à privilégier.',
      color: '#ffe6e6',
      textColor: '#e53e3e',
      category: 'Nutrition',
      trimester: 1,
      content: [
        "Une alimentation équilibrée est essentielle pendant le premier trimestre.",
        "L'acide folique est crucial pour prévenir les anomalies du tube neural.",
        "Le fer est nécessaire pour prévenir l'anémie et soutenir l'augmentation du volume sanguin.",
        "Le calcium est important pour le développement osseux."
      ]
    },
    {
      id: 'guide-complet',
      title: 'Guide complet de la grossesse',
      desc: 'Un guide semaine par semaine pour suivre votre grossesse et le développement de votre bébé.',
      color: '#f5f3ff',
      textColor: '#805ad5',
      category: 'Guide',
      trimester: 1, // Visible dans tous les trimestres
      content: [
        "Bienvenue dans notre guide complet de la grossesse, conçu pour vous accompagner semaine après semaine tout au long de cette aventure extraordinaire.",
        "Ce guide vous aidera à comprendre les changements que votre corps et votre bébé traversent chaque semaine. Vous y trouverez des informations détaillées sur le développement de votre bébé, les changements corporels que vous pouvez attendre, et des conseils pratiques pour chaque étape.",
        "Pour naviguer dans le guide, sélectionnez simplement votre semaine de grossesse actuelle dans le menu déroulant ci-dessous. Vous pouvez également parcourir les semaines une par une ou sauter directement au trimestre qui vous intéresse.",
        "N'hésitez pas à revenir consulter ce guide régulièrement, car chaque semaine apporte son lot de nouveautés et de découvertes!"
      ]
    },
    {
      id: 'cours-preparation',
      title: "Cours de préparation à l'accouchement en ligne",
      desc: "Des cours vidéo pour vous préparer à l'accouchement dans le confort de votre domicile.",
      color: '#e6f7ff',
      textColor: '#3182ce',
      category: 'Préparation',
      trimester: 3, // Plus pertinent au 3ème trimestre
      content: [
        "Nos cours de préparation à l'accouchement en ligne vous permettent de vous préparer au grand jour dans le confort de votre foyer, à votre propre rythme.",
        "Programme des cours:",
        "• Module 1: Comprendre le travail et l'accouchement - Les différentes phases, quand se rendre à la maternité, etc.",
        "• Module 2: Techniques de respiration et de relaxation - Exercices pratiques et démonstrations.",
        "• Module 3: Les positions d'accouchement - Quelles positions adopter pendant le travail et l'accouchement.",
        "• Module 4: La gestion de la douleur - Méthodes naturelles et médicales.",
        "• Module 5: Les interventions médicales possibles - Comprendre les différentes procédures.",
        "• Module 6: Les premiers moments avec bébé - Contact peau à peau, premier allaitement, etc.",
        "Chaque module comprend des vidéos explicatives, des démonstrations pratiques, et des témoignages de parents. Vous pouvez les visionner autant de fois que nécessaire et partager cette expérience avec votre partenaire."
      ]
    },
    {
      id: 'liste-verification',
      title: "Liste de vérification avant l'arrivée de bébé",
      desc: "Tout ce que vous devez préparer avant la naissance.",
      color: '#ffe6e6',
      textColor: '#e53e3e',
      category: 'Préparation',
      trimester: 3, // Plus pertinent au 3ème trimestre
      content: [
        "Voici une liste complète pour vous aider à vous préparer à l'arrivée de votre bébé.",
        "Pour bébé:",
        "• Vêtements: 6-8 bodys, 6-8 pyjamas, chaussettes, bonnets, brassières, etc.",
        "• Couchage: Lit ou berceau, matelas, alèse, 2-3 draps-housses, couvertures ou gigoteuses.",
        "• Toilette: Baignoire, produits de toilette pour bébé, serviettes, thermomètre de bain, etc.",
        "• Repas: Biberons (si besoin), coussin d'allaitement, etc.",
        "• Déplacement: Siège auto, poussette, porte-bébé, etc.",
        "• Divers: Couches, lingettes, crème pour le change, mouche-bébé, etc.",
        "",
        "Valise pour la maternité:",
        "• Pour vous: Chemises de nuit, pyjamas, sous-vêtements confortables, chaussons, trousse de toilette, serviettes hygiéniques spéciales post-partum, etc.",
        "• Pour bébé: 2-3 pyjamas, bodies, bonnets, chaussettes, couvertures, etc.",
        "• Administratif: Carte d'identité, carte vitale, papiers de la maternité, etc.",
        "",
        "Démarches administratives:",
        "• Déclarer la naissance (dans les 5 jours suivant l'accouchement)",
        "• Demander l'ajout de bébé sur la carte vitale",
        "• Informer la CAF pour les prestations familiales",
        "• Informer la mutuelle pour ajouter le bébé",
        "",
        "Préparation du domicile:",
        "• Nettoyer et préparer l'espace de bébé",
        "• Installer le matériel (lit, table à langer, etc.)",
        "• Organiser la cuisine (si préparation de repas à l'avance)",
        "• Prévoir de l'aide après le retour à la maison si possible"
      ]
    }
  ];
  
  export default articles;