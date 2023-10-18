import { enableStaticRendering } from "mobx-react";

import { IRoot } from "@store/store";
import { CommonStore } from "./common";
import { AuthStore } from "./auth";
import { ProductsStore } from "./products";
import { BuilderStore } from "./builder";
import { ContactStore } from "./contact";
import { OrderStore } from "./order";

const isServer = typeof window === "undefined";
enableStaticRendering(isServer);

let store: IRoot | null = null;

export default function initializeStore(): IRoot {
    if (isServer) {
        return {
            commonStore: new CommonStore(),
            productsStore: new ProductsStore(),
            authStore: new AuthStore(),
            builderStore: new BuilderStore(),
            contactStore: new ContactStore(),
            orderStore: new OrderStore(),
        };
    }
    if (store === null) {
        store = {
            commonStore: new CommonStore(),
            productsStore: new ProductsStore(),
            authStore: new AuthStore(),
            builderStore: new BuilderStore(),
            contactStore: new ContactStore(),
            orderStore: new OrderStore(),
        };
    }

    return store;
}
