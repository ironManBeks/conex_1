import React, { FC, useEffect, useRef, useState } from "react";
import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { useFormContext } from "react-hook-form";

import Spin from "@components/globalComponents/Spin";
import { showNotification } from "@helpers/notificarionHelper";
import { inject, observer } from "mobx-react";
import { IRoot } from "@store/store";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EOrderCartNames } from "@store/order/types";

import { PaymentCompleteResponse } from "../../../order/types";
import { TSessionsData } from "../types";

const CheckoutAdyenPayment = ({
    pageClassPrefix,
    onAdyenPayBtnClick,
}: {
    pageClassPrefix: string;
    onAdyenPayBtnClick: (additionalData: TSessionsData) => void;
}) => {
    return (
        <div id="payment-page">
            <Checkout
                onAdyenPayBtnClick={onAdyenPayBtnClick}
                pageClassPrefix={pageClassPrefix}
            />
        </div>
    );
};

const Checkout: FC<
    TSectionTypes & {
        onAdyenPayBtnClick: (additionalData: TSessionsData) => void;
    }
> = inject("store")(
    observer(({ store, onAdyenPayBtnClick }) => {
        const { orderStore } = store as IRoot;
        const paymentContainer = useRef(null);
        const { orderCart, getPaymentSession, verifyPayment } = orderStore;
        const [session, setSession] = useState({ sessionData: "", id: "" });
        const canPayRef = useRef(false);

        const {
            formState: { isValid },
            trigger,
        } = useFormContext();

        useEffect(() => {
            // INFO: sometimes there is an error "getPayment is not a function", so I added it in condition
            if (
                orderCart?.[EOrderCartNames.amount] &&
                typeof getPaymentSession === "function"
            )
                getPaymentSession({
                    amount: orderCart[EOrderCartNames.amount] || 0,
                }).then(({ data }) =>
                    setSession({
                        sessionData: data.session.sessionData,
                        id: data.session.id,
                    }),
                );
        }, []);

        useEffect(() => {
            if (isValid) canPayRef.current = true;
        }, [isValid]);

        useEffect(() => {
            let ignore = false;

            if (!session.sessionData || !paymentContainer.current) {
                return;
            }

            const config = {
                environment: process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT,
                clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
            };

            const createCheckout = async () => {
                try {
                    const checkout = await AdyenCheckout({
                        ...config,
                        session,
                        beforeSubmit(state, element, actions) {
                            trigger();
                            if (canPayRef.current)
                                return actions.resolve(state);

                            return actions.reject();
                        },
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        onPaymentCompleted: (
                            response: PaymentCompleteResponse,
                        ) => {
                            onAdyenPayBtnClick({
                                sessionResult: response.sessionResult || "",
                                sessionId: session.id,
                            });
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
                            verifyPayment({
                                sessionId: session.id,
                                sessionResult: response.sessionResult || "",
                            });
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
                    // INFO: The 'ignore' flag is used to avoid double re-rendering caused by React 18 StrictMode
                    // More about it here: https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
                    if (paymentContainer.current && !ignore) {
                        checkout
                            .create("dropin")
                            .mount(paymentContainer.current);
                    }
                } catch (error) {
                    console.log({ error });
                }
            };

            createCheckout();

            return () => {
                ignore = true;
            };
        }, [session]);

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
