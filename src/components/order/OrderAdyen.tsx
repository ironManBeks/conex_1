import { FC, useEffect } from "react";
import paymentMethodsMock from "./paymentMethodsMock.json";

import AdyenCheckout from "@adyen/adyen-web";
import { ADYEN_WRAPPER_ID } from "@components/order/consts";

const OrderAdyen: FC = () => {
    return (
        <>
            <div style={{ border: "1px solid grey" }} />
            <div id="payment-page">
                <Checkout />
            </div>
        </>
    );
};

export default OrderAdyen;

const Checkout = () => {
    useEffect(() => {
        // Initialize Adyen payment form
        const configuration = {
            paymentMethodsResponse: paymentMethodsMock,
            clientKey: "test_GD3WJJNXCJGXLFDX6UITI27T5MKWWFD3",
            locale: "en-US",
            environment: "test",
        };

        const checkout = new AdyenCheckout(configuration);

        // Render the payment form
        const card = checkout.create("card");

        // Mount the card component to the container
        card?.mount(`#${ADYEN_WRAPPER_ID}`);

        return () => {
            // Cleanup if needed
            card?.unmount();
        };
    }, []);

    return (
        <div className="payment-container">
            <div id={ADYEN_WRAPPER_ID} />
        </div>
    );
};
