import * as React from 'react';
import {Subtract} from "utility-types";

interface Props {
  id: number;
}

interface State {
  rating: string;
  review: string;
}

interface InjectedProps {
  rating: number;
  review: string;
  onChange(evt: React.SyntheticEvent): void;
  onReset(): void;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithReview extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        rating: ``,
        review: ``
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleChange(evt) {
      const {name, value} = evt.target;

      this.setState({
        [name]: value
      } as Pick<State, keyof State>);
    }

    handleReset() {
      this.setState({
        rating: `0`,
        review: ``
      });
    }

    render() {
      const {rating, review} = this.state;

      return (
        <Component
          {...this.props}
          rating={Number(rating)}
          review={review}
          onChange={this.handleChange}
          onReset={this.handleReset}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
