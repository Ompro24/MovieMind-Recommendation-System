import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import RecommendationPage from './pages/RecommendationPage';
import AccountPage from './pages/AccountPage';
import MyListPage from './pages/MyListPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'recommendations':
        return <RecommendationPage />;
      case 'account':
        return <AccountPage />;
      case 'mylist':
        return <MyListPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;