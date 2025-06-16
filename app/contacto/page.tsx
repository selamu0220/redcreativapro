import AppLayout from '../components/AppLayout';
import { ContactView } from '../ui/contact/ContactView';

export const metadata = {
  title: 'Contacto - Red Creativa Pro | Conecta con Nosotros',
  description: 'Ponte en contacto con Red Creativa Pro. Resolvemos tus dudas sobre marketing digital, herramientas creativas y gestión de proyectos.',
  keywords: 'contacto, soporte, marketing digital, consultoría creativa, ayuda',
};

export default function ContactoPage() {
  return (
    <AppLayout>
      <ContactView />
    </AppLayout>
  );
}