import { EventType } from "../types/calendar";
import { addDays, setHours, setMinutes } from 'date-fns';

const today = new Date();
const startOfDay = setHours(setMinutes(today, 0), 9);

export const mockEvents: EventType[] = [
  {
    id: '1',
    title: 'Team Brainstorming Session',
    description: 'Brainstorming new ideas for the upcoming marketing campaign',
    start: setHours(today, 10).toISOString(),
    end: setHours(today, 11).toISOString(),
    color: 'bg-blue-500 text-white',
    script: '1. Welcome and introduction (5 mins)\n2. Review previous ideas (10 mins)\n3. Brainstorming session (30 mins)\n4. Vote on top ideas (10 mins)\n5. Assign next steps (5 mins)',
    visibility: 'private',
    ownerId: 'user1',
  },
  {
    id: '2',
    title: 'Content Review',
    description: 'Review and approve content for the website launch',
    start: addDays(setHours(today, 11), 2).toISOString(),
    end: addDays(setHours(today, 12), 2).toISOString(),
    color: 'bg-green-500 text-white',
    visibility: 'private',
    ownerId: 'user1',
  }
];
