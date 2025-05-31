import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const plans = [
  {
    name: 'Red Creativa (Gratuito)',
    description: 'Perfecto para empezar - Todas las funciones con límites diarios',
    price: '0.00',
    interval: 'siempre',
    features: [
      '10 consultas de IA por día',
      '20 prompts por día',
      '5 scripts generados por día',
      'Acceso a todos los recursos',
      'Plantillas básicas',
      'Calendario completo',
      'Sin tarjeta de crédito',
      'Límites se reinician diariamente',
    ],
    highlight: false,
    isFree: true,
  },
  {
    name: 'Red Creativa Pro (Mensual)',
    description: 'Uso ilimitado + funciones premium para profesionales',
    price: '5.00',
    interval: 'mes',
    features: [
      'Consultas de IA ILIMITADAS',
      'Prompts ILIMITADOS',
      'Scripts ILIMITADOS',
      'Plantillas premium exclusivas',
      'Herramientas avanzadas de IA',
      'Soporte prioritario',
      'Actualizaciones mensuales',
      'Exportación sin marca de agua',
    ],
    stripeLink: 'https://buy.stripe.com/9B69ASdqb6NLgfgce88og02',
    buttonText: 'Upgrade a Pro',
    highlight: true,
  },
  {
    name: 'Red Creativa Pro (Anual)',
    description: 'Uso ilimitado + descuento anual del 50%',
    price: '29.00',
    interval: 'año',
    features: [
      'Todo ILIMITADO como el plan mensual',
      'Ahorra $31 al año (50% descuento)',
      'Soporte prioritario',
      'Acceso anticipado a nuevas funciones',
      'Workshops exclusivos',
      'Descuentos en servicios adicionales',
    ],
    stripeLink: 'https://buy.stripe.com/7sY28q2Lxfkh1kmba48og03',
    buttonText: 'Upgrade Anual',
  },
];

export function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubscribe = (stripeLink: string) => {
    window.location.href = stripeLink;
  };

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Planes y Precios</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Red Creativa es completamente gratuito para usar. Upgrade a Pro para acceder a funciones premium y herramientas avanzadas de IA.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={cn(
              "flex flex-col relative overflow-hidden transition-all duration-200",
              plan.highlight && "border-primary shadow-lg scale-105 md:hover:scale-110"
            )}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl">
                Recomendado
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">€{plan.price}</span>
                <span className="text-muted-foreground ml-2">/{plan.interval}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.isFree ? (
                <Button 
                  className="w-full" 
                  variant="outline"
                  size="lg"
                  disabled
                >
                  Plan Actual
                </Button>
              ) : plan.stripeLink && (
                <Button 
                  className="w-full" 
                  onClick={() => handleSubscribe(plan.stripeLink!)}
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                  disabled={loading === plan.name}
                >
                  {loading === plan.name ? 'Procesando...' : plan.buttonText}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-muted-foreground">
        <p>¿Tienes preguntas? Contáctanos en support@redcreativa.com</p>
      </div>
    </div>
  );
}