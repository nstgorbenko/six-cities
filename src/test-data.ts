import {CityType, ReviewType, OfferType} from "./types";
import {PlaceType} from "./const";

export const testCity: CityType = {
  name: `Amsterdam`,
  location: {
    coordinates: [55.5, 22.2],
    zoom: 10,
  },
};

export const testCities: Array<CityType> = [{
  name: `Amsterdam`,
  location: {
    coordinates: [55.5, 22.2],
    zoom: 10,
  }
}, {
  name: `Paris`,
  location: {
    coordinates: [77.7, 11.1],
    zoom: 19,
  }
}, {
  name: `Hamburg`,
  location: {
    coordinates: [44.4, 33.3],
    zoom: 11,
  }
}];

export const testServerReviews = [{
  "comment": `Just perfect.`,
  "date": `2020-03-15T22:55:56.845Z`,
  "id": 101,
  "rating": 3.4,
  "user": {
    "avatar_url": `img/avatar-max.jpg`,
    "id": 5,
    "is_pro": true,
    "name": `Alex`
  }
}, {
  "comment": `Great hospitality, and the breakfast in the morning was a nice touch.`,
  "date": `2019-12-05T22:55:56.845Z`,
  "id": 102,
  "rating": 5.0,
  "user": {
    "avatar_url": `img/avatar-max.jpg`,
    "id": 5,
    "is_pro": false,
    "name": `Luke`
  }
}];

export const testReviews: Array<ReviewType> = [{
  id: 101,
  user: {
    id: 5,
    name: `Alex`,
    avatar: `img/avatar-max.jpg`,
    isSuper: true,
  },
  rating: 3.4,
  text: `Just perfect.`,
  time: `2020-03-15T22:55:56.845Z`,
}, {
  id: 102,
  user: {
    id: 5,
    name: `Luke`,
    avatar: `img/avatar-max.jpg`,
    isSuper: false,
  },
  rating: 5.0,
  text: `Great hospitality, and the breakfast in the morning was a nice touch.`,
  time: `2019-12-05T22:55:56.845Z`,
}];

export const testPlace: OfferType = {
  id: 10,
  city: testCity,
  location: {
    coordinates: [52.3709553943508, 4.90309666406198],
    zoom: 15,
  },
  name: `Stylish apartment in the citycenter`,
  type: PlaceType.ROOM,
  description: `Located in the City Center, close to all important attractions.`,
  price: 136,
  photo: `img/apartment-01.jpg`,
  allPhotos: [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
  bedrooms: 1,
  adults: 1,
  amenities: [`Dishwasher`, `Cabel TV`, `Fridge`],
  host: {
    id: 222,
    name: `Lucy`,
    avatar: `img/avatar-angelina.jpg`,
    isSuper: true,
  },
  rating: 4.5,
  isPremium: false,
  isFavorite: true,
};

export const testPlaces: Array<OfferType> = [testPlace, {
  id: 11,
  city: testCity,
  location: {
    coordinates: [55.3709553943505, 5.90309666406196],
    zoom: 15,
  },
  name: `Private Attic Studio`,
  type: PlaceType.APARTMENT,
  description: `Cosy and comfortable apartment on the ground floor of a typical Amsterdam building.`,
  price: 230,
  photo: `img/apartment-02.jpg`,
  allPhotos: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-02.jpg`],
  bedrooms: 3,
  adults: 4,
  amenities: [`Coffee machine`, `Baby seat`, `Kitchen`],
  host: {
    id: 555,
    name: `Mike`,
    avatar: `img/avatar-max.jpg`,
    isSuper: false
  },
  rating: 4.2,
  isPremium: true,
  isFavorite: false,
}];

export const testServerOffers = [{
  "id": 10,
  "city": {
    "location": {
      "latitude": 55.5,
      "longitude": 22.2,
      "zoom": 10
    },
    "name": `Amsterdam`
  },
  "location": {
    "latitude": 52.3709553943508,
    "longitude": 4.90309666406198,
    "zoom": 15,
  },
  "title": `Stylish apartment in the citycenter`,
  "type": `room`,
  "description": `Located in the City Center, close to all important attractions.`,
  "price": 136,
  "preview_image": `img/apartment-01.jpg`,
  "images": [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
  "bedrooms": 1,
  "max_adults": 1,
  "goods": [`Dishwasher`, `Cabel TV`, `Fridge`],
  "host": {
    "id": 222,
    "name": `Lucy`,
    "avatar_url": `img/avatar-angelina.jpg`,
    "is_pro": true,
  },
  "rating": 4.5,
  "is_premium": false,
  "is_favorite": true,
}, {
  "id": 11,
  "city": {
    "name": `Amsterdam`,
    "location": {
      "latitude": 55.5,
      "longitude": 22.2,
      "zoom": 10,
    },
  },
  "location": {
    "latitude": 55.3709553943505,
    "longitude": 5.90309666406196,
    "zoom": 15,
  },
  "title": `Private Attic Studio`,
  "type": `apartment`,
  "description": `Cosy and comfortable apartment on the ground floor of a typical Amsterdam building.`,
  "price": 230,
  "preview_image": `img/apartment-02.jpg`,
  "images": [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-02.jpg`],
  "bedrooms": 3,
  "max_adults": 4,
  "goods": [`Coffee machine`, `Baby seat`, `Kitchen`],
  "host": {
    "id": 555,
    "name": `Mike`,
    "avatar_url": `img/avatar-max.jpg`,
    "is_pro": false
  },
  "rating": 4.2,
  "is_premium": true,
  "is_favorite": false,
}];

export const testGroupedPlace = [{
  name: `Amsterdam`,
  location: {
    coordinates: [55.5, 22.2],
    zoom: 10,
  },
  offers: [testPlace]
}];

export const testGroupedPlaces = [{
  name: `Amsterdam`,
  location: {
    coordinates: [55.5, 22.2],
    zoom: 10,
  },
  offers: testPlaces
}];

export const testUserInfo = {
  id: 0,
  name: ``,
  email: ``,
  avatar: `/path`,
  isSuper: true,
};
