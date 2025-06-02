import React from 'react';
import './App.css';
// import { ThemeProvider } from '@/components/theme-provider';
// import { Toaster } from '@/components/ui/sonner';
// import { AuthProvider, useAuth } from '@/contexts/AuthContext';
// import { AuthPage } from '@/pages/AuthPage';

// function MainContent() {
//   const { isAuthenticated, user, loading } = useAuth();
//   console.log('App.tsx: MainContent rendering. Auth state:', { isAuthenticated, userName: user?.name, loading });

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p>Cargando autenticación...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <AuthPage />;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-4xl font-bold text-center mb-8">¡Bienvenido, {user?.name || 'Usuario'}!</h1>
//         <p className="text-lg text-center">Has iniciado sesión correctamente.</p>
//       </div>
//     </div>
//   );
// }

function App() {
  console.log('App.tsx: Rendering EXTREMELY simplified version.');
  return (
    <div>
      <h1 style={{ color: 'red', fontSize: '32px', textAlign: 'center', marginTop: '20%' }}>
        TEST MINIMO APP.TSX
      </h1>
      <p style={{ textAlign: 'center' }}>Si ves esto, App.tsx se está renderizando.</p>
    </div>
    // <ThemeProvider defaultTheme="light">
    //   <AuthProvider>
    //     <MainContent />
    //     {/* <Toaster /> */}
    //   </AuthProvider>
    // </ThemeProvider>
  );
}

export default App;