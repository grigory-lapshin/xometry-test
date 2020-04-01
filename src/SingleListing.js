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
    listing: { id, title, description, picture, price, createdAt, updatedAt }
  } = props;

  const { dispatch } = useStoreon("idToEdit");

  function editListing() {
    dispatch("edit", id);
  }

  function deleteListing() {
    dispatch("delete", id);
  }

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 shadow-md rounded overflow-hidden">
      {/* {picture ? (
        <img
          src={URL.createObjectURL(picture)}
          className="h-48 w-full md:w-64 bg-gray-200 "
        />
      ) : ( */}
      <div
        className="h-48 w-full md:w-64  bg-gray-200 bg-contain bg-center bg-no-repeat"
        style={
          picture && { backgroundImage: `url(${URL.createObjectURL(picture)})` }
        }
      />
      {/* )} */}
      <div className="flex flex-col flex-grow justify-between ">
        <div className="flex flex-col items-stretch mb-4 md:mb-0 p-4">
          <div className="flex row-flex flex-no-wrap">
            <h2 className="flex-grow text-2xl pr-2">{title}</h2>
            <p className="text-2xl">{price + "$"}</p>
          </div>
          {description && <p>{description}</p>}
        </div>
        <div className=" flex xs:flex-row  justify-between">
          <button
            onClick={deleteListing}
            className="uppercase text-red-500 p-4 w-24"
          >
            delete
          </button>
          <button
            onClick={editListing}
            className="uppercase text-blue-500 p-4 w-24 text-right"
          >
            edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleListing;
