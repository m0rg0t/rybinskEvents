import events from '../../data/events';
import EventCard from '../event-card/event-card';
import * as React from 'react';
import {cn} from '@bem-react/classname';
import './events.css';
import {format} from 'date-fns';
import {filterEvents} from '../../lib/event-time';
import type {IEvent} from '../../types/IEvent';
import type {EventFilter} from '../../lib/event-time';
import {mountEventMap} from '../../lib/event-map';

const Events = ({sourceEvents = events}: {sourceEvents?: IEvent[]} = {}) => {
    const className = cn('Events');
    const mapContainer = React.useRef<HTMLDivElement>(null);
    const [filter, setFilter] = React.useState<EventFilter>('all');
    const [dateInput, setDateInput] = React.useState(() => format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    const [mapError, setMapError] = React.useState(false);
    const mapKey = process.env.GATSBY_YANDEX_MAPS_API_KEY;
    const filteredEvents = filterEvents(sourceEvents, filter, new Date(dateInput));

    React.useEffect(() => {
        if (!mapContainer.current) return;
        return mountEventMap({document, container: mapContainer.current, key: mapKey, events: sourceEvents,
            getProvider: () => (window as Window & {ymaps?: unknown}).ymaps,
            onError: () => setMapError(true)});
    }, [mapKey, sourceEvents]);

    return <>
        <div className={className('Search')} id="search">
            <button onClick={() => setFilter('current')}>Текущие события</button>
            <button onClick={() => setFilter('future')}>Будущие события</button>
            <button onClick={() => setFilter('all')}>Все события</button>
            <div className={className('Search__map')}>
                <label htmlFor="date">Текущая дата</label>
                <input id="date" type="datetime-local" name="date" value={dateInput}
                       onChange={event => setDateInput(event.target.value)}/>
            </div>
        </div>
        <div className={className()} id="events">
            {filteredEvents.map((event, index) => <EventCard event={event} key={`${event.placeId}_${event.title}_${index}`}/>)}
        </div>
        {(!mapKey || mapError) && <p role="status">Карта недоступна. Адреса и время событий указаны в списке.</p>}
        <div id="map" className="Map" ref={mapContainer}/>
    </>;
};
export default Events;
