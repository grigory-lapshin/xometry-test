import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { nanoid } from 'nanoid';

// it is unusual to use ↑ or ↓ in code. It means ascending and descending order.
function sortWithDirection(order, l, r) {
  return order === '↑' ? l < r : l > r;
}

const listings = (store) => {
  store.on('@init', () => ({
    ids: [],
    listingsMap: {},
  }));
  store.on('create', ({ ids, listingsMap }, listing) => {
    const id = nanoid();
    return {
      ids: [id, ...ids],
      listingsMap: {
        ...listingsMap,
        [id]: { ...listing, id, createdAt: Date.now() },
      },
    };
  });
  store.on('delete', ({ ids, listingsMap }, id) => ({
    ids: [...ids.filter((i) => i !== id)],
    listingsMap: { ...listingsMap, [id]: undefined },
  }));
  store.on('update', ({ listingsMap }, listing) => ({
    listingsMap: {
      ...listingsMap,
      [listing.id]: {
        ...listingsMap[listing.id],
        ...listing,
        updatedAt: Date.now(),
      },
    },
  }));
  store.on('sortByPrice', ({ ids, listingsMap }, order) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          order,
          listingsMap[idl].price,
          listingsMap[idr].price,
        ),
      ),
    ],
  }));
  store.on('sortByCreated', ({ ids, listingsMap }, order) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          order,
          listingsMap[idl].createdAt,
          listingsMap[idr].createdAt,
        ),
      ),
    ],
  }));
  store.on('sortByUpdated', ({ ids, listingsMap }, order) => ({
    ids: [
      ...ids.sort((idl, idr) =>
        sortWithDirection(
          order,
          listingsMap[idl]?.updatedAt ?? listingsMap[idl].createdAt,
          listingsMap[idr]?.updatedAt ?? listingsMap[idr].createdAt,
        ),
      ),
    ],
  }));
};

const idToEdit = (store) => {
  store.on('@init', () => ({
    idToEdit: null,
  }));
  store.on('editId', (_, id) => ({
    idToEdit: id,
  }));
  store.on('resetIdToEdit', () => ({
    idToEdit: null,
  }));
};

export default createStoreon([
  listings,
  idToEdit,
  process.env.NODE_ENV !== 'production' && storeonDevtools,
]);
