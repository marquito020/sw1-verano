import { NewSalePhoto } from "../interfaces/photoSale.interface";
import { baseUrl } from "../constants/routes";

export const photoSaleUrl =  baseUrl + "api/photo-sale";

export type NewSalePhotoAndIdPayStripe = {
  dataPhotoSale: NewSalePhoto[];
  idPayStripe: string;
};

const createPhotoSale = async (
  url: string,
  { arg }: { arg: NewSalePhotoAndIdPayStripe }
) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

const getAllClientPhotoSales = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { createPhotoSale, getAllClientPhotoSales };
