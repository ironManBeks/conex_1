import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";

import { H2 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AccountLayout from "../components/AccountLayout";
import AccountLoader from "../components/AccountLoader";
import AccountNoData from "../components/AccountNoData";
import AccountSectionWrapper from "../components/AccountSectionWrapper";
import AccountPayment from "./components/AccountPayment";

import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";

const AccountPaymentPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { authStore, commonStore } = store as IRoot;
        const { userCardsData, userCardsDataFetching, getUserCardsData } =
            authStore;
        const { setModalCardBindingVisible } = commonStore;
        const classPrefix = "account-payment-page";

        useEffect(() => {
            if (isNil(userCardsData)) {
                getUserCardsData();
            }
        }, []);

        const content = () => {
            if (userCardsDataFetching) {
                return <AccountLoader />;
            }

            if (!isNil(userCardsData)) {
                return <AccountPayment pageClassPrefix={classPrefix} />;
            }

            return <AccountNoData />;
        };

        return (
            <AccountLayout pageClassPrefix={classPrefix}>
                <div className={`${classPrefix}_wrapper`}>
                    <H2>Payment methods</H2>
                    <AccountSectionWrapper>{content()}</AccountSectionWrapper>
                    <div className={`${classPrefix}_actions`}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => {
                                setModalCardBindingVisible(true);
                            }}
                        >
                            Add new card
                        </ButtonPrimary>
                    </div>
                </div>
            </AccountLayout>
        );
    }),
);

export default AccountPaymentPage;
