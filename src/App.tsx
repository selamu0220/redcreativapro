import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from '@/layouts/AppLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthPage } from '@/pages/AuthPage';
import { useAuth } from '@/contexts/AuthContext';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <AppLayout />
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;