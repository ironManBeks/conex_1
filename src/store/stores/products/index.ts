import { makeAutoObservable, observable } from "mobx";

import { IProductsStore, TProductDoorData } from "./types";
import { ProductDoorListMockup } from "../../../mockups/ProductDoorListMockup";

export class ProductsStore implements IProductsStore {
    productList: TProductDoorData[] = [];
    productListFetching = true;

    constructor() {
        makeAutoObservable(this, {
            productList: observable,
            productListFetching: observable,
        });
    }

    getProductListRequest = (searchParams: string) => {
        setTimeout(() => {
            this.setProductList(ProductDoorListMockup);
            this.setProductListFetching(false);
        }, 1000);
    };

    setProductList = (data: TProductDoorData[]): void => {
        this.productList = data;
    };

    setProductListFetching = (value: boolean): void => {
        this.productListFetching = value;
    };
}
