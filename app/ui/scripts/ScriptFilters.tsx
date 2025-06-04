import { useState, useEffect } from 'react';
import { Script } from '@/types/scripts';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface ScriptFiltersProps {
  scripts: Script[];
  onFilter: (filtered: Script[]) => void;
}

export function ScriptFilters({ scripts, onFilter }: ScriptFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = [...new Set(scripts.flatMap((script) => script.tags))];

  useEffect(() => {
    const filtered = scripts.filter((script) => {
      const matchesSearch =
        searchTerm === '' ||
        script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        script.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === 'all' || script.status === selectedStatus;

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => script.tags.includes(tag));

      return matchesSearch && matchesStatus && matchesTags;
    });

    onFilter(filtered);
  }, [searchTerm, selectedStatus, selectedTags, scripts, onFilter]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedStatus('all');
    setSelectedTags([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search scripts..."
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

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
          <TabsTrigger value="final">Final</TabsTrigger>
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