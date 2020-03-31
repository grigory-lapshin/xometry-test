// @flow
import React from "react";
import ReactDOM from "react-dom";

// $FlowFixMe
import { useStoreon } from "storeon/react";

type Props = {
  listing: Listing
};

function SingleListing(props: Props) {
  const {
    listing: { id, title, description, imageURL, price, createdAt, updatedAt }
  } = props;

  const { dispatch } = useStoreon("idToEdit");

  function editListing() {
    dispatch("edit", id);
  }

  function deleteListing() {
    dispatch("delete", id);
  }

  return (
    <div>
      <span>{`${id}-${title}-${description}-${imageURL}-${price}-${createdAt}-${updatedAt}`}</span>
      <button onClick={editListing}>edit</button>
      <button onClick={deleteListing}>delete</button>
    </div>
  );
}

export default SingleListing;
