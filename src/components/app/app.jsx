import Main from "../main/main.jsx";
import React from "react";

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {offersCount} = props;

  return (
    <Main
      offersCount = {offersCount}
    />
  );
};

export default App;
