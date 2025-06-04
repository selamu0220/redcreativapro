import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format, addHours, parseISO } from 'date-fns';
import { CalendarIcon, Trash2, Plus, X, Sparkles } from 'lucide-react';
import { EventType } from '../../types/calendar';
import { AIProvider } from '../../types/ai';
import { Button } from '../../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Switch } from '../../ui/switch';
import { v4 } from '../../lib/utils';
import { useToast } from '../../hooks/use-toast';
import { generateScriptWithAI } from "../lib\ai";

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string(),
  color: z.string(),
  hasScript: z.boolean().default(false),
  script: z.string().optional(),
  eventType: z.string().optional(),
  aiProvider: z.enum(['gemini', 'openai', 'anthropic']).optional(),
  apiKey: z.string().optional(),
});

interface CalendarEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: EventType) => void;
  onDelete?: (id: string) => void;
  event: EventType | null;
  defaultDate?: Date;
}

export function CalendarEventDialog({
  open,
  onOpenChange,
  onSave,
  onDelete,
  event,
  defaultDate = new Date(),
}: CalendarEventDialogProps) {
  const { toast } = useToast();
  const [aiProvider, setAIProvider] = useState<AIProvider>('gemini');
  const [apiKey, setApiKey] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      date: defaultDate,
      startTime: format(new Date(), 'HH:mm'),
      endTime: format(addHours(new Date(), 1), 'HH:mm'),
      color: 'bg-primary text-primary-foreground',
      hasScript: false,
      script: '',
      eventType: 'other',
      aiProvider: 'gemini',
      apiKey: '',
    },
  });

  useEffect(() => {
    if (event) {
      const startDate = parseISO(event.start);
      const endDate = parseISO(event.end);
      
      form.reset({
        title: event.title,
        description: event.description || '',
        date: startDate,
        startTime: format(startDate, 'HH:mm'),
        endTime: format(endDate, 'HH:mm'),
        color: event.color || 'bg-primary text-primary-foreground',
        hasScript: !!event.script,
        script: event.script || '',
        eventType: 'other',
      });
    } else {
      form.reset({
        title: '',
        description: '',
        date: defaultDate,
        startTime: format(new Date(), 'HH:mm'),
        endTime: format(addHours(new Date(), 1), 'HH:mm'),
        color: 'bg-primary text-primary-foreground',
        hasScript: false,
        script: '',
        eventType: 'other',
      });
    }
  }, [event, defaultDate, form]);

  const generateScript = async () => {
    const title = form.getValues('title');
    const description = form.getValues('description');
    const eventType = form.getValues('eventType');

    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter an event title before generating a script.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key required",
        description: "Please enter your AI provider API key.",
        variant: "destructive"
      });
      return;
    }

    try {
      const scriptTemplate = await generateScriptWithAI(`Generate a detailed script for a ${eventType} event titled "${title}"${description ? ` with the following context: ${description}` : ''}`);
      
      form.setValue('script', scriptTemplate);
      form.setValue('hasScript', true);

      toast({
        title: "Script generated",
        description: "AI has generated a script template for your event."
      });
    } catch (error: any) {
      toast({
        title: "Error generating script",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { date, startTime, endTime, ...rest } = values;
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startDate = new Date(date);
    startDate.setHours(startHours, startMinutes, 0);
    
    const endDate = new Date(date);
    endDate.setHours(endHours, endMinutes, 0);
    
    // Ensure end time is after start time
    if (endDate <= startDate) {
      endDate.setDate(endDate.getDate() + 1);
    }
    
    const newEvent: EventType = {
      id: event?.id || v4(),
      title: rest.title,
      description: rest.description,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      color: rest.color,
      script: rest.hasScript ? rest.script : undefined,
    };
    
    onSave(newEvent);
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <DialogDescription>
            {event
              ? 'Update your event details below.'
              : 'Add a new event to your calendar.'}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Event description"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bg-primary text-primary-foreground">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                            <span>Primary</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bg-red-500 text-white">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                            <span>Red</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bg-blue-500 text-white">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                            <span>Blue</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bg-green-500 text-white">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                            <span>Green</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bg-purple-500 text-white">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                            <span>Purple</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">Video Content</SelectItem>
                      <SelectItem value="podcast">Podcast Episode</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of event to generate an appropriate script
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="font-medium">AI Configuration</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>AI Provider</FormLabel>
                    <Select
                      value={aiProvider}
                      onValueChange={(value: AIProvider) => setAIProvider(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gemini">Google Gemini</SelectItem>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="anthropic">Anthropic/Claude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <FormLabel>API Key</FormLabel>
                    <Input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="hasScript"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Include Script</FormLabel>
                    <FormDescription>
                      Add a script or notes for this event
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            {form.watch('hasScript') && (
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={generateScript}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Script with AI
                </Button>
                
                <FormField
                  control={form.control}
                  name="script"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Script</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add your script or notes here"
                          className="min-h-[200px] font-mono"
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            <DialogFooter className="gap-2 sm:gap-0">
              {event && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="mr-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
              <Button type="submit">{event ? 'Update' : 'Create'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
