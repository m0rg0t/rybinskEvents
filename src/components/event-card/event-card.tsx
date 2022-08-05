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
            <h4 className={className('SubTitle')}>{event.placeId}</h4>
            {/*<div className={className('Image')}>
                {event.image && <img src={event.image} alt={event.title}/>}
            </div>*/}
            <div className={className('Content')}>
                <div className={className('Date')}><strong>Дата:</strong> {event.date}</div>
                <div className={className('fromTime')}><strong>Начало:</strong> {event.fromTime}</div>
                <div className={className('toTime')}><strong>Конец:</strong> {event.toTime}</div>
                {event.description &&
                    (<>
                        <strong>Описание:</strong><br/>
                        <div className={className('Description')}
                             dangerouslySetInnerHTML={{__html: event.description}}/>
                    </>)}
            </div>
        </div>
    );
}
export default EventCard;