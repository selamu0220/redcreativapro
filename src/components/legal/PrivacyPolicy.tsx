import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { usePrivacySEO } from '../../hooks/useSEO';

const PrivacyPolicy: React.FC = () => {
  usePrivacySEO();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Política de Privacidad
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString('es-ES')}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Información que Recopilamos</h2>
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Información Personal</h3>
              <p className="text-muted-foreground">
                Recopilamos información que nos proporcionas directamente, como:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Nombre y dirección de correo electrónico al registrarte</li>
                <li>Contenido que creas y compartes en nuestra plataforma</li>
                <li>Información de comunicación cuando nos contactas</li>
              </ul>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Información Técnica</h3>
              <p className="text-muted-foreground">
                Automáticamente recopilamos cierta información técnica:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Dirección IP y ubicación geográfica aproximada</li>
                <li>Tipo de navegador y sistema operativo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Cookies y tecnologías similares</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Cómo Utilizamos tu Información</h2>
            <p className="text-muted-foreground mb-3">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Personalizar tu experiencia en la plataforma</li>
              <li>Comunicarnos contigo sobre actualizaciones y novedades</li>
              <li>Garantizar la seguridad y prevenir fraudes</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Compartir Información</h2>
            <p className="text-muted-foreground mb-3">
              No vendemos ni alquilamos tu información personal. Podemos compartir información en las siguientes circunstancias:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li>Con tu consentimiento explícito</li>
              <li>Con proveedores de servicios que nos ayudan a operar la plataforma</li>
              <li>Para cumplir con requisitos legales o proteger nuestros derechos</li>
              <li>En caso de fusión, adquisición o venta de activos</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Seguridad de Datos</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger 
              tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. 
              Esto incluye encriptación de datos, acceso restringido y monitoreo regular de nuestros sistemas.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Tus Derechos</h2>
            <p className="text-muted-foreground mb-3">
              Tienes los siguientes derechos respecto a tu información personal:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
              <li><strong>Acceso:</strong> Solicitar una copia de la información que tenemos sobre ti</li>
              <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
              <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información personal</li>
              <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
              <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el uso 
              de nuestro sitio y personalizar contenido. Puedes controlar las cookies a través de la 
              configuración de tu navegador, aunque esto puede afectar la funcionalidad del sitio.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Retención de Datos</h2>
            <p className="text-muted-foreground">
              Conservamos tu información personal solo durante el tiempo necesario para cumplir con los 
              propósitos descritos en esta política, a menos que la ley requiera o permita un período 
              de retención más largo.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cambios en esta Política</h2>
            <p className="text-muted-foreground">
              Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre 
              cambios significativos publicando la nueva política en nuestro sitio web y, cuando sea 
              apropiado, enviándote una notificación por correo electrónico.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
            <p className="text-muted-foreground">
              Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos, 
              puedes contactarnos en:
            </p>
            <div className="mt-3 p-4 bg-muted rounded-lg">
              <p className="font-medium">Red Creativa Pro</p>
              <p className="text-muted-foreground">Email: privacy@redcreativapro.com</p>
              <p className="text-muted-foreground">Sitio web: https://redcreativapro.com</p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;