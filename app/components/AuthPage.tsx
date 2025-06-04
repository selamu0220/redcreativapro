'use client';

import React, { useEffect } from 'react';
import { useAuth } from "../contexts\AuthContext";
import { AuthForm } from "../components\auth\AuthForm";
import { EmailVerificationBanner } from "../components\auth\EmailVerificationBanner";

interface AuthPageProps {
  onClose?: () => void;
}

export function AuthPage({ onClose }: AuthPageProps) {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && onClose) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Red Creativa</h1>
          <p className="text-muted-foreground">
            Gestiona tu contenido creativo en un solo lugar
          </p>
        </div>
        <EmailVerificationBanner />
        <AuthForm />
      </div>
    </div>
  );
}
