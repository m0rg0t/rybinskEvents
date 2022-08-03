import React from "react";
import './event-card.css'
import {IEvent} from "../../types/IEvent";
import {cn} from "@bem-react/classname";

interface IEventCardProps {
    event: IEvent
}

const EventCard: React.FC<IEventCardProps> = ({event}: IEventCardProps) => {
    const className = cn('EventCard');
    return (
        <div className={className()}>
            <h3 className={className('Title')}>{event.title}</h3>
            <div className={className('Image')}>
                {event.image && <img src={event.image} alt={event.title}/>}
            </div>
            <div className={className('Content')}>

                <div className={className('Date')}>{event.date}</div>
                {event.description &&
                    <div className={className('Description')} dangerouslySetInnerHTML={{__html: event.description}}/>}
            </div>
        </div>
    );
}
export default EventCard;