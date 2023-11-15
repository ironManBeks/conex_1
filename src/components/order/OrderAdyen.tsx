import React, { useEffect, useRef } from "react";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

import { PaymentCompleteResponse, SessionData } from "./types";
import Spin from "@components/globalComponents/Spin";
import { ORDER_PAGE_CLASSPREFIX } from "./consts";
import { showNotification } from "@helpers/notificarionHelper";
import { P } from "@components/Text";

const OrderAdyen = () => {
    return (
        <div id="payment-page">
            <div className="container">
                <Checkout />
            </div>
        </div>
    );
};

const fetcher: Fetcher<SessionData, string> = (...args) =>
    fetch(...args).then((res) => res.json());

const Checkout = () => {
    const paymentContainer = useRef(null);
    const { data: session, error } = useSWRImmutable("/api/session", fetcher);

    useEffect(() => {
        let ignore = false;

        if (!session || !paymentContainer.current) {
            return;
        }

        const config = {
            environment: process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT,
            clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
        };

        const createCheckout = async () => {
            const checkout = await AdyenCheckout({
                ...config,
                session,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onPaymentCompleted: (response: PaymentCompleteResponse) => {
                    if (response.resultCode !== "Authorised") {
                        showNotification({
                            mainProps: {
                                type: "error",
                                message: (
                                    <>
                                        Unhandled payment result "
                                        {response.resultCode}!"
                                    </>
                                ),
                            },
                        });
                        return;
                    }
                },
                onError: (error: { message: string }) => {
                    showNotification({
                        mainProps: {
                            type: "error",
                            message: <>Error: {error.message}</>,
                        },
                    });
                },
            });

            // The 'ignore' flag is used to avoid double re-rendering caused by React 18 StrictMode
            // More about it here: https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
            if (paymentContainer.current && !ignore) {
                checkout.create("dropin").mount(paymentContainer.current);
            }
        };

        createCheckout();

        return () => {
            ignore = true;
        };
    }, [session]);

    if (error)
        return (
            <P className={`${ORDER_PAGE_CLASSPREFIX}_not-loaded-component`}>
                Component couldn't be loaded. Please try again later.
            </P>
        );
    if (!session)
        return (
            <div className={`${ORDER_PAGE_CLASSPREFIX}_preloader`}>
                <Spin size="large" />
            </div>
        );

    return (
        <div className="payment-container">
            <div ref={paymentContainer} className="payment"></div>
        </div>
    );
};

export default OrderAdyen;
