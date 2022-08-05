import events from "../../data/events";
import EventCard from "../event-card/event-card";
import * as React from "react";
import {cn} from "@bem-react/classname";
import './events.css';
import {useEffect, useLayoutEffect, useRef} from "react";
import {IEvent} from "../../types/IEvent";
import {format, parse} from "date-fns";

enum Filters {
    ALL = 'all',
    CURRENT = 'current',
    FUTURE = 'future',

}

const Events = () => {
    const className = cn('Events');
    const yandexMap = useRef<any>(null);
    const yandexMapLibrary = useRef<any>(null);

    const [filter, setFilter] = React.useState<Filters>(Filters.ALL);
    const [filteredEvents, setFilteredEvents] = React.useState<IEvent[]>(events);
    const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

    const DATE_FORMAT = "yyyy-MM-dd'T'kk:mm";

    useLayoutEffect(() => {
            var script = document.createElement('script');
            script.onload = function () {
                //do stuff with the script
                // @ts-ignore
                const ymaps = window.ymaps;

                console.log(ymaps);
                if (ymaps && !yandexMap.current) {
                    ymaps.ready(init);
                    console.log("init");

                    function init() {
                        // Создание карты.
                        let myMap = new ymaps.Map("map", {
                            // Координаты центра карты.
                            // Порядок по умолчанию: «широта, долгота».
                            // Чтобы не определять координаты центра карты вручную,
                            // воспользуйтесь инструментом Определение координат.
                            center: [58.048640, 38.855711],
                            // Уровень масштабирования. Допустимые значения:
                            // от 0 (весь мир) до 19.
                            zoom: 14
                        });
                        yandexMap.current = myMap;
                        console.log("map", myMap);

                        events.forEach(event => {
                                const placemark = new ymaps.Placemark(
                                    [event.lat, event.lng],
                                    {
                                        hintContent: event.title,
                                        balloonContent: `<b>${event.title}</b><br/>${event.description}`
                                    },
                                    {
                                        preset: 'islands#blueCircleDotIconWithCaption'
                                    }
                                );
                                myMap.geoObjects.add(placemark);
                            }
                        );
                    }
                }

            };
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=f7af4e10-532a-42fd-a93e-7e921555d860&lang=ru_RU`;
            document.head.appendChild(script);
        }, []
    );

    useEffect(() => {
        switch (filter) {
            case Filters.ALL:
                setFilteredEvents(events);
                break;
            case Filters.CURRENT:
                setFilteredEvents(events.filter(event => {
                    const date = parse(event.date, "dd-MM-yyyy", new Date());
                    const fromTime = parse(event.fromTime, 'kk:mm', date);
                    const toTime = parse(event.toTime, 'kk:mm', date);
                    const now = currentDate;
                    console.log("currentDate", currentDate, now.getTime());
                    return (toTime.getTime() >= now.getTime() && now.getTime() <= fromTime.getTime());
                }))
                break;
            case Filters.FUTURE:
                setFilteredEvents(events.filter(event => {
                    const date = parse(event.date, "dd-MM-yyyy", new Date());
                    const fromTime = parse(event.fromTime, 'kk:mm', date);
                    const now = currentDate;
                    console.log("currentDate", {currentDate, fromTime, date}, now.getTime() > fromTime.getTime(), now.getTime());
                    return now.getTime() < fromTime.getTime();
                }));
                break;
            default:
                setFilteredEvents(events);
                break;
        }
    }, [filter]);

    return <>
        <div className={className("Search")}>
            <button onClick={() => setFilter(Filters.CURRENT)}>Текущие события</button>
            <button onClick={() => setFilter(Filters.FUTURE)}>Будущие события</button>
            <button onClick={() => setFilter(Filters.ALL)}>Все события</button>

            <div className={className("Search__map")}>
                <label htmlFor={"date"}>Текущая дата</label>
                <input type={"datetime-local"}
                       onChange={(e) => {
                           setCurrentDate(new Date(e.target.value));
                           console.log(e.target.value)
                       }}
                       name={"date"}
                       defaultValue={format(currentDate, DATE_FORMAT)}/>
            </div>

        </div>
        <div className={className()} id={"events"}>
            {filteredEvents.map(event => (
                <EventCard event={event} key={`${event.placeId}_${event.title}`}/>
            ))}
        </div>
        <div id={"map"} className={"Map"}></div>
    </>
}

export default Events;