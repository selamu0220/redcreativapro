import { Resource } from '../../types/resources';
import { ResourceCard } from './ResourceCard';
import { EmptyState } from './c:\Users\programar\Documents\GitHub\redcreativapro\app\components\common\EmptyState';

interface ResourceGridProps {
  resources: Resource[];
}

export function ResourceGrid({ resources }: ResourceGridProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}