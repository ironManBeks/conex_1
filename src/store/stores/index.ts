import { IRoot } from "./store";

import { CommonStore } from "./common";
import { ProductsStore } from "./products";
import { AuthStore } from "./auth";

import { ICommonStore } from "./common/types";
import { IProductsStore } from "./products/types";
import { IAuthStore } from "./auth/types";

export class RootStore implements IRoot {
    commonStore: ICommonStore;
    productsStore: IProductsStore;
    authStore: IAuthStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.productsStore = new ProductsStore();
        this.authStore = new AuthStore();
    }
}
