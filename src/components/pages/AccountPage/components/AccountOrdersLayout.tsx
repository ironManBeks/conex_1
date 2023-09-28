import { TSectionTypes } from "@globalTypes/sectionTypes";
import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { isNil } from "lodash";
import { SegmentedLabeledOption } from "antd/lib/segmented";

import { H2 } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AccountSectionWrapper from "./AccountSectionWrapper";
import AccountLoader from "./AccountLoader";
import AccountNoData from "./AccountNoData";
import AccountOrders from "./AccountOrders";

import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { ESegmentedOptionsNames } from "./../types";

const AccountOrdersLayout: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore } = store as IRoot;
        const { userOrdersData, userOrdersDataFetching, getUserOrdersData } =
            authStore;
        const classPrefix = `${pageClassPrefix}_order`;

        useEffect(() => {
            if (isNil(userOrdersData)) {
                getUserOrdersData(ESegmentedOptionsNames.all);
            }
        }, []);

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

        const handleSegmentChange = (val: ESegmentedOptionsNames) => {
            getUserOrdersData(val);
        };

        const content = useMemo(() => {
            if (userOrdersDataFetching) {
                return <AccountLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isNil(userOrdersData)) {
                return <AccountOrders pageClassPrefix={pageClassPrefix} />;
            }

            return <AccountNoData pageClassPrefix={pageClassPrefix} />;
        }, [userOrdersData, userOrdersDataFetching]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Your Orders</H2>
                <AccountSectionWrapper
                    pageClassPrefix={pageClassPrefix}
                    className={`${classPrefix}__section-wrapper`}
                >
                    <Segmented
                        options={orderSegmentedOptions}
                        className={`${classPrefix}__segmented`}
                        onChange={(value) => {
                            handleSegmentChange(
                                value as ESegmentedOptionsNames,
                            );
                        }}
                    />
                    {content}
                </AccountSectionWrapper>
                <div className={`${classPrefix}__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={() => notImplemented()}
                    >
                        Manage other
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default AccountOrdersLayout;
