export const capitalizeWord = (word) => word[0].toUpperCase() + word.slice(1);

export const getFirstCity = (offers) => {
  const {name, location} = offers[0];
  return ({name, location});
};

export const groupOffersByCities = (offers) => {
  const allCities = offers.reduce((cities, offer) => {
    const currentCity = offer.city.name;
    if (!cities.hasOwnProperty(currentCity)) {
      cities[currentCity] = {
        name: offer.city.name,
        location: offer.city.location,
        offers: [],
      };
    }
    cities[currentCity].offers.push(offer);

    return cities;
  }, {});

  return Object.values(allCities);
};

export const getRatingPercent = (rating) => {
  return Math.round(rating) * 20;
};
