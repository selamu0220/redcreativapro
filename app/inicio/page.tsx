import AppLayout from '../components/AppLayout';
import { HomePage } from '../ui/HomePage';

export const metadata = {
  title: 'Inicio - Red Creativa Pro | Plataforma Integral para Creativos',
  description: 'Plataforma todo-en-uno para creativos y profesionales del marketing digital. Blog, recursos, herramientas de IA, calendario editorial y más.',
  keywords: 'creativos, marketing digital, plataforma creativa, herramientas IA, blog marketing, recursos creativos',
};

export default function InicioPage() {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
}