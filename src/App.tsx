import React from 'react';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner'; // Restauramos Toaster por si se usa en Auth
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/pages/AuthPage';
// import LandingPresentation from '@/components/LandingPresentation';

function MainContent() {
  const { isAuthenticated, user, loading } = useAuth();
  console.log('App.tsx: MainContent rendering. Auth state:', { isAuthenticated, userName: user?.name, loading });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando autenticación...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
        <p className="text-lg text-center">Has iniciado sesión correctamente.</p>
        {/* Aquí iría el resto de tu aplicación, por ejemplo, AppLayout o rutas principales */}
      </div>
    </div>
  );
}

function App() {
  console.log('App.tsx: App component rendering with providers');
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <MainContent />
        <Toaster />
        {/* <LandingPresentation onComplete={() => console.log('Presentation completed')} /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;