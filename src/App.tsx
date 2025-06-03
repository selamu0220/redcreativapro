import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/layouts/AppLayout';
import { BlogView } from '@/components/blog/BlogView';
import { CalendarView } from '@/components/calendar/CalendarView';
import { ResourcesView } from '@/components/resources/ResourcesView';
import { TasksView } from '@/components/tasks/TasksView';
import LearningView from '@/components/learning/LearningView';
import ProjectsPage from '@/pages/ProjectsPage';
import { AuthPage } from '@/pages/AuthPage';
import SvgViewerPage from '@/pages/SvgViewerPage';
import LandingPresentation from '@/components/LandingPresentation';
import { PromptsView } from '@/components/prompts/PromptsView';
import { ScriptsView } from '@/components/scripts/ScriptsView';
import { ThumbnailsView } from '@/components/thumbnails/ThumbnailsView';
import { ChatInterface } from '@/components/chat/ChatInterface';
import './App.css';

function App() {
  console.log('App.tsx: Rendering complete Red Creativa Pro application');
  
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Ruta de autenticación */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Ruta de presentación */}
            <Route path="/presentacion" element={<LandingPresentation />} />
            
            {/* Ruta del visor SVG */}
            <Route path="/svg-viewer" element={<SvgViewerPage />} />
            
            {/* Layout principal con todas las vistas */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to="/blog" replace />} />
              <Route path="blog" element={<BlogView />} />
              <Route path="blog/:slug" element={<BlogView />} />
              <Route path="calendario" element={<CalendarView />} />
              <Route path="recursos" element={<ResourcesView />} />
              <Route path="tareas" element={<TasksView />} />
              <Route path="aprendizaje" element={<LearningView />} />
              <Route path="proyectos" element={<ProjectsPage />} />
              <Route path="prompts" element={<PromptsView />} />
              <Route path="scripts" element={<ScriptsView />} />
              <Route path="miniaturas" element={<ThumbnailsView />} />
              <Route path="chat" element={<ChatInterface />} />
            </Route>
            
            {/* Ruta por defecto */}
            <Route path="*" element={<Navigate to="/blog" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;