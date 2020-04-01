// @flow
import React, { useState, useEffect } from 'react';

// $FlowFixMe;
import { useStoreon } from 'storeon/react';
import SingleListing from './SingleListing';

const LISTINGS_PER_PAGE = 2;

function createPagesArray(ids) {
  return Array.from({
    length: Math.ceil(ids.length / LISTINGS_PER_PAGE),
  });
}

function mapSortingOrderToDispatch(sortingOrder) {
  const type = sortingOrder.slice(0, -1);
  const direction = sortingOrder.slice(-1);
  return [type, direction];
}

type Store = {
  dispatch: Function,
  ids: string[],
  listingsMap: ListingMap,
};

function ListingsList() {
  const { dispatch, ids, listingsMap } = useStoreon<Store>(
    'ids',
    'listingsMap',
  );

  const [pages, setPages] = useState(createPagesArray(ids));
  const [selectedPage, selectPage] = useState(0);

  function createListingsArray() {
    return ids
      .slice(
        0 + selectedPage * LISTINGS_PER_PAGE,
        LISTINGS_PER_PAGE + selectedPage * LISTINGS_PER_PAGE,
      )
      .map((id) => listingsMap[id]);
  }

  const [listings, setListings] = useState(() => createListingsArray());

  useEffect(() => {
    setPages(() => createPagesArray(ids));
    setListings(() => createListingsArray());
  }, [ids, selectedPage, listingsMap]);

  function onSortingChange(event) {
    const sortingOrder = event.target.value;
    const [type, direction] = mapSortingOrderToDispatch(sortingOrder);
    dispatch(type, direction);
  }

  return (
    <div className="column-flex mt-6">
      {ids.length > 1 && (
        <div className="flex flex-row pt-4 pb-4 items-center md:justify-end">
          <p className="font-semibold pr-1">Show</p>
          <select
            name="byPrice"
            onChange={onSortingChange}
            className="flex-grow md:flex-grow-0 border"
          >
            <option value="sortByCreated↑">new first</option>
            <option value="sortByCreated↓">old first</option>
            <option value="sortByPrice↑">dy price ↑</option>
            <option value="sortByPrice↓">dy price ↓</option>
            <option value="sortByUpdated↑">recently updated first</option>
            <option value="sortByCreated↓">lately updated first</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {listings.map((listing) => (
          <SingleListing listing={listing} key={`listing-${listing.id}`} />
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 pt-8">
        {pages.length > 1 &&
          pages.map((_, index) => (
            <button
              type="button"
              key={`page-${index + 1}`}
              onClick={() => selectPage(index)}
              className={
                index === selectedPage
                  ? 'cursor-default'
                  : 'border cursor-pointer'
              }
              disabled={index === selectedPage}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
}

export default ListingsList;
