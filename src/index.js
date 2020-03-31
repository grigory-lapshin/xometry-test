import React from "react";
import ReactDOM from "react-dom";
import Listings from "./ListingsList";

import { StoreContext } from "storeon/react";
import { store } from "./store";

const App = () => (
  <div className="App">
    <StoreContext.Provider value={store}>
      <Listings />
    </StoreContext.Provider>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
