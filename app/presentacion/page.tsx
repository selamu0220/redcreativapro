import LandingPresentation from '../ui/LandingPresentation';

export default function PresentacionPage() {
  const handleComplete = () => {
    // Función para manejar la finalización de la presentación
    console.log('Presentación completada');
  };

  return <LandingPresentation onComplete={handleComplete} />;
}
