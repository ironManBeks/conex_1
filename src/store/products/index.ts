import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IProductsStore,
    TProductDoorData,
    TProductPrice,
    TProductPriceParams,
    TProductService,
    TSearchParams,
} from "./types";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { ProductSearchListDataMockup } from "../../mockups/ProductSearchListDataMockup";
import { ProductAdditionalServicesMockup } from "../../mockups/ProductAdditionalServicesMockup";
import { ProductPriceMockup } from "../../mockups/ProductPriceMockup";

export class ProductsStore implements IProductsStore {
    productList: TProductDoorData[] = [];
    searchParams: TNullable<TSearchParams> = null;
    productListFetching = true;
    productService: TNullable<TProductService[]> = null;
    productServiceFetching = true;
    productPrice: TNullable<TProductPrice> = null;
    productPriceFetching = true;

    constructor() {
        makeAutoObservable(this);
    }

    //---------------------------------------------------------------------
    setProductList = (data: TProductDoorData[]): void => {
        this.productList = data;
    };

    setProductListFetching = (value: boolean): void => {
        this.productListFetching = value;
    };

    setProductService = (data: TNullable<TProductService[]>): void => {
        this.productService = data;
    };
    setProductServiceFetching = (value: boolean): void => {
        this.productServiceFetching = value;
    };

    setSearchParams = (value: TNullable<TSearchParams>): void => {
        this.searchParams = value;
    };

    setProductPrice = (data: TNullable<TProductPrice>): void => {
        this.productPrice = data;
    };
    setProductPriceFetching = (value: boolean): void => {
        this.productPriceFetching = value;
    };

    //---------------------------------------------------------------------

    getProductListRequest = (
        params: TNullable<TSearchParams>,
    ): Promise<AxiosResponse<TProductDoorData[]>> => {
        this.setProductListFetching(true);
        return axiosInstance
            .get("/product/list", { params })
            .then((response: AxiosResponse<TProductDoorData[]>) => {
                // const { data } = response;
                // this.setProductList(data);
                return response;
            })
            .catch((err) => {
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setProductList(ProductSearchListDataMockup);
                this.setProductListFetching(false);
            });
    };

    getProductServiceRequest = (): Promise<
        AxiosResponse<TProductService[]>
    > => {
        this.setProductServiceFetching(true);
        return axiosInstance
            .get("/product/service")
            .then((response: AxiosResponse<TProductService[]>) => {
                // const { data } = response;
                // this.setProductService(data);
                return response;
            })
            .catch((err) => {
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setProductService(ProductAdditionalServicesMockup);
                this.setProductServiceFetching(false);
            });
    };

    getProductPrice = (
        params: TProductPriceParams,
    ): Promise<AxiosResponse<TProductPrice>> => {
        this.setProductPriceFetching(true);
        return axiosInstance
            .get("/product/price", { params })
            .then((response: AxiosResponse<TProductPrice>) => {
                // const { data } = response;
                // this.setProductService(data);
                return response;
            })
            .catch((err) => {
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                console.log("getProductPrice finally", params);
                const data = { ...ProductPriceMockup };
                if (params.discountCode) {
                    data.discountCode = 20;
                }
                if (params.address) {
                    data.shippingCost = 40;
                }
                this.setProductPrice(data);
                this.setProductPriceFetching(false);
            });
    };
}
