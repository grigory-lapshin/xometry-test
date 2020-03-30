import { createStoreon } from "storeon";

let listings = store => {
  // Initial state
  store.on("@init", () => ({
    listings: []
  }));
  // Reducers returns only changed part of the state
  store.on("add", ({ listings }, listing) => ({
    listings: [...listings, listing]
  }));
};

export const store = createStoreon([listings]);
