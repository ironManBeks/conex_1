import { FC, useEffect, useMemo } from "react";
import { isNil } from "lodash";
import { inject, observer } from "mobx-react";

import { H2 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AccountSectionWrapper from "./AccountSectionWrapper";
import AccountPayment from "./AccountPayment";
import AccountNoData from "./AccountNoData";
import AccountLoader from "./AccountLoader";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";

const AccountPaymentLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, commonStore } = store as IRoot;
        const { userCardsData, userCardsDataFetching, getUserCardsData } =
            authStore;
        const { setModalCardBindingVisible } = commonStore;
        const classPrefix = `${pageClassPrefix}_payment`;

        useEffect(() => {
            if (isNil(userCardsData)) {
                getUserCardsData();
            }
        }, []);

        const content = useMemo(() => {
            if (userCardsDataFetching) {
                return <AccountLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isNil(userCardsData)) {
                return <AccountPayment pageClassPrefix={pageClassPrefix} />;
            }

            return <AccountNoData pageClassPrefix={pageClassPrefix} />;
        }, [userCardsData, userCardsDataFetching]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Payment methods</H2>
                <AccountSectionWrapper pageClassPrefix={pageClassPrefix}>
                    {content}
                </AccountSectionWrapper>
                <div className={`${classPrefix}__actions`}>
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
        );
    }),
);

export default AccountPaymentLayout;
