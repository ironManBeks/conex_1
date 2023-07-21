import { IRoot } from "./store";

import { CommonStore } from "./common";
import { ProductsStore } from "./products";

import { ICommonStore } from "./common/types";
import { IProductsStore } from "./products/types";

export class RootStore implements IRoot {
    commonStore: ICommonStore;
    productsStore: IProductsStore;

    constructor() {
        this.commonStore = new CommonStore();
        this.productsStore = new ProductsStore();
    }
}
