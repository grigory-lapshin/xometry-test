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
  return (
    <div>
      <span>{`${id}-${title}-${description}-${imageURL}-${price}-${createdAt}-${updatedAt}`}</span>
    </div>
  );
}

export default SingleListing;
