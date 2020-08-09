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

export const noop = () => {
  // do nothing
};

export const updateNearbyOffers = (oldNearbyOffers, newNearbyOffer) => {

  if (oldNearbyOffers.length > 0) {
    const newNearbyOfferIndex = oldNearbyOffers.findIndex(({id}) => id === newNearbyOffer.id);
    oldNearbyOffers[newNearbyOfferIndex] = newNearbyOffer;
  }

  return oldNearbyOffers;
};

export const updateOffers = (oldOffers, newOffer) => {
  const city = newOffer.city.name;

  if (oldOffers.length > 0) {
    const cityOffers = oldOffers.filter(({name}) => name === city)[0].offers;
    const newOfferIndex = cityOffers.findIndex(({id}) => id === newOffer.id);
    cityOffers[newOfferIndex] = newOffer;

    return oldOffers;
  }

  return groupOffersByCities([newOffer]);
};

export const updateFavorites = (oldFavorites, newFavorite) => {
  const isFavorite = newFavorite.isFavorite;

  if (isFavorite) {
    oldFavorites.push(newFavorite);
  } else {
    const index = oldFavorites.findIndex(({id}) => id === newFavorite.id);
    oldFavorites.splice(index, 1);
  }

  return oldFavorites;
};
