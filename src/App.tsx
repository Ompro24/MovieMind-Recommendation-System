import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecommendationPage from './pages/RecommendationPage';
import AccountPage from './pages/AccountPage';
import MyListPage from './pages/MyListPage';
import MovieDetails from './components/MovieDetails';
import LoginPage from './pages/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleLogin = (email: string) => {
    setIsAuthenticated(true);
    setUser({ email });
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('login');
  };

  const handleGuestAccess = () => {
    setCurrentPage('home');
  };

  if (currentPage === 'login') {
    return <LoginPage onLogin={handleLogin} onGuestAccess={handleGuestAccess} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onMovieSelect={setSelectedMovieId} />;
      case 'recommendations':
        return <RecommendationPage user={user} />;
      case 'account':
        return <AccountPage onLogout={handleLogout} user={user} />;
      case 'mylist':
        return <MyListPage onMovieSelect={setSelectedMovieId} />;
      default:
        return <HomePage onMovieSelect={setSelectedMovieId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        onNavigate={setCurrentPage} 
        currentPage={currentPage} 
        isAuthenticated={isAuthenticated}
      />
      <main>{renderPage()}</main>
      
      {selectedMovieId && (
        <MovieDetails 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}

export default App;