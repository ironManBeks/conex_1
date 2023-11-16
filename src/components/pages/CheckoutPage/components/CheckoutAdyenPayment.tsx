import React, { FC, useEffect, useRef } from "react";
import { Fetcher } from "swr";
import useSWRImmutable from "swr/immutable";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";

import { PaymentCompleteResponse, SessionData } from "../../../order/types";
import Spin from "@components/globalComponents/Spin";
import { ORDER_PAGE_CLASSPREFIX } from "../../../order/consts";
import { showNotification } from "@helpers/notificarionHelper";
import { P } from "@components/Text";
import { inject, observer } from "mobx-react";
import { IRoot } from "@store/store";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EOrderCartNames } from "@store/order/types";

const CheckoutAdyenPayment = ({
    pageClassPrefix,
    onAdyenPayBtnClick,
}: {
    pageClassPrefix: string;
    onAdyenPayBtnClick: () => Promise<void>;
}) => {
    return (
        <div id="payment-page">
            <div className="container">
                <Checkout
                    onAdyenPayBtnClick={onAdyenPayBtnClick}
                    pageClassPrefix={pageClassPrefix}
                />
            </div>
        </div>
    );
};

const fetcher: Fetcher<SessionData, string> = (...args) =>
    fetch(...args).then((res) => res.json());

const Checkout: FC<
    TSectionTypes & { onAdyenPayBtnClick: () => Promise<void> }
> = inject("store")(
    observer(({ store, onAdyenPayBtnClick }) => {
        const { orderStore } = store as IRoot;
        const paymentContainer = useRef(null);
        const { orderCart } = orderStore;
        const { data: session, error } = useSWRImmutable(
            `/api/session?price=${orderCart?.[EOrderCartNames.amount]}`,
            fetcher,
        );

        useEffect(() => {
            let ignore = false;

            if (!session || !paymentContainer.current) {
                return;
            }

            const config = {
                environment: "TEST",
                clientKey: "test_XJ2JHGUGPNCLZERNNHHEXEQYGUGP37NR",
            };

            const createCheckout = async () => {
                const checkout = await AdyenCheckout({
                    ...config,
                    session,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    onPaymentCompleted: (response: PaymentCompleteResponse) => {
                        onAdyenPayBtnClick();
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
                <div className="component-preloader">
                    <Spin size="large" />
                </div>
            );

        return (
            <div className="payment-container">
                <div ref={paymentContainer} className="payment"></div>
            </div>
        );
    }),
);

export default CheckoutAdyenPayment;
