import React from "react";
import ReactDOM from "react-dom";

import Listings from "./ListingsList";
import Form from "./Form";

import { StoreContext } from "storeon/react";
import { store } from "./store";

function App() {
  return (
    <div className="App">
      <StoreContext.Provider value={store}>
        <Form />
        <Listings />
      </StoreContext.Provider>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
