import { FC } from "react";
import { inject, observer } from "mobx-react";

import OrderLayout from "@components/order/OrderLayout";
import OrderSettings from "../../order/OrderSettings";
import CheckoutForm from "./components/CheckoutForm";

import { TStore } from "@globalTypes/storeTypes";

const CheckoutPage: FC<TStore> = inject("store")(
    observer(() => {
        const classPrefix = "checkout-page";

        return (
            <OrderLayout
                leftSideContent={<CheckoutForm pageClassPrefix={classPrefix} />}
                rightSideContent={
                    <OrderSettings
                        pageClassPrefix={classPrefix}
                        placement="checkout"
                    />
                }
                title="Checkout"
                pageClassPrefix={classPrefix}
            />
        );
    }),
);

export default CheckoutPage;
