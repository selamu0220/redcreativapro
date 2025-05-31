import { useState } from 'react';
import { ResourceHeader } from './ResourceHeader';
import { ResourceGrid } from './ResourceGrid';
import { ResourceFilters } from './ResourceFilters';
import { ResourceUploader } from './ResourceUploader';
import { ResourceDetail } from './ResourceDetail';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { mockResources } from '@/data/mockResources';
import { Resource, ResourceComment } from '@/types/resources';

export function ResourcesView() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(mockResources);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const { toast } = useToast();
  
  const handleAddResource = (resource: Resource) => {
    setResources([...resources, resource]);
    setFilteredResources([...resources, resource]);
    setIsUploaderOpen(false);
    toast({
      title: 'Recurso añadido',
      description: 'Tu recurso ha sido añadido correctamente',
    });
  };

  const handleFilter = (filtered: Resource[]) => {
    setFilteredResources(filtered);
  };

  const handleAddComment = (resourceId: string, comment: ResourceComment) => {
    const updatedResources = resources.map(resource => {
      if (resource.id === resourceId) {
        return {
          ...resource,
          comments: [...(resource.comments || []), comment]
        };
      }
      return resource;
    });

    setResources(updatedResources);
    setFilteredResources(updatedResources);
    
    // Update the selected resource to show the new comment immediately
    const updatedResource = updatedResources.find(r => r.id === resourceId);
    if (updatedResource) {
      setSelectedResource(updatedResource);
    }

    toast({
      title: 'Comentario añadido',
      description: 'Tu comentario ha sido añadido correctamente'
    });
  };

  return (
    <div className="space-y-6">
      <ResourceHeader onUploadClick={() => setIsUploaderOpen(true)} />
      <ResourceFilters resources={resources} onFilter={handleFilter} />
      <ResourceGrid 
        resources={filteredResources} 
        onResourceClick={setSelectedResource}
      />
      
      <Dialog open={isUploaderOpen} onOpenChange={setIsUploaderOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Subir Recurso</DialogTitle>
          </DialogHeader>
          <ResourceUploader onAddResource={handleAddResource} />
        </DialogContent>
      </Dialog>

      <Dialog 
        open={!!selectedResource} 
        onOpenChange={(open) => !open && setSelectedResource(null)}
      >
        <DialogContent className="sm:max-w-[900px]">
          {selectedResource && (
            <ResourceDetail 
              resource={selectedResource}
              onAddComment={handleAddComment}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}