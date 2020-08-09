import {connect} from "react-redux";
import * as React from 'react';

import {CardType} from "../../const";
import {getFavorites} from "../../reducer/data/selectors";
import {groupOffersByCities} from "../../utils/common";
import Header from "../header/header";
import {OfferType} from "../../types";
import PlaceCard from "../place-card/place-card";

interface Props {
  offers: Array<OfferType>;
  onPlaceCardHover(cardId: number): void;
}

const Favorites: React.FC<Props> = (props: Props) => {
  const {offers: allOffers, onPlaceCardHover} = props;
  const isEmpty: boolean = allOffers.length === 0;

  return (
    <div className={`page ${isEmpty ? `page--favorites-empty` : ``}`}>
      <Header />
      <main className={`page__main page__main--favorites ${isEmpty ? `page__main--favorites-empty` : ``}`}>
        <div className="page__favorites-container container">
          <section className={`favorites ${isEmpty ? `favorites--empty` : ``}`}>
            <h1 className={`${isEmpty ? `visually-hidden` : `favorites__title`}`}>{isEmpty ? `Favorites (empty)` : `Saved listing`}</h1>
            {isEmpty
              ? (<div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan yor future trips.</p>
              </div>)
              : <ul className="favorites__list">
                {groupOffersByCities(allOffers).map(({name, offers}) => (
                  <li className="favorites__locations-items" key={name}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{name}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offers.map((offer) => (
                        <PlaceCard key={offer.id}
                          cardType={CardType.FAVORITES}
                          place={offer}
                          onHover={onPlaceCardHover}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>}
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  offers: getFavorites(state),
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
