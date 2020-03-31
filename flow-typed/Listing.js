//@flow
declare type Listing = {
  id: string,
  title: string,
  description: string,
  imageURL: string,
  price: number,
  createdAt: number,
  updatedAt: number
};

declare type ListingMap = { [id: string]: Listing };
