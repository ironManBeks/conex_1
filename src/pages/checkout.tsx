import { FC } from "react";

import HeadMeta from "@components/segments/HeadMeta";
import CheckoutPage from "@components/pages/CheckoutPage";

const CheckoutPageLayout: FC = () => {
    return (
        <>
            <HeadMeta title="Checkout" />
            <CheckoutPage />
        </>
    );
};

export default CheckoutPageLayout;
