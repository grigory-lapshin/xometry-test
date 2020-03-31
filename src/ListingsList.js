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

function mapSortingOrderToDispatch(sortingOrder) {
  const type = sortingOrder.slice(0, -1);
  const direction = sortingOrder.slice(-1);
  return [type, direction];
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

  function onSortingChange(event) {
    const sortingOrder = event.target.value;
    const [type, direction] = mapSortingOrderToDispatch(sortingOrder);
    console.log("[type, direction]", mapSortingOrderToDispatch(sortingOrder));
    dispatch(type, direction);
  }

  return (
    <div>
      <span>Listings</span>
      {/* <button onClick={() => dispatch("sortByPrice")}>sort dy price</button>
      <button onClick={() => dispatch("sortByUpdated")}>sortByUpdated</button>
      <button onClick={() => dispatch("sortByCreated")}>sortByCreated</button> */}
      <select name="byPrice" onChange={onSortingChange}>
        <option value="sortByCreated↑">show new first</option>
        <option value="sortByCreated↓">show old first</option>
        <option value="sortByPrice↑">show dy price ↑</option>
        <option value="sortByPrice↓">show dy price ↓</option>
        <option value="sortByUpdated↑">show recently updated first</option>
        <option value="sortByCreated↓">show lately updated first</option>
      </select>
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
