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

export interface IProductsStore {
    productList: TProductDoorData[];
    setProductList: (data: TProductDoorData[]) => void;
    productListFetching: boolean;
    setProductListFetching: (value: boolean) => void;
    getProductListRequest: (value: string) => void;
}
