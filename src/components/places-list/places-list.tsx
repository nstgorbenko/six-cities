import * as React from 'react';

import {CardType} from "../../const";
import {getSortedPlaces} from "../../utils/sort";
import {OfferType} from "../../types";
import PlaceCard from "../place-card/place-card";

interface Props {
  type: CardType;
  places: Array<OfferType>;
  sortType: string;
  onPlaceCardHover(cardId: number): void;
}

const PlacesList: React.FC<Props> = (props: Props) => {
  const {type, places, sortType, onPlaceCardHover} = props;

  const typeClassName: string = type === CardType.CITIES ? `${type}__places-list` : `${type}__list`;
  const shownPlaces: Array<OfferType> = type === CardType.CITIES ? getSortedPlaces(places, sortType) : places;

  return (
    <div className={`${typeClassName} places__list`}>
      {shownPlaces.map((place) =>
        <PlaceCard
          key={place.id}
          cardType={type}
          place={place}
          onHover={onPlaceCardHover}
        />)}
    </div>
  );
};

export default PlacesList;
