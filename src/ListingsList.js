// @flow
import React from "react";
import ReactDOM from "react-dom";

// $FlowFixMe;
import { nanoid } from "nanoid";

// $FlowFixMe;
import { useStoreon } from "storeon/react";
import SingleListing from "./SingleListing.js";

function ListingsList() {
  const {
    dispatch,
    listings
  }: { dispatch: Function, listings: Listing[] } = useStoreon("listings");

  function onClick() {
    dispatch("add", {
      id: nanoid(),
      title: "test-storeon",
      createdAt: Date.now()
    });
  }

  return (
    <div>
      <span>Listings</span>
      <button onClick={onClick}>Add</button>
      {listings.map((listing, index) => (
        <SingleListing listing={listing} key={`listing-${index}`} />
      ))}
    </div>
  );
}

export default ListingsList;
