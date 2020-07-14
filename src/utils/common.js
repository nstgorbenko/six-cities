export const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export const getCities = (offers) => {
  const allCities = offers.reduce((cities, {city}) => {
    if (!cities.hasOwnProperty(city.name)) {
      cities[city.name] = city;
    }
    return cities;
  }, {});

  return Object.values(allCities);
};

export const getCityOffers = (chosenCity, offers) => {
  return offers.filter(({city}) => city.name === chosenCity);
};

export const getFirstCity = (offers) => {
  return getCities(offers)[0];
};

export const getRatingPercent = (rating) => {
  return Math.round(rating) * 20;
};
