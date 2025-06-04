import React from 'react';
import { ProjectManager } from "../components\projects\ProjectManager";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            GestiÃ³n de Proyectos de Video
          </h1>
          <p className="text-gray-600">
            Organiza, planifica y gestiona todos tus proyectos de video con integraciÃ³n de Google Drive
          </p>
        </div>
        
        <ProjectManager />
      </div>
    </div>
  );
}
