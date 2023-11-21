import { FC, useCallback, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";

import { H2 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AccountLayout from "../components/AccountLayout";
import AccountLoader from "../components/AccountLoader";
import AccountNoData from "../components/AccountNoData";
import AccountSectionWrapper from "../components/AccountSectionWrapper";
import AccountOrders from "./components/AccountOrders";
import Segmented from "@components/globalComponents/Segmented";

import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { TStore } from "@globalTypes/storeTypes";
import { SegmentedLabeledOption } from "antd/lib/segmented";
import { notImplemented } from "@helpers/notImplemented";
import { ESegmentedOptionsNames } from "../types";

const AccountOrdersPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { authStore } = store as IRoot;
        const {
            userOrdersData,
            userOrdersDataFetching,
            getUserOrdersData,
            isAuthorized,
        } = authStore;
        const classPrefix = "account-orders-page";

        useEffect(() => {
            if (isAuthorized) getUserOrdersData();
        }, [isAuthorized]);

        const orderSegmentedOptions: SegmentedLabeledOption[] = [
            {
                value: ESegmentedOptionsNames.all,
                label: "All Orders",
            },
            {
                value: ESegmentedOptionsNames.transit,
                label: "In Transit",
            },
            {
                value: ESegmentedOptionsNames.inProgress,
                label: "In Progress",
            },
            {
                value: ESegmentedOptionsNames.completed,
                label: "Completed",
            },
        ];

        const handleSegmentChange = useCallback(
            (val: ESegmentedOptionsNames) => {
                const ordersReqParams =
                    val === ESegmentedOptionsNames.all ? undefined : val;

                getUserOrdersData(ordersReqParams);
            },
            [],
        );

        const content = () => {
            if (userOrdersDataFetching) {
                return <AccountLoader />;
            }

            if (!isNil(userOrdersData)) {
                return <AccountOrders pageClassPrefix={classPrefix} />;
            }

            return <AccountNoData />;
        };

        return (
            <AccountLayout pageClassPrefix={classPrefix}>
                <div className={`${classPrefix}_wrapper`}>
                    <H2>Your Orders</H2>
                    <AccountSectionWrapper
                        className={`${classPrefix}_section-wrapper`}
                    >
                        <Segmented
                            options={orderSegmentedOptions}
                            className={`${classPrefix}_segmented`}
                            onChange={(value) => {
                                handleSegmentChange(
                                    value as ESegmentedOptionsNames,
                                );
                            }}
                        />
                        {content()}
                    </AccountSectionWrapper>
                    <div className={`${classPrefix}_actions`}>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => notImplemented()}
                        >
                            Manage other
                        </ButtonPrimary>
                    </div>
                </div>
            </AccountLayout>
        );
    }),
);

export default AccountOrdersPage;
