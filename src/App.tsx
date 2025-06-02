import React from 'react';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/sonner'; // Mantener Toaster comentado por ahora
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AuthPage } from '@/pages/AuthPage';

function MainContent() {
  // const { isAuthenticated, user, loading } = useAuth(); // Temporalmente comentado
  console.log('App.tsx: MainContent rendering. SIMPLIFICADO');

  // if (loading) { // Temporalmente comentado
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <p>Cargando autenticación...</p>
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) { // Temporalmente comentado
  //   // Si no está autenticado, y no está cargando, mostrar AuthPage
  //   // Esto asume que AuthPage manejará su propio estado de carga si es necesario para el formulario en sí
  //   return <AuthPage onClose={() => console.log("AuthPage closed after auth")} />;
  // }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">TEST MAINCONTENT SIMPLIFICADO</h1>
        <p className="text-lg text-center">Si ves esto, MainContent (simplificado) dentro de App.tsx se está renderizando.</p>
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