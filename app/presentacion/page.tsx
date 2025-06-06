'use client';
import { useRouter } from 'next/navigation';
import LandingPresentation from '../ui/LandingPresentation';

export default function PresentacionPage() {
  const router = useRouter();
  
  const handleComplete = () => {
    // Redirigir al dashboard principal
    router.push('/');
  };

  return <LandingPresentation onComplete={handleComplete} />;
}
