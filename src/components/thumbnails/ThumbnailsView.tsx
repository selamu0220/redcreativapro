import React, { useState } from 'react';
import { ThumbnailCreator } from './ThumbnailCreator';
import { InfographicCreator } from './InfographicCreator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useThumbnailsSEO } from '@/hooks/useSEO';
import { Image, BarChart3 } from 'lucide-react';

export function ThumbnailsView() {
  // Aplicar SEO específico para la página de miniaturas
  useThumbnailsSEO();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Thumbnails & Graphics</h1>
        <p className="text-muted-foreground">
          Create stunning thumbnails and infographics for your content.
        </p>
      </div>
      
      <Tabs defaultValue="thumbnails" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="thumbnails" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Thumbnails
          </TabsTrigger>
          <TabsTrigger value="infographics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Infographics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="thumbnails" className="mt-6">
          <ThumbnailCreator />
        </TabsContent>
        
        <TabsContent value="infographics" className="mt-6">
          <InfographicCreator />
        </TabsContent>
      </Tabs>
    </div>
  );
}