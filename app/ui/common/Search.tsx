'use client';

'use client';

import { useCallback, useState, useEffect } from 'react';
import { Search as SearchIcon, Calendar, FileText, BookOpen, Palette, X, Loader2 } from 'lucide-react';
import { Input } from '../../ui/input';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { Button } from '../../ui/button';
import { useRouter } from 'next/navigation';
import { SearchResult, searchContent } from '../../lib/search';
import { mockPosts } from '../../data/mockPosts';
import { mockEvents } from '../../data/mockEvents';
import { mockResources } from '../../data/mockResources';
import { mockScripts } from '../../data/mockScripts';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { DialogTitle } from '../../ui/dialog';

export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const searchResults = await searchContent(searchQuery, {
        posts: mockPosts,
        events: mockEvents,
        resources: mockResources,
        scripts: mockScripts,
      });

      setResults(searchResults);
    } catch (error: any) {
      console.error('Error searching content:', error);
      toast({
        title: "Error en la búsqueda",
        description: error.message || "No se pudo realizar la búsqueda",
        variant: "destructive",
      });
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, handleSearch]);

  const handleSelect = (result: SearchResult) => {
    if (!isAuthenticated && (result.type === 'resource' || result.type === 'script')) {
      toast({
        title: "Acceso restringido",
        description: "Regístrate o inicia sesión para acceder a este contenido",
        variant: "destructive",
      });
      return;
    }

    setOpen(false);
    if (result.url) {
      router.push(result.url);
    }
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'blog':
        return <BookOpen className="h-4 w-4" />;
      case 'event':
        return <Calendar className="h-4 w-4" />;
      case 'resource':
        return <Palette className="h-4 w-4" />;
      case 'script':
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative h-8 w-8 px-0 lg:h-9 lg:w-60 lg:px-3 lg:justify-start"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="h-4 w-4 lg:mr-2" aria-hidden="true" />
        <span className="hidden lg:inline-flex">Buscar...</span>
        <span className="sr-only">Buscar</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Búsqueda</DialogTitle>
        <div className="flex items-center border-b px-3">
          <SearchIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandInput
            placeholder="Buscar en todo el contenido..."
            value={query}
            onValueChange={setQuery}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuery('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <ScrollArea className="flex-1 px-3">
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {results.length > 0 && (
                  <CommandGroup heading="Resultados">
                    {results.map((result) => (
                      <CommandItem
                        key={result.id}
                        value={result.id}
                        onSelect={() => handleSelect(result)}
                        className="flex items-center gap-2"
                      >
                        {getIcon(result.type)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.title}</span>
                            <Badge variant="secondary" className="text-xs">
                              {result.type === 'blog' ? 'Blog' :
                               result.type === 'event' ? 'Evento' :
                               result.type === 'resource' ? 'Recurso' :
                               'Guion'}
                            </Badge>
                          </div>
                          {result.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </>
            )}
          </CommandList>
        </ScrollArea>
      </CommandDialog>
    </>
  );
}