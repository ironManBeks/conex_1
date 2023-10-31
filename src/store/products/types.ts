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
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};

export type TProductServiceResponse = {
    data: TProductService[];
} & TResponseMeta;

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

export type TSingleProductCharacteristics = {
    title: string;
    list: { title: string; value: string | number }[];
};

export enum ESingleProductOptionTypes {
    radio = "radio",
    colorPicker = "colorPicker",
    radioImage = "radioImage",
}

export type TReferenceProductOption<T extends ESingleProductOptionTypes, E> = {
    title: string;
    optionsName: string;
    type: T;
    list: E[];
};

export type TProductOptionBase = {
    label: string;
    value: string;
    disabled?: boolean;
};

export type TSingleProductOptions =
    | TReferenceProductOption<
          ESingleProductOptionTypes.radio,
          TProductOptionBase
      >
    | TReferenceProductOption<
          ESingleProductOptionTypes.colorPicker,
          TProductOptionBase & { color: string }
      >
    | TReferenceProductOption<
          ESingleProductOptionTypes.radioImage,
          TProductOptionBase & { src: string }
      >;

export type TSingleProduct = {
    id: number;
    title: string;
    article: number;
    description: string;
    images: { src: string }[];
    price: number;
    priceOld?: number;
    priceDiscount?: number;
    characteristics: TSingleProductCharacteristics[];
    isAvailable: boolean;
    options: TSingleProductOptions[];
    delivery: TProductDelivery[];
    payment: {
        name: string;
        icon: {
            alt: string;
            url: string;
        };
    }[];
};

export type TAdditionalProduct = {
    id: number;
    img: string;
    price: number;
    title: string;
    deliveryTime: string;
};

export type TAdditionalProductList = TAdditionalProduct[];

export interface IProductsStore {
    productList: TProductDoorData[];
    productListFetching: boolean;
    searchParams: TNullable<TSearchParams>;
    productService: TNullable<TProductServiceResponse>;
    productServiceFetching: boolean;
    productPrice: TNullable<TProductPrice>;
    productPriceFetching: boolean;
    productDelivery: TNullable<TProductDelivery[]>;
    productDeliveryFetching: boolean;
    additionalProductList: TNullable<TAdditionalProductList>;
    additionalProductsListFetching: boolean;
    //
    singleProduct: TNullable<TSingleProduct>;
    singleProductFetching: boolean;
    // -------------------------------------------------------------------------------
    setProductList: (data: TProductDoorData[]) => void;
    setProductListFetching: (value: boolean) => void;
    getProductListRequest: (
        value: TNullable<TSearchParams>,
    ) => Promise<AxiosResponse<TProductDoorData[]>>;
    //
    setProductService: (data: TNullable<TProductServiceResponse>) => void;
    setProductServiceFetching: (value: boolean) => void;
    getProductServiceRequest: () => Promise<
        AxiosResponse<TProductServiceResponse>
    >;
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
    setSingleProduct: (data: TNullable<TSingleProduct>) => void;
    getSingleProduct: (id: string) => Promise<AxiosResponse<TSingleProduct>>;
    setSingleProductFetching: (value: boolean) => void;
    //
    setAdditionalProductList: (data: TNullable<TAdditionalProductList>) => void;
    getAdditionalProductList: (
        id: string,
    ) => Promise<AxiosResponse<TAdditionalProductList>>;
    setAdditionalProductListFetching: (value: boolean) => void;
    //
    setSearchParams: (value: TNullable<TSearchParams>) => void;
}
