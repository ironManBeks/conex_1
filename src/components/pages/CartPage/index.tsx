import { FC } from "react";

import OrderSettings from "@components/order/OrderSettings";
import OrderLayout from "@components/order/OrderLayout";
import CartList from "./components/CartList";

const CartPage: FC = () => {
    const classPrefix = "cart-page";

    return (
        <OrderLayout
            leftSideContent={<CartList pageClassPrefix={classPrefix} />}
            rightSideContent={
                <OrderSettings pageClassPrefix={classPrefix} placement="cart" />
            }
            title="Cart"
            pageClassPrefix={classPrefix}
        />
    );
};

export default CartPage;
