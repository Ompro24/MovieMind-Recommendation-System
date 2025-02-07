import React, { useState, useEffect } from 'react';
import { Clapperboard, Home, Sparkles, User, BookMarked, LogIn } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated: boolean;
}

export default function Navbar({ onNavigate, currentPage, isAuthenticated }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 text-red-600 cursor-pointer" onClick={() => onNavigate('home')}>
                <Clapperboard className="h-8 w-8" />
                <span className="text-xl font-bold">MovieMind</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem 
                  icon={<Home className="h-5 w-5" />} 
                  text="Home" 
                  active={currentPage === 'home'}
                  onClick={() => onNavigate('home')}
                />
                <NavItem 
                  icon={<Sparkles className="h-5 w-5" />} 
                  text="Recommendations" 
                  active={currentPage === 'recommendations'}
                  onClick={() => onNavigate('recommendations')}
                />
                {isAuthenticated ? (
                  <>
                    <NavItem 
                      icon={<BookMarked className="h-5 w-5" />} 
                      text="My List" 
                      active={currentPage === 'mylist'}
                      onClick={() => onNavigate('mylist')}
                    />
                    <NavItem 
                      icon={<User className="h-5 w-5" />} 
                      text="Account" 
                      active={currentPage === 'account'}
                      onClick={() => onNavigate('account')}
                    />
                  </>
                ) : (
                  <NavItem 
                    icon={<LogIn className="h-5 w-5" />} 
                    text="Sign In" 
                    active={currentPage === 'login'}
                    onClick={() => onNavigate('login')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, text, active = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active 
          ? 'text-white bg-red-600/10 hover:bg-red-600/20' 
          : 'text-gray-300 hover:text-white hover:bg-white/10'
        }`}
    >
      {icon}
      {text}
    </button>
  );
}