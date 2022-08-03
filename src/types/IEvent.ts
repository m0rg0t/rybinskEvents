export interface IEvent {
    placeId: string;
    lat: number;
    lng: number;
    date: string;
    fromTime: string;
    toTime: string;
    title: string;
    image: string | null;
    description: string | null;
}