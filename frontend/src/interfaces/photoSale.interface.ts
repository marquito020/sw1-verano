import { Photo } from "./photo.interface";

export enum StatePhotoSale {
  paid = "paid",
  unpaid = "unpaid",
}

export enum TypePhotoSale {
  digital = "digital",
  physical = "physical",
}

export interface PhotoSale {
  id?: number;
  total: number;
  dateTime: Date;
  methodOfPayment: string;
  type: TypePhotoSale;
  state: StatePhotoSale;
  clientId: number;
  photoId: number;
  photo: Photo;
}


export interface NewSalePhoto {
  clientId: number;
  photoPrice: number;
  photoId: number;
}
