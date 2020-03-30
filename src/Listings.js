// @flow
import React from "react";
import ReactDOM from "react-dom";

// $FlowFixMe
import { useStoreon } from "storeon/react";

declare type Listing = {
  id: string,
  title: string
};

declare type Props = {
  listings: Listing[]
};

function Listings() {
  const { dispatch, listings } = useStoreon("listings");

  function onClick() {
    console.log("click!");
    dispatch("add", { id: "1", title: "test-storeon" });
  }

  console.log("listings", listings);

  return (
    <div>
      <span>Listings</span>
      <button onClick={onClick}>Add</button>
      {listings.map((listing, index) => (
        <h2 key={String(index)}>{listing.title}</h2>
      ))}
    </div>
  );
}

export default Listings;
