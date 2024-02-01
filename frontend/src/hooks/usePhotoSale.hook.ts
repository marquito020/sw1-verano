import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  photoSaleUrl,
  createPhotoSale,
  getAllClientPhotoSales,
  NewSalePhotoAndIdPayStripe,
} from "../services/photoSale.service";
import { PhotoSale } from "../interfaces/photoSale.interface";

type ResponsePhotoSaleType = {
  count: number;
};

const useCreatePhotoSale = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    ResponsePhotoSaleType,
    string,
    string,
    NewSalePhotoAndIdPayStripe
  >(photoSaleUrl, createPhotoSale);

  return { createPhotoSale: trigger, isMutating, error };
};

const useAllClientPhotoSales = (clientId: number) => {
  const { data, isLoading, error } = useSWR<PhotoSale[]>(
    `${photoSaleUrl}/client/${clientId}`,
    getAllClientPhotoSales
  );

  return { clientPhotoSales: data, isLoading, error };
};

export { useCreatePhotoSale, useAllClientPhotoSales };
