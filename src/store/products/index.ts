import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import { IProductsStore, TProductDoorData, TSearchParams } from "./types";
import { ProductSearchListDataMockup } from "../../mockups/ProductSearchListDataMockup";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";

export class ProductsStore implements IProductsStore {
    productList: TProductDoorData[] = [];
    searchParams: TNullable<TSearchParams> = null;
    productListFetching = true;

    constructor() {
        makeAutoObservable(this);
    }

    getProductListRequest = (
        params: TNullable<TSearchParams>,
    ): Promise<AxiosResponse<TProductDoorData[]>> => {
        this.setProductListFetching(true);
        return axiosInstance
            .get("/product/", { params })
            .then((response: AxiosResponse<TProductDoorData[]>) => {
                // const { data } = response;
                // this.setProductList(data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setProductList(ProductSearchListDataMockup);
                this.setProductListFetching(false);
            });
    };

    setProductList = (data: TProductDoorData[]): void => {
        this.productList = data;
    };

    setProductListFetching = (value: boolean): void => {
        this.productListFetching = value;
    };

    setSearchParams = (value: TNullable<TSearchParams>): void => {
        this.searchParams = value;
    };
}
