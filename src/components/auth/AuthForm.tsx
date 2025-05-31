import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email('Dirección de email inválida'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form submitted with values:', values);
    setIsLoading(true);
    
    // Verificar que las funciones de auth estén disponibles
    if (!login || !signup) {
      console.error('Auth functions not available');
      toast({
        variant: 'destructive',
        title: 'Error del sistema',
        description: 'Las funciones de autenticación no están disponibles. Recarga la página.',
      });
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('Attempting login...');
      
      // Verificar si las claves de Supabase están configuradas correctamente
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseKey || supabaseKey.includes('example')) {
        console.log('Supabase not configured, using demo mode');
        // Modo demo - simular autenticación exitosa
        toast({
          title: '🎭 Modo Demo Activado',
          description: 'Accediendo en modo demostración. Configura Supabase para autenticación real.',
        });
        
        // Simular delay de autenticación
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Crear usuario demo en localStorage
        const demoUser = {
          id: 'demo-user',
          email: values.email,
          name: values.email.split('@')[0],
          subscriptionType: 'free',
          subscriptionEndDate: null,
          dailyUsage: {
            date: new Date().toISOString().split('T')[0],
            aiRequests: 0,
            promptsUsed: 0,
            scriptsGenerated: 0
          },
          dailyLimits: {
            aiRequests: 100,
            promptsUsed: 20,
            scriptsGenerated: 5
          }
        };
        
        localStorage.setItem('demo_user', JSON.stringify(demoUser));
        localStorage.setItem('demo_auth', 'true');
        
        setTimeout(() => {
          navigate('/blog');
        }, 1000);
        return;
      }
      
      // Intentar iniciar sesión primero
      try {
        await login(values.email, values.password);
        console.log('Login successful');
        toast({
          title: '¡Bienvenido de vuelta!',
          description: 'Has iniciado sesión correctamente.',
        });
        setTimeout(() => {
          navigate('/blog');
        }, 1000);
        return;
      } catch (loginError: any) {
        console.log('Login failed, attempting signup:', loginError.message);
        // Si el login falla por credenciales incorrectas, intentamos registrar
        if (loginError.message?.includes('Invalid login credentials') || 
            loginError.message?.includes('Email not confirmed') ||
            loginError.message?.includes('Invalid') ||
            loginError.message?.includes('not found')) {
          try {
            console.log('Attempting signup...');
            await signup(values.email, values.password, values.email.split('@')[0]);
            console.log('Signup successful');
            toast({
              title: '📧 ¡Cuenta creada! Verifica tu email',
              description: 'Hemos enviado un enlace de verificación a tu correo. Revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.',
              duration: 8000,
            });
            
            // Mostrar mensaje adicional después de 3 segundos
            setTimeout(() => {
              toast({
                title: '📬 ¿No ves el email?',
                description: 'Revisa tu carpeta de spam o correo no deseado. El email puede tardar unos minutos en llegar.',
                duration: 6000,
              });
            }, 3000);
            
            return;
          } catch (signupError: any) {
            console.error('Signup failed:', signupError);
            throw signupError;
          }
        } else {
          throw loginError;
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      let errorMessage = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.';
      
      // Verificar si es un error de conexión
      if (!navigator.onLine) {
        errorMessage = 'No hay conexión a internet. Verifica tu conexión.';
      } else if (error.message?.includes('User already registered')) {
        errorMessage = 'Este email ya está registrado. Verifica tu contraseña.';
      } else if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email o contraseña incorrectos.';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = '📧 Debes verificar tu email antes de iniciar sesión. Revisa tu bandeja de entrada y haz clic en el enlace de verificación.';
        
        // Mostrar toast adicional con más información
        setTimeout(() => {
          toast({
            title: '💡 ¿Necesitas ayuda con la verificación?',
            description: 'Si no encuentras el email, revisa spam o solicita un nuevo enlace desde tu cuenta.',
            duration: 6000,
          });
        }, 2000);
      } else if (error.message?.includes('Missing Supabase environment variables')) {
        errorMessage = 'Error de configuración del servidor. Contacta al administrador.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: 'destructive',
        title: 'Error de autenticación',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-bold text-primary">
          Accede a Red Creativa Pro
        </h2>
        <p className="text-muted-foreground text-lg">
          Inicia sesión con tu email y contraseña
        </p>
        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          💡 <strong>Tip:</strong> Si no tienes cuenta, se creará automáticamente al usar un email nuevo
        </p>
        <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
          📧 <strong>Importante:</strong> Después de registrarte, deberás verificar tu email antes de poder acceder
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Procesando...
              </>
            ) : (
              'Acceder a Red Creativa Pro'
            )}
          </Button>
          
          {/* Botón de prueba temporal */}
          <Button 
            type="button" 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              console.log('Test button clicked');
              toast({
                title: 'Botón funcionando',
                description: 'El botón responde correctamente.',
              });
            }}
          >
            🧪 Probar Botón (Temporal)
          </Button>
        </form>
      </Form>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          🔒 Tus datos están seguros y protegidos
        </p>
        <p className="text-xs text-muted-foreground">
          Al continuar, aceptas nuestros términos de servicio
        </p>
      </div>
    </div>
  );
}