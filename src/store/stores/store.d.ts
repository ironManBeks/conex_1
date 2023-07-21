import { ICommonStore } from "./common/types";
import { IProductsStore } from "./products/types";

export interface IRoot {
    commonStore: ICommonStore;
    productsStore: IProductsStore;
}
