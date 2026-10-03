import {addDays, isValid, parse} from 'date-fns';
import type {IEvent} from '../types/IEvent.ts';
export type EventFilter = 'all' | 'current' | 'future';

export function eventWindow(event: Pick<IEvent, 'date' | 'fromTime' | 'toTime'>): [Date, Date] | null {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(event.date) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.fromTime) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(event.toTime)) return null;
    const date = parse(event.date, 'dd-MM-yyyy', new Date(2000, 0, 1));
    if (!isValid(date)) return null;
    const start = parse(event.fromTime, 'HH:mm', date);
    let end = parse(event.toTime, 'HH:mm', date);
    if (!isValid(start) || !isValid(end)) return null;
    // An earlier end time explicitly represents an event continuing past midnight.
    if (end < start) end = addDays(end, 1);
    return [start, end];
}

export function filterEvents<T extends Pick<IEvent, 'date' | 'fromTime' | 'toTime'>>(events: T[], filter: EventFilter, now: Date): T[] {
    if (filter === 'all') return events;
    if (!isValid(now)) return [];
    return events.filter(event => {
        const window = eventWindow(event);
        if (!window) return false;
        const [start, end] = window;
        return filter === 'current' ? now >= start && now <= end : now < start;
    });
}
