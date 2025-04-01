import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, UserContext } from './contexts/UserContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TrialBanner from './components/TrialBanner';
import SubscriptionModal from './components/SubscriptionModal';
import WeekUpdater from './components/WeekUpdater';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import WeightTracker from './pages/WeightTracker';
import MedicalTracker from './pages/MedicalTracker';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';
import ArticleView from './pages/ArticleView';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { requestNotificationPermission, setupNotifications } from './services/notifications';
import './App.css';

// Composant pour les routes protégées qui nécessitent une authentification
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Composant pour les routes publiques (affichage conditionnel selon connexion)
const PublicRoute = ({ children, requiresNoAuth = false }) => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }
  
  // Si la route ne doit être accessible que lorsque déconnecté (login/register)
  if (requiresNoAuth && user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Contenu principal de l'application avec accès au contexte
function AppContent() {
  const { user, loading } = useContext(UserContext);
  const [notificationsInitialized, setNotificationsInitialized] = useState(false);
  
  // Configurer les notifications lors de la connexion
  useEffect(() => {
    if (user && !notificationsInitialized) {
      // Demander les permissions et configurer les notifications
      requestNotificationPermission().then(granted => {
        if (granted) {
          setupNotifications();
        }
      });
      setNotificationsInitialized(true);
    }
  }, [user, notificationsInitialized]);
  
  return (
    <Router>
      <div className="container">
        <Header />
        {/* Afficher la bannière d'essai uniquement si l'utilisateur est connecté */}
        {user && <TrialBanner />}
        {/* Mettre à jour la semaine uniquement si l'utilisateur est connecté */}
        {user && <WeekUpdater />}
        
        <main className="main-content">
          <Routes>
            {/* Routes publiques */}
            <Route path="/login" element={
              <PublicRoute requiresNoAuth={true}>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute requiresNoAuth={true}>
                <Register />
              </PublicRoute>
            } />
            <Route path="/article/:id" element={<ArticleView />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/confidentialite" element={<Privacy />} />
            <Route path="/conditions" element={<Terms />} />
            
            {/* Routes protégées qui nécessitent une connexion */}
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/poids" element={
              <ProtectedRoute>
                <WeightTracker />
              </ProtectedRoute>
            } />
            <Route path="/medical" element={
              <ProtectedRoute>
                <MedicalTracker />
              </ProtectedRoute>
            } />
            <Route path="/ressources" element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            } />
            <Route path="/profil" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/calendrier" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
        
        <Footer />
        {/* Afficher la navigation uniquement si l'utilisateur est connecté */}
        {user && <Navigation />}
        {user && <SubscriptionModal />}
      </div>
    </Router>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;