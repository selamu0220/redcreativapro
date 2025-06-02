console.log('main.tsx: Script execution started - v2');
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/common/ErrorBoundary.tsx'; // Importar ErrorBoundary

console.log('main.tsx: Imports completed.');

const rootElement = document.getElementById('root');
console.log('main.tsx: rootElement obtained:', rootElement);

if (rootElement) {
  console.log('main.tsx: rootElement found. Creating root...');
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('main.tsx: App rendered within ErrorBoundary and StrictMode.');
} else {
  console.error('Root element not found! La aplicación no puede iniciar.');
  // Intentar añadir un mensaje al body si #root no existe
  const body = document.body;
  if (body) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'ERROR CRÍTICO: El elemento con ID \'root\' no se encontró en el HTML. La aplicación React no puede iniciarse.';
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '20px';
    errorDiv.style.fontSize = '24px';
    errorDiv.style.border = '2px solid red';
    body.prepend(errorDiv);
  }
}
console.log('main.tsx: Script execution finished.');
