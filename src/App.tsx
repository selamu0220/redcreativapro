import React from 'react';
import React from 'react';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPresentation from '@/components/LandingPresentation';



function App() {
  console.log('App.tsx: App component is rendering');
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Red Creativa Pro</h1>
            <div className="text-center">
              <p className="text-lg mb-4">¡Aplicación funcionando correctamente!</p>
              <p className="text-muted-foreground">Esta es una versión simplificada para verificar el deploy.</p>
            </div>
            <LandingPresentation onComplete={() => console.log('Presentation completed')} />
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;