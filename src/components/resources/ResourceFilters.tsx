import { useState, useEffect } from 'react';
import { Resource } from '@/types/resources';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ResourceFiltersProps {
  resources: Resource[];
  onFilter: (filtered: Resource[]) => void;
}

export function ResourceFilters({ resources, onFilter }: ResourceFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from resources
  const allTags = [...new Set(resources.flatMap((resource) => resource.tags))];

  // Filter resources when search term, type, or tags change
  useEffect(() => {
    const filtered = resources.filter((resource) => {
      // Search filter
      const matchesSearch =
        searchTerm === '' ||
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType =
        selectedType === 'all' || resource.type === selectedType;

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => resource.tags.includes(tag));

      return matchesSearch && matchesType && matchesTags;
    });

    onFilter(filtered);
  }, [searchTerm, selectedType, selectedTags, resources, onFilter]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-10"
          onClick={clearFilters}
        >
          <X className="mr-2 h-4 w-4" />
          Clear filters
        </Button>
      </div>

      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="link">Links</TabsTrigger>
          <TabsTrigger value="ai-tool">AI Tools</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}