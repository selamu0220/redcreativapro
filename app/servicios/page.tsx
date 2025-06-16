import AppLayout from '../components/AppLayout';
import { ServicesView } from '../ui/services/ServicesView';

export const metadata = {
  title: 'Servicios - Red Creativa Pro | Herramientas para Creativos y Marketing Digital',
  description: 'Descubre nuestros servicios: blog de marketing digital, recursos creativos, calendario editorial, prompts de IA, diseño de miniaturas y gestión de proyectos.',
  keywords: 'servicios creativos, marketing digital, blog, recursos, calendario editorial, prompts IA, miniaturas, gestión proyectos',
};

export default function ServiciosPage() {
  return (
    <AppLayout>
      <ServicesView />
    </AppLayout>
  );
}