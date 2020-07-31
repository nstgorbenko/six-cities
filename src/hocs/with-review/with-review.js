import React, {PureComponent} from "react";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        review: ``
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleReset = this.handleReset.bind(this);
    }

    handleChange(evt) {
      const {name, value} = evt.target;

      this.setState({
        [name]: value
      });
    }

    handleReset() {
      this.setState({
        rating: 0,
        review: ``
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          rating={Number(this.state.rating)}
          review={this.state.review}
          onChange={this.handleChange}
          onReset={this.handleReset}
        />
      );
    }
  }

  return WithReview;
};

export default withReview;
