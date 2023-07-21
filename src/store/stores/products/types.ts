export type TProductDoorData = {
    id: string;
    title: string;
    material: string;
    size: string;
    color: string;
    description: string;
    priceOld: number;
    priceNew: number;
    src: string;
};

export interface IProductsStore {
    productList: TProductDoorData[];
    setProductList: (data: TProductDoorData[]) => void;
    productListFetching: boolean;
    setProductListFetching: (value: boolean) => void;
    getProductListRequest: (value: string) => void;
}
