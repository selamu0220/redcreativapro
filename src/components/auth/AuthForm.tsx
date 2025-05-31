import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Intentar iniciar sesión primero
      try {
        await login(values.email, values.password);
        toast({
          title: '¡Bienvenido!',
          description: 'Has iniciado sesión correctamente.',
        });
        return;
      } catch (loginError) {
        // Si el login falla, intentamos registrar
        await signup(values.email.split('@')[0], values.email, values.password);
        toast({
          title: '¡Cuenta creada!',
          description: '¡Bienvenido a Red Creativa!',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">
          Accede a Red Creativa
        </h2>
        <p className="text-muted-foreground">
          Inicia sesión o crea una cuenta nueva automáticamente
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continuar
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        <p>Si no tienes una cuenta, se creará automáticamente con tu email.</p>
      </div>
    </div>
  );
}