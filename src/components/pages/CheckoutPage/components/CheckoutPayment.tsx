import React, { FC } from "react";
import { inject, observer } from "mobx-react";
import dynamic from "next/dynamic";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import Spin from "@components/globalComponents/Spin";
import { TSessionsData } from "../types";

const CheckoutAdyenPayment = dynamic(() => import("./CheckoutAdyenPayment"), {
    loading: () => (
        <div className="component-preloader">
            <Spin size="large" />
        </div>
    ),
    ssr: false,
});

const CheckoutPayment: FC<
    TSectionTypes & {
        onAdyenPayBtnClick: (params: TSessionsData) => Promise<void>;
    }
> = inject("store")(
    observer(({ store, pageClassPrefix, onAdyenPayBtnClick }) => {
        const { authStore } = store as IRoot;
        const { userCardsDataFetching } = authStore;

        const classPrefix = `${pageClassPrefix}_payment`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Payment method*"
                fetching={userCardsDataFetching}
            >
                <div className={`${classPrefix}__adyen-container`}>
                    <CheckoutAdyenPayment
                        pageClassPrefix={pageClassPrefix}
                        onAdyenPayBtnClick={onAdyenPayBtnClick}
                    />
                </div>
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutPayment;
