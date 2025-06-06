import { Resource } from '../../types/resources';
import { ResourceCard } from './ResourceCard';
import { EmptyState } from "../common/EmptyState";

interface ResourceGridProps {
  resources: Resource[];
  onResourceClick?: (resource: Resource) => void;
  viewMode?: 'grid' | 'list';
  favorites?: string[];
  onToggleFavorite?: (resourceId: string) => void;
}

export function ResourceGrid({ 
  resources, 
  onResourceClick,
  viewMode = 'grid',
  favorites = [],
  onToggleFavorite
}: ResourceGridProps) {
  if (resources.length === 0) {
    return (
      <EmptyState
        icon="file"
        title="No resources found"
        description="Try changing your filters or add a new resource."
      />
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      : "space-y-4"
    }>
      {resources.map((resource) => (
        <ResourceCard 
          key={resource.id} 
          resource={resource} 
          onClick={() => onResourceClick?.(resource)}
          viewMode={viewMode}
          isFavorite={favorites.includes(resource.id)}
          onToggleFavorite={() => onToggleFavorite?.(resource.id)}
        />
      ))}
    </div>
  );
}
