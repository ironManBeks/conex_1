import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";

import {
    IProductsStore,
    TAdditionalProductList,
    TGetProductDeliveryResponse,
    TProductDelivery,
    TProductDoorData,
    TProductServiceResponse,
    TSearchParams,
    TSingleProduct,
} from "./types";
import { TNullable } from "@globalTypes/commonTypes";
import axiosInstance from "../../api/api";

import { ProductSearchListDataMockup } from "../../mockups/ProductSearchListDataMockup";
import { showAxiosNotificationError } from "@helpers/errorsHelper";
import { SingleProductMockup } from "../../mockups/SingleProductMockup";
import { AdditionalProductListMockup } from "src/mockups/AdditionalProductListMockup";

export class ProductsStore implements IProductsStore {
    productList: TProductDoorData[] = [];
    searchParams: TNullable<TSearchParams> = null;
    productListFetching = true;
    productService: TNullable<TProductServiceResponse> = null;
    productServiceFetching = true;
    productDelivery: TNullable<TProductDelivery[]> = null;
    productDeliveryFetching = true;
    singleProduct: TNullable<TSingleProduct> = null;
    singleProductFetching = true;
    additionalProductList: TNullable<TAdditionalProductList> = null;
    additionalProductsListFetching = true;

    constructor() {
        makeAutoObservable(this);
    }

    // -------------------------------------------------------------------------------
    setProductList = (data: TProductDoorData[]): void => {
        this.productList = data;
    };

    setProductListFetching = (value: boolean): void => {
        this.productListFetching = value;
    };

    setProductService = (data: TNullable<TProductServiceResponse>): void => {
        this.productService = data;
    };
    setProductServiceFetching = (value: boolean): void => {
        this.productServiceFetching = value;
    };

    setSearchParams = (value: TNullable<TSearchParams>): void => {
        this.searchParams = value;
    };

    setProductDelivery = (data: TNullable<TProductDelivery[]>): void => {
        this.productDelivery = data;
    };

    setProductDeliveryFetching = (value: boolean): void => {
        this.productDeliveryFetching = value;
    };

    setSingleProduct = (data: TNullable<TSingleProduct>): void => {
        this.singleProduct = data;
    };

    setSingleProductFetching = (value: boolean): void => {
        this.singleProductFetching = value;
    };

    setAdditionalProductList = (
        data: TNullable<TAdditionalProductList>,
    ): void => {
        this.additionalProductList = data;
    };

    setAdditionalProductListFetching = (value: boolean): void => {
        this.additionalProductsListFetching = value;
    };

    // -------------------------------------------------------------------------------

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
        AxiosResponse<TProductServiceResponse>
    > => {
        this.setProductServiceFetching(true);
        return axiosInstance
            .get("/extras", { headers: { Authorization: "false" } })
            .then((response: AxiosResponse<TProductServiceResponse>) => {
                const { data } = response;
                this.setProductService(data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setProductServiceFetching(false);
            });
    };

    getProductDeliveryRequest = (): Promise<
        AxiosResponse<TGetProductDeliveryResponse>
    > => {
        this.setProductDeliveryFetching(true);
        return axiosInstance
            .get("/delivery-companies", {
                headers: { Authorization: "false" },
            })
            .then((response: AxiosResponse<TGetProductDeliveryResponse>) => {
                const { data } = response;
                this.setProductDelivery(data.data);
                return response;
            })
            .catch((err) => {
                showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                setTimeout(() => {
                    this.setProductDeliveryFetching(false);
                }, 300);
            });
    };

    getSingleProduct = (id: string): Promise<AxiosResponse<TSingleProduct>> => {
        this.setSingleProductFetching(true);
        return axiosInstance
            .get(`/product/${id}`)
            .then((response: AxiosResponse<TSingleProduct>) => {
                const { data } = response;
                this.setSingleProduct(data);
                return response;
            })
            .catch((err) => {
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setSingleProduct(SingleProductMockup);
                setTimeout(() => {
                    this.setSingleProductFetching(false);
                }, 100);
            });
    };

    getAdditionalProductList = (
        id: string,
    ): Promise<AxiosResponse<TAdditionalProductList>> => {
        this.setAdditionalProductListFetching(true);
        return axiosInstance
            .get(`/additional-products/${id}`)
            .then((response: AxiosResponse<TAdditionalProductList>) => {
                const { data } = response;
                this.setAdditionalProductList(data);
                return response;
            })
            .catch((err) => {
                // showAxiosNotificationError(err);
                throw err;
            })
            .finally(() => {
                this.setAdditionalProductList(AdditionalProductListMockup);
                setTimeout(() => {
                    this.setAdditionalProductListFetching(false);
                }, 300);
            });
    };
}
