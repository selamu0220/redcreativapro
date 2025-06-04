import { Script, ScriptVersion } from '../../types/scripts';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { formatDate } from "../lib\dateUtils";
import {
  Calendar,
  Clock,
  Edit2,
  FileText,
  GitBranch,
  Star,
  Tags,
} from 'lucide-react';
import { diffLines } from 'diff';

interface ScriptDetailProps {
  script: Script;
  onEdit: (script: Script) => void;
}

export function ScriptDetail({ script, onEdit }: ScriptDetailProps) {
  const renderVersionDiff = (currentVersion: ScriptVersion, previousVersion?: ScriptVersion) => {
    if (!previousVersion) return null;

    const changes = diffLines(previousVersion.content, currentVersion.content);
    return (
      <div className="font-mono text-sm whitespace-pre-wrap">
        {changes.map((part, i) => {
          if (part.added) {
            return (
              <div key={i} className="bg-green-500/20 text-green-700">
                {part.value}
              </div>
            );
          }
          if (part.removed) {
            return (
              <div key={i} className="bg-red-500/20 text-red-700">
                {part.value}
              </div>
            );
          }
          return <div key={i}>{part.value}</div>;
        })}
      </div>
    );
  };

  return (
    <div className="border rounded-lg">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{script.title}</h2>
              {script.aiGenerated && (
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Updated {formatDate(script.updatedAt)}</span>
              </div>
              {script.eventId && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Linked to event</span>
                </div>
              )}
            </div>
          </div>
          <Button onClick={() => onEdit(script)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Script
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <Badge
            variant="secondary"
            className="capitalize"
          >
            {script.status}
          </Badge>
          <Badge variant="outline">{script.category}</Badge>
          {script.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {script.assignees && script.assignees.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Assignees:</span>
            <div className="flex -space-x-2">
              {script.assignees.map((assignee) => (
                <Avatar
                  key={assignee.id}
                  className="h-8 w-8 border-2 border-background"
                >
                  <AvatarImage src={assignee.avatarUrl} />
                  <AvatarFallback>
                    {assignee.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      <Tabs defaultValue="content" className="p-6">
        <TabsList>
          <TabsTrigger value="content">
            <FileText className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="versions">
            <GitBranch className="h-4 w-4 mr-2" />
            Versions
          </TabsTrigger>
          <TabsTrigger value="metadata">
            <Tags className="h-4 w-4 mr-2" />
            Metadata
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <ScrollArea className="h-[400px] rounded-md border p-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {script.content}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="versions" className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {script.versions.map((version, index) => (
                <div key={version.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>
                          {version.createdBy.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {version.createdBy.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(version.createdAt)}
                      </span>
                    </div>
                    <Badge variant="outline">v{script.versions.length - index}</Badge>
                  </div>
                  {version.comment && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {version.comment}
                    </p>
                  )}
                  <div className="text-sm">
                    {renderVersionDiff(
                      version,
                      script.versions[index + 1]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="metadata" className="mt-4">
          <div className="space-y-4">
            {script.seoKeywords && (
              <div>
                <h4 className="text-sm font-medium mb-2">SEO Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {script.seoKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {script.platforms && (
              <div>
                <h4 className="text-sm font-medium mb-2">Target Platforms</h4>
                <div className="flex flex-wrap gap-2">
                  {script.platforms.map((platform) => (
                    <Badge key={platform} variant="outline">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
