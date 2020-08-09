import {PlaceType} from "./const";

export interface LocationType {
  coordinates: [number, number],
  zoom: number,
};

export interface ReviewType {
  id: number,
  user: {
    id: number,
    name: string,
    avatar: string,
    isSuper: boolean,
  },
  rating: number,
  text: string,
  time: string,
};

export interface CityType {
  name: string,
  location: LocationType,
};

export interface OfferType {
  id: number,
  city: CityType,
  location: LocationType,
  name: string,
  type: PlaceType,
  description: string,
  price: number,
  photo: string,
  allPhotos: Array<string>,
  bedrooms: number,
  adults: number,
  amenities: Array<string>,
  host: {
    id: number,
    name: string,
    avatar: string,
    isSuper: boolean
  },
  rating: number,
  isPremium: boolean,
  isFavorite: boolean
};

export interface UserType {
  id: number,
  name: string,
  email: string,
  avatar: string,
  isSuper: boolean,
};
