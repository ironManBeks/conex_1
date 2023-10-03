import { TNullable } from "@globalTypes/commonTypes";
import { AxiosResponse } from "axios";

export type TProductDoorData = {
    id: string;
    title: string;
    material: string;
    size: string;
    color: string;
    description: string;
    priceOld: number;
    priceNew: number;
    priceCurrency: string;
    src: string;
    deliveryStatus: string;
};

export type TProductCartData = {
    quantity: number;
} & TProductDoorData;

export type TSearchParams = {
    text: string;
};

export interface IProductsStore {
    productList: TProductDoorData[];
    productListFetching: boolean;
    searchParams: TNullable<TSearchParams>;
    setProductList: (data: TProductDoorData[]) => void;
    setProductListFetching: (value: boolean) => void;
    getProductListRequest: (
        value: TNullable<TSearchParams>,
    ) => Promise<AxiosResponse<TProductDoorData[]>>;
    setSearchParams: (value: TNullable<TSearchParams>) => void;
}
