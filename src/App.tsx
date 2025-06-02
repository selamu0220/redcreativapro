import React from 'react';
import './App.css';
import React from 'react';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/sonner'; // Mantener Toaster comentado por ahora
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/pages/AuthPage';

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
    // Si no está autenticado, y no está cargando, mostrar AuthPage
    // Esto asume que AuthPage manejará su propio estado de carga si es necesario para el formulario en sí
    return <AuthPage onClose={() => console.log("AuthPage closed after auth")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
        <p className="text-lg text-center">Has iniciado sesión correctamente.</p>
        {/* Aquí podrías añadir más contenido de tu aplicación principal */}
      </div>
    </div>
  );
}

function App() {
  console.log('App.tsx: Rendering with ThemeProvider and AuthProvider.');
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <MainContent />
        {/* <Toaster /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;