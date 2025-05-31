import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, X, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function EmailVerificationBanner() {
  const { needsEmailVerification, pendingVerificationEmail, clearEmailVerification } = useAuth();
  const { toast } = useToast();
  const [isResending, setIsResending] = React.useState(false);

  if (!needsEmailVerification || !pendingVerificationEmail) {
    return null;
  }

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: pendingVerificationEmail,
      });

      if (error) throw error;

      toast({
        title: '📧 Email reenviado',
        description: 'Hemos enviado un nuevo enlace de verificación a tu correo.',
        duration: 5000,
      });
    } catch (error: any) {
      console.error('Error resending email:', error);
      toast({
        variant: 'destructive',
        title: 'Error al reenviar',
        description: 'No pudimos reenviar el email. Inténtalo de nuevo más tarde.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Mail className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            📧 Verifica tu dirección de email
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            Hemos enviado un enlace de verificación a{' '}
            <span className="font-medium">{pendingVerificationEmail}</span>.
            Haz clic en el enlace para activar tu cuenta.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendEmail}
              disabled={isResending}
              className="text-blue-700 border-blue-300 hover:bg-blue-100"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Reenviando...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reenviar email
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearEmailVerification}
              className="text-blue-700 hover:bg-blue-100"
            >
              <X className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
          </div>
          <p className="text-xs text-blue-600 mt-2">
            💡 <strong>Tip:</strong> Si no ves el email, revisa tu carpeta de spam o correo no deseado
          </p>
        </div>
      </div>
    </div>
  );
}