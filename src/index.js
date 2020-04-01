import React from "react";
import ReactDOM from "react-dom";

import { StoreContext } from "storeon/react";

import Listings from "./ListingsList";
import Form from "./Form";

import { store } from "./store";

function App() {
  return (
    <StoreContext.Provider value={store}>
      <div className="container mx-auto p-6 pb-24">
        <Form />
        <Listings />
      </div>
    </StoreContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
