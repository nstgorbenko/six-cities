export const adaptOffer = (offer) => ({
  id: offer.id,
  city: {
    name: offer.city.name,
    location: {
      coordinates: [offer.city.location.latitude, offer.city.location.longitude],
      zoom: offer.city.location.zoom,
    },
  },
  location: {
    coordinates: [offer.location.latitude, offer.location.longitude],
    zoom: offer.location.zoom,
  },
  name: offer.title,
  type: offer.type,
  description: offer.description,
  price: offer.price,
  photo: offer.preview_image,
  allPhotos: offer.images,
  bedrooms: offer.bedrooms,
  adults: offer.max_adults,
  amenities: offer.goods,
  host: {
    id: offer.host.id,
    name: offer.host.name,
    avatar: offer.host.avatar_url,
    isSuper: offer.host.is_pro,
  },
  rating: offer.rating,
  isPremium: offer.is_premium,
  isFavorite: offer.is_favorite,
});

export const adaptOffers = (offers) =>
  offers.map((offer) => adaptOffer(offer));

export const adaptUserInfo = (info) => ({
  id: info.id,
  name: info.name,
  email: info.email,
  avatar: info.avatar_url,
  isSuper: info.is_pro,
});
