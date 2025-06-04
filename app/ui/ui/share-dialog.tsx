import { useState } from 'react';
import { Check, Copy, Globe2, Lock, Users } from 'lucide-react';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { useToast } from '../../hooks/use-toast';

export type Visibility = 'private' | 'public' | 'shared';

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  visibility: Visibility;
  onVisibilityChange: (visibility: Visibility) => void;
  onShare: (emails: string[]) => void;
  shareUrl?: string;
}

export function ShareDialog({
  open,
  onOpenChange,
  title,
  visibility,
  onVisibilityChange,
  onShare,
  shareUrl,
}: ShareDialogProps) {
  const [emails, setEmails] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyLink = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast({
          title: "Enlace copiado",
          description: "El enlace ha sido copiado al portapapeles",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "No se pudo copiar el enlace",
          variant: "destructive",
        });
      }
    }
  };

  const handleShare = () => {
    const emailList = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => email.includes('@'));

    if (emailList.length > 0) {
      onShare(emailList);
      setEmails('');
      toast({
        title: "Compartido",
        description: "Se ha compartido correctamente",
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, ingresa al menos un email válido",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartir {title}</DialogTitle>
          <DialogDescription>
            Elige cómo quieres compartir este contenido
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <RadioGroup
            value={visibility}
            onValueChange={(value: Visibility) => onVisibilityChange(value)}
            className="gap-4"
          >
            <div className="flex items-center space-x-2 space-y-0">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Privado
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-y-0">
              <RadioGroupItem value="shared" id="shared" />
              <Label htmlFor="shared" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Compartido
              </Label>
            </div>
            <div className="flex items-center space-x-2 space-y-0">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="flex items-center gap-2">
                <Globe2 className="h-4 w-4" />
                Público
              </Label>
            </div>
          </RadioGroup>

          {visibility === 'shared' && (
            <div className="space-y-2">
              <Label>Compartir con (emails separados por comas)</Label>
              <div className="flex space-x-2">
                <Input
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                  placeholder="usuario@ejemplo.com, otro@ejemplo.com"
                />
                <Button onClick={handleShare}>Compartir</Button>
              </div>
            </div>
          )}

          {(visibility === 'public' || visibility === 'shared') && shareUrl && (
            <div className="space-y-2">
              <Label>Enlace compartible</Label>
              <div className="flex space-x-2">
                <Input value={shareUrl} readOnly />
                <Button
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}