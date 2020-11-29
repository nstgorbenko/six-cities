export const MAX_NEARBY_OFFERS_COUNT = 3;
export const MAX_PHOTOS_COUNT = 6;
export const RATING_TITLES: Array<string> = [`perfect`, `good`, `not bad`, `badly`, `terribly`];
export const REVIEWS_TO_SHOW = 10;

export enum AppRoute {
  FAVORITES = `/favorites`,
  LOGIN = `/login`,
  MAIN = `/`,
  OFFER = `/offer`,
}

export enum CardType {
  CITIES = `cities`,
  FAVORITES = `favorites`,
  NEAR_PLACES = `near-places`
}

export const ErrorMessage: {
  [key: string]: Array<string>;
} = {
  FAIL_LOAD: [`Oops!`, `Something went wrong.`, `Please refresh page to load data.`],
  NOT_FOUND: [`404`, `Page not found.`]
};

export const ImageSize: {
  [key: string]: {width: number; height: number};
} = {
  DEFAULT: {
    width: 260,
    height: 200
  },
  FAVORITES: {
    width: 150,
    height: 110
  }
};

export const MarkerSettings: {
  [key: string]: {iconUrl: string; iconSize: [number, number]};
} = {
  DEFAULT: {
    iconUrl: `./img/pin.svg`,
    iconSize: [30, 30]
  },
  ACTIVE: {
    iconUrl: `/img/pin-active.svg`,
    iconSize: [30, 30]
  },
};

export enum PlaceType {
  APARTMENT = `apartment`,
  ROOM = `room`,
  HOUSE = `house`,
  HOTEL = `hotel`,
}

export enum ReviewLength {
  MIN = 50,
  MAX = 300
}

export enum SortType {
  POPULAR = `Popular`,
  PRICE_TO_HIGH = `Price: low to high`,
  PRICE_TO_LOW = `Price: high to low`,
  TOP_RATED = `Top rated first`,
}
