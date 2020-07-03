export const testReviews = [{
  id: `101`,
  userName: `Alex`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 3.4,
  text: `Just perfect.`,
  time: `2020-03-15T22:55:56.845Z`,
}, {
  id: `102`,
  userName: `Luke`,
  userAvatar: `img/avatar-max.jpg`,
  rating: 5.0,
  text: `Great hospitality, and the breakfast in the morning was a nice touch.`,
  time: `2019-12-05T22:55:56.845Z`,
}];

export const testPlaces = [{
  id: `10`,
  location: [52.3709553943508, 4.90309666406198],
  name: `Stylish apartment in the citycenter`,
  type: `room`,
  description: `Located in the City Center, close to all important attractions.`,
  price: 136,
  photo: `img/apartment-01.jpg`,
  allPhotos: [`img/apartment-01.jpg`, `img/apartment-01.jpg`, `img/apartment-01.jpg`],
  bedrooms: 1,
  adults: 2,
  amenities: [`Dishwasher`, `Cabel TV`, `Fridge`],
  host: {
    name: `Lucy`,
    avatar: `img/avatar-angelina.jpg`,
    isSuper: true
  },
  rating: 4.5,
  reviews: testReviews,
  isPremium: false,
  isFavorite: true,
}, {
  id: `11`,
  location: [55.3709553943505, 5.90309666406196],
  name: `Private Attic Studio`,
  type: `apartment`,
  description: `Cosy and comfortable apartment on the ground floor of a typical Amsterdam building.`,
  price: 230,
  photo: `img/apartment-02.jpg`,
  allPhotos: [`img/apartment-02.jpg`, `img/apartment-02.jpg`, `img/apartment-02.jpg`],
  bedrooms: 3,
  adults: 4,
  amenities: [`Coffee machine`, `Baby seat`, `Kitchen`],
  host: {
    name: `Mike`,
    avatar: `img/avatar-max.jpg`,
    isSuper: false
  },
  rating: 4.2,
  reviews: testReviews,
  isPremium: true,
  isFavorite: false,
}];
