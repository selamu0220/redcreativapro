import { VideoEditor } from '../ui/video/VideoEditor';
import { generateMetaTags } from '../config/seo';

export const metadata = generateMetaTags('videoEditor', {
  title: 'Editor de Video - Red Creativa Pro | Edición Profesional',
  description: 'Editor de video profesional con herramientas avanzadas de edición, efectos, transiciones y exportación. Crea contenido de alta calidad para redes sociales y más.'
});

export default function VideoEditorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <VideoEditor />
    </div>
  );
}