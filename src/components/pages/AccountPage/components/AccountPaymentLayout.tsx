import { FC, useEffect, useMemo } from "react";
import { isNil } from "lodash";
import { inject, observer } from "mobx-react";
import { Spin } from "antd";

import AccountPayment from "./AccountPayment";
import AccountNoData from "./AccountNoData";
import AccountLoader from "./AccountLoader";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";

const AccountPaymentLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userCardsData, userCardsDataFetching, getUserCardsData } =
            authStore;

        useEffect(() => {
            if (isNil(userCardsData)) {
                getUserCardsData();
            }
        }, []);

        return useMemo(() => {
            if (userCardsDataFetching) {
                return <AccountLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isNil(userCardsData)) {
                return <AccountPayment pageClassPrefix={pageClassPrefix} />;
            }

            return <AccountNoData pageClassPrefix={pageClassPrefix} />;
        }, [userCardsData, userCardsDataFetching]);
    }),
);

export default AccountPaymentLayout;
