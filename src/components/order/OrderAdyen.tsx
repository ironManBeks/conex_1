import { FC, useEffect, useRef } from "react";
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
    const dropinRef = useRef<HTMLDivElement>(null);

    async function initAdyenCheckout() {
        const configuration = {
            locale: "en_US",
            environment: "test",
            originKey: "YOUR_ORIGIN_KEY",
            paymentMethodsResponse: paymentMethodsMock,
            amount: {
                value: 1000,
                currency: "EUR",
            },
        };

        const checkout = await AdyenCheckout(configuration);

        // If you need to refer to the dropin externaly, you can save this inside a variable:
        // const dropin = checkout.create...
        checkout
            .create("dropin", {
                onSubmit: (state, dropin) => {
                    dropin.setStatus("loading");
                    console.log(state.data);
                },
            })
            .mount(dropinRef.current || ADYEN_WRAPPER_ID);
    }

    useEffect(() => {
        initAdyenCheckout();
    }, []);

    return (
        <div className="payment-container">
            <div ref={dropinRef} id={ADYEN_WRAPPER_ID} />
        </div>
    );
};
