import { createStoreon } from "storeon";
import { storeonDevtools } from "storeon/devtools";

import { nanoid } from "nanoid";

function sortWithDirection(direction, l, r) {
  return direction === "↑" ? l < r : l > r;
}

let listings = store => {
  store.on("@init", () => ({
    ids: [],
    listingsMap: {}
  }));
  store.on("create", ({ ids, listingsMap }, listing) => {
    const id = nanoid();
    return {
      ids: [id, ...ids],
      listingsMap: {
        ...listingsMap,
        [id]: { ...listing, id, createdAt: Date.now() }
      }
    };
  });
  store.on("delete", ({ ids, listingsMap }, id) => ({
    ids: [...ids.filter(i => i !== id)],
    listingsMap: { ...listingsMap, [id]: undefined }
  }));
  store.on("update", ({ listingsMap }, listing) => ({
    listingsMap: {
      ...listingsMap,
      [listing.id]: {
        ...listingsMap[listing.id],
        ...listing,
        updatedAt: Date.now()
      }
    }
  }));
  store.on("sortByPrice", ({ ids, listingsMap }, direction) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          direction,
          listingsMap[idl].price,
          listingsMap[idr].price
        )
      )
    ]
  }));
  store.on("sortByCreated", ({ ids, listingsMap }, direction) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          direction,
          listingsMap[idl].createdAt,
          listingsMap[idr].createdAt
        )
      )
    ]
  }));
  store.on("sortByUpdated", ({ ids, listingsMap }) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          direction,
          listingsMap[idl]?.updatedAt ?? listingsMap[idl].createdAt,
          listingsMap[idr]?.updatedAt ?? listingsMap[idr].createdAt
        )
      )
    ]
  }));
};

let idToEdit = store => {
  store.on("@init", () => ({
    idToEdit: null
  }));
  store.on("edit", ({ idToEdit }, id) => ({
    idToEdit: id
  }));
  store.on("resetIdToEdit", () => ({
    idToEdit: null
  }));
};

export const store = createStoreon([
  listings,
  idToEdit,
  process.env.NODE_ENV !== "production" && storeonDevtools
]);
