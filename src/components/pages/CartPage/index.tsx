import { FC } from "react";
import { inject, observer } from "mobx-react";

import OrderSettings from "@components/order/OrderSettings";
import OrderLayout from "@components/order/OrderLayout";
import CartList from "./components/CartList";

import { TStore } from "@globalTypes/storeTypes";

const CartPage: FC<TStore> = inject("store")(
    observer(() => {
        const classPrefix = "cart-page";

        return (
            <OrderLayout
                leftSideContent={<CartList pageClassPrefix={classPrefix} />}
                rightSideContent={
                    <OrderSettings
                        pageClassPrefix={classPrefix}
                        placement="cart"
                    />
                }
                title="Cart"
                pageClassPrefix={classPrefix}
            />
        );
    }),
);

export default CartPage;
