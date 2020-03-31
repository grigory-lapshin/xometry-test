// @flow
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// $FlowFixMe;
import { useStoreon } from "storeon/react";
import SingleListing from "./SingleListing.js";

const LISTINGS_PER_PAGE = 2;

function createPagesArray(ids) {
  return Array.from({
    length: Math.ceil(ids.length / LISTINGS_PER_PAGE)
  });
}

function ListingsList() {
  const {
    dispatch,
    ids,
    listingsMap
  }: {
    dispatch: Function,
    ids: string[],
    listingsMap: ListingMap
  } = useStoreon("ids", "listingsMap");

  const [pages, setPages] = useState(createPagesArray(ids));
  const [selectedPage, selectPage] = useState(0);

  function createListingsArray() {
    return ids
      .slice(
        0 + selectedPage * LISTINGS_PER_PAGE,
        LISTINGS_PER_PAGE + selectedPage * LISTINGS_PER_PAGE
      )
      .map(id => listingsMap[id]);
  }

  const [listings, setListings] = useState(() => createListingsArray());

  useEffect(() => {
    setPages(() => createPagesArray(ids));
    setListings(() => createListingsArray());
  }, [ids, selectedPage]);

  return (
    <div>
      <span>Listings</span>
      <button onClick={() => dispatch("sortByPrice")}>sort dy price</button>
      <button onClick={() => dispatch("sortByUpdated")}>sortByUpdated</button>
      <button onClick={() => dispatch("sortByCreated")}>sortByCreated</button>
      <br />
      <br />
      <div>
        {listings.map(listing => (
          <SingleListing listing={listing} key={`listing-${listing.id}`} />
        ))}
      </div>
      <div>
        <br />
        {pages.map((_, index) => (
          <button key={`page-${index + 1}`} onClick={() => selectPage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListingsList;
