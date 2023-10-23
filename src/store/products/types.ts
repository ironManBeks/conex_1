import { TNullable } from "@globalTypes/commonTypes";
import { AxiosResponse } from "axios";
import { TResponseMeta } from "@globalTypes/requestTypes";

export type TProductDoorData = {
    id: string;
    title: string;
    description: string;
    priceOld: number;
    priceNew: number;
    src: string;
    deliveryStatus?: string;
    options: {
        title: string;
        value: string;
    }[];
};

export type TProductDataDTO = {
    id: string;
    count: number;
};

export type TProductCartData = {
    quantity: number;
} & TProductDoorData;

export type TSearchParams = {
    text: string;
};

export type TProductService = {
    id: string;
    value: string;
    title: string;
    price?: string;
};

export enum EProductPriceNames {
    additionalCharges = "additionalCharges",
    tax = "tax",
    total = "total",
    shippingCost = "shippingCost",
    discountCode = "discountCode",
    grandTotal = "grandTotal",
}

export type TProductPrice = {
    [EProductPriceNames.additionalCharges]: number;
    [EProductPriceNames.tax]: number;
    [EProductPriceNames.total]: number;
    [EProductPriceNames.grandTotal]: number;
    [EProductPriceNames.shippingCost]?: number;
    [EProductPriceNames.discountCode]?: number;
};

export type TProductPriceParams = {
    products: TProductDataDTO[];
    discountCode?: string;
    address?: string;
};

export type TProductDelivery = {
    id: number;
    name: string;
    period: string;
    price: number;
    icon: {
        alt: string;
        url: string;
    };
};

export type TGetProductDeliveryResponse = {
    data: TProductDelivery[];
} & TResponseMeta;

export interface IProductsStore {
    productList: TProductDoorData[];
    productListFetching: boolean;
    searchParams: TNullable<TSearchParams>;
    productService: TNullable<TProductService[]>;
    productServiceFetching: boolean;
    productPrice: TNullable<TProductPrice>;
    productPriceFetching: boolean;
    productDelivery: TNullable<TProductDelivery[]>;
    productDeliveryFetching: boolean;
    //
    setProductList: (data: TProductDoorData[]) => void;
    setProductListFetching: (value: boolean) => void;
    getProductListRequest: (
        value: TNullable<TSearchParams>,
    ) => Promise<AxiosResponse<TProductDoorData[]>>;
    //
    setProductService: (data: TNullable<TProductService[]>) => void;
    setProductServiceFetching: (value: boolean) => void;
    getProductServiceRequest: () => Promise<AxiosResponse<TProductService[]>>;
    //
    setProductPrice: (data: TNullable<TProductPrice>) => void;
    setProductPriceFetching: (value: boolean) => void;
    getProductPriceRequest: (
        params: TProductPriceParams,
    ) => Promise<AxiosResponse<TProductPrice>>;
    //
    setProductDelivery: (data: TNullable<TProductDelivery[]>) => void;
    setProductDeliveryFetching: (value: boolean) => void;
    getProductDeliveryRequest: () => Promise<
        AxiosResponse<TGetProductDeliveryResponse>
    >;
    //
    setSearchParams: (value: TNullable<TSearchParams>) => void;
    adyenSession: any;
}
