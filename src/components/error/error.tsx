import PropTypes from "prop-types";
import React from "react";

const Error = (props) => {
  const {text} = props;

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">{text[0]}</b>
                {text.slice(1).map((phrase) => (
                  <p className="cities__status-description" key={phrase}>{phrase}</p>
                ))}
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

Error.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Error;
