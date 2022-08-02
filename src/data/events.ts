const events = [
  {
    "placeId": "Красная площадь",
    "lat": 55.755826,
    "lng": 37.6173,
    "date": "06-08-2022",
    "fromTime": "13:00",
    "toTime": "20:00",
    "title": "Праздник Классика на Красной",
    "image": "https://picsum.photos/id/10/200/300",
      description: "",
  },
  {
    "placeId": "Стоялая улица",
    "lat": 55.755826,
    "lng": 37.6173,
    "date": "06-08-2022",
    "fromTime": "13:00",
    "toTime": "20:00",
    "title": "Праздник Классика на Красной",
      description: `- Ярмарка народных промыслов</br>
      - Мастер-классы</br>
    - Народные игры</br>`,
  }
]

export interface IEvent {
    placeId: string;
    lat: number;
    lng: number;
    date: string;
    fromTime: string;
    toTime: string;
    title: string;
    image: string;
    description: string;

}

export default events;