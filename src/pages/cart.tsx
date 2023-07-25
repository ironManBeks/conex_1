import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import CartPage from "@components/pages/CartPage";

const CartPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Cart" />
            <CartPage />
        </>
    );
};

export default CartPageLayout;
