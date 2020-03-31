// @flow
import React from "react";
import ReactDOM from "react-dom";

// $FlowFixMe;
import { useStoreon } from "storeon/react";
import SingleListing from "./SingleListing.js";

function ListingsList() {
  const {
    dispatch,
    ids,
    listingsMap
  }: {
    dispatch: Function,
    listings: Listing[],
    ids: string[],
    listingsMap: ListingMap
  } = useStoreon("ids", "listingsMap");

  return (
    <div>
      <span>Listings</span>
      <button onClick={() => dispatch("sortByPrice")}>sort dy price</button>
      <button onClick={() => dispatch("sortByUpdated")}>sortByUpdated</button>
      <button onClick={() => dispatch("sortByCreated")}>sortByCreated</button>
      {ids.map(id => (
        <SingleListing listing={listingsMap[id]} key={`listing-${id}`} />
      ))}
    </div>
  );
}

export default ListingsList;
