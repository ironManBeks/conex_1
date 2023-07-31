import { makeAutoObservable, observable } from "mobx";

import { IProductsStore, TProductDoorData } from "./types";
import { ProductSearchListDataMockup } from "../../../mockups/ProductSearchListDataMockup";

export class ProductsStore implements IProductsStore {
    productList: TProductDoorData[] = [];
    productListFetching = true;

    constructor() {
        makeAutoObservable(this, {
            productList: observable,
            productListFetching: observable,
        });
    }

    getProductListRequest = (searchParams: string): void => {
        console.log("searchParams", searchParams);
        setTimeout(() => {
            this.setProductList(ProductSearchListDataMockup);
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
