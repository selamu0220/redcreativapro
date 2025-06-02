import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from '@/layouts/AppLayout';
import { AuthProvider } from '@/contexts/AuthContext';
import { AuthPage } from '@/pages/AuthPage';
import { ResourcesView } from '@/components/resources/ResourcesView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { ScriptLibrary } from '@/components/scripts/ScriptLibrary';
import { MiniBlog } from '@/components/blog/MiniBlog';
import { BlogView } from '@/components/blog/BlogView';
import { PromptLibrary } from '@/components/prompts/PromptLibrary';
import { ThumbnailCreator } from '@/components/thumbnails/ThumbnailCreator';
import { InfographicCreator } from '@/components/thumbnails/InfographicCreator';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { PricingSection } from '@/components/pricing/PricingSection';
import ProjectsPage from '@/pages/ProjectsPage';
import SvgViewerPage from '@/pages/SvgViewerPage';
import LearningView from '@/components/learning/LearningView';
import LandingPresentation from '@/components/LandingPresentation';



// Wrapper components to use React Router navigation
function AuthPageWrapper() {
  const navigate = useNavigate();
  return <AuthPage onClose={() => navigate(-1)} />;
}

function LandingPresentationWrapper() {
  const navigate = useNavigate();
  return <LandingPresentation onComplete={() => navigate('/blog')} />;
}

function App() {
  console.log('App.tsx: App component is rendering');
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Ruta principal - redirige al blog */}
            <Route path="/" element={<Navigate to="/blog" replace />} />
            
            {/* Rutas principales con layout */}
            <Route element={<AppLayout />}>
              <Route path="/blog" element={<BlogView />} />
              <Route path="/blog/*" element={<BlogView />} />
              <Route path="/recursos" element={<ResourcesView />} />
              <Route path="/calendario" element={<CalendarView />} />
              <Route path="/scripts" element={<ScriptLibrary />} />
              <Route path="/prompts" element={<PromptLibrary />} />
              <Route path="/thumbnails" element={<ThumbnailCreator />} />
              <Route path="/infografias" element={<InfographicCreator />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/aprendizaje" element={<LearningView />} />
              <Route path="/proyectos" element={<ProjectsPage />} />
              <Route path="/svg" element={<SvgViewerPage />} />

              <Route path="/precios" element={<PricingSection />} />
            </Route>
            
            {/* Rutas especiales sin layout */}
            <Route path="/auth" element={<AuthPageWrapper />} />
            <Route path="/presentacion" element={<LandingPresentationWrapper />} />
            
            {/* Ruta 404 - redirige al blog */}
            <Route path="*" element={<Navigate to="/blog" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;