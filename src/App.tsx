import React from 'react';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
// import LandingPresentation from '@/components/LandingPresentation';

function App() {
  console.log('App.tsx: App component is rendering (AuthProvider and main div restored)');
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Página de prueba con AuthProvider</h1>
            <p className="text-lg text-center">Si ves esto, AuthProvider y la estructura principal funcionan.</p>
          </div>
        </div>
        {/* <Toaster /> */}
        {/* <LandingPresentation onComplete={() => console.log('Presentation completed')} /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;