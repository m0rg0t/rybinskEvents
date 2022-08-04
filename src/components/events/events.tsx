import events from "../../data/events";
import EventCard from "../event-card/event-card";
import * as React from "react";
import {cn} from "@bem-react/classname";
import './events.css';
import {useEffect, useLayoutEffect, useRef} from "react";

const Events = () => {
    const className = cn('Events');
    const yandexMap = useRef<any>(null);
    const yandexMapLibrary = useRef<any>(null);

    useLayoutEffect(() => {
            var script = document.createElement('script');
            script.onload = function () {
                //do stuff with the script
                // @ts-ignore
                const ymaps = window.ymaps;

                console.log(ymaps);
                if (ymaps) {
                    ymaps.ready(init);

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

                    /*var myGeoObject = new ymaps.GeoObject({
                        geometry: {
                            type: "Point", // тип геометрии - точка
                            coordinates: [55.8, 37.8] // координаты точки
                        }
                    });
                    myMap.geoObjects.add(myGeoObject);*/
                }

            };
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=f7af4e10-532a-42fd-a93e-7e921555d860&lang=ru_RU`;
            document.head.appendChild(script);
        }, []
    )
    ;

    return <>
        <div className={className()} id={"events"}>
            {events.map(event => (
                <EventCard event={event} key={event.placeId}/>
            ))}
        </div>
        <div id={"map"} className={"Map"}></div>
    </>
}

export default Events;