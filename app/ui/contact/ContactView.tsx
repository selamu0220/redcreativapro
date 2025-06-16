'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../card';
import { Button } from '../button';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from 'lucide-react';

export function ContactView() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    console.log('Formulario enviado');
  };

  return (
    <div className="space-y-8">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Contacta con Red Creativa Pro
        </h1>
        <h2 className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes preguntas sobre nuestras herramientas? ¿Necesitas ayuda con tu estrategia de marketing digital? Estamos aquí para ayudarte.
        </h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de Contacto */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Envíanos un Mensaje
              </CardTitle>
              <CardDescription>
                Completa el formulario y te responderemos en menos de 24 horas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                      Nombre *
                    </label>
                    <Input
                      id="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium mb-2">
                    Asunto *
                  </label>
                  <Input
                    id="asunto"
                    type="text"
                    placeholder="¿En qué podemos ayudarte?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="mensaje"
                    placeholder="Cuéntanos más detalles sobre tu consulta..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Información de Contacto */}
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
              <CardDescription>
                Otras formas de ponerte en contacto con nosotros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">contacto@redcreativa.pro</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Chat en Vivo</p>
                  <p className="text-muted-foreground">Disponible en la plataforma</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Horario de Atención</p>
                  <p className="text-muted-foreground">Lunes a Viernes: 9:00 - 18:00 (GMT-5)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">¿Cómo puedo acceder a todas las herramientas?</h3>
                <p className="text-sm text-muted-foreground">
                  Regístrate en la plataforma y tendrás acceso inmediato a todas nuestras herramientas de marketing digital y creatividad.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">¿Ofrecen soporte técnico?</h3>
                <p className="text-sm text-muted-foreground">
                  Sí, ofrecemos soporte técnico completo a través del chat en vivo y email para todos nuestros usuarios.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">¿Puedo solicitar nuevas funcionalidades?</h3>
                <p className="text-sm text-muted-foreground">
                  ¡Por supuesto! Valoramos mucho el feedback de nuestros usuarios. Envíanos tus sugerencias.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}