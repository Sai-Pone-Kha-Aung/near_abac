export type Card = {
    id: number;
    name: string;
    category: string;
    address: string;
    phone: string;
    url: string;
    hours: string;
    image: string;
}

export type SingleItem = {
    id: number;
    name: string;
    category: string;
    desc: string;
    address: string;
    phone: string;
    url: string;
    hours: string;
    image: string;
    latitude: number;
    longitude: number;
}

export interface sheetsData {
    id: number;
    name: string;
    category: string;
    desc: string;
    address: string;
    phone: string;
    url: string;
    hours: string;
    image: string;
    latitude: number;
    longitude: number;
}