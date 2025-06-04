import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface ResourceHeaderProps {
  onUploadClick: () => void;
}

export function ResourceHeader({ onUploadClick }: ResourceHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground">
          Manage your creative assets, documents, and AI tools.
        </p>
      </div>
      <Button onClick={onUploadClick} className="gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Add Resource</span>
      </Button>
    </div>
  );
}