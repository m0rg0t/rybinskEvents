import events from "../../data/events";
import EventCard from "../event-card/event-card";
import * as React from "react";
import {cn} from "@bem-react/classname";
import './events.css';

const Events = () => {
    const className=cn('Events');
   return <div className={className()} id={"events"}>
        {events.map(event => (
            <EventCard event={event} key={event.placeId} />
        ))}
    </div>
}

export default Events;