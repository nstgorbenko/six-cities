import * as React from 'react';
import {Subtract} from "utility-types";

interface State {
  isActive: boolean;
}

interface InjectedProps {
  isActive: boolean;
  onActiveChange(): void;
}

const withActiveFlag = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActiveFlag extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isActive: false
      };

      this.handleActiveChange = this.handleActiveChange.bind(this);
    }

    handleActiveChange() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive
      }));
    }

    render() {
      return (
        <Component
          {...this.props}
          isActive={this.state.isActive}
          onActiveChange={this.handleActiveChange}
        />
      );
    }
  }

  return WithActiveFlag;
};

export default withActiveFlag;
