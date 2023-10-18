import { ICommonStore } from "./common/types";
import { IProductsStore } from "./products/types";
import { IAuthStore } from "./auth/types";
import { IBuilderStore } from "./builder/types";
import { IContactStore } from "./contact/types";
import { IOrderStore } from "./order/types";

export interface IRoot {
    commonStore: ICommonStore;
    productsStore: IProductsStore;
    authStore: IAuthStore;
    builderStore: IBuilderStore;
    contactStore: IContactStore;
    orderStore: IOrderStore;
}
