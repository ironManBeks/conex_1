import { FC, useState } from "react";
import { SegmentedLabeledOption } from "antd/lib/segmented";

import { H2 } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    EAccountOrderMoneyStatus,
    EAccountOrderStatus,
    EAccountOrderStatusTimelapse,
    TAccountOrderItem,
} from "@components/pages/AccountPage/types";
import AccountOrderItem from "./AccountOrderItem";
import { Empty } from "antd";
import AccountSectionWrapper from "./AccountSectionWrapper";

enum ESegmentedOptionsNames {
    transit = "transit",
    inProgress = "inProgress",
    completed = "completed",
}

const segmentAccountOrderMockup: Record<
    ESegmentedOptionsNames,
    TAccountOrderItem[]
> = {
    [ESegmentedOptionsNames.transit]: [
        {
            id: "1",
            orderNumber: "XR-685069050596",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.processed,
            moneyStatus: EAccountOrderMoneyStatus.delivered,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You set up your transfer",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Your money’s being processed",
                    status: EAccountOrderStatusTimelapse.processed,
                },
                {
                    time: "Error message",
                    status: EAccountOrderStatusTimelapse.failure,
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
            ],
        },
        {
            id: "12",
            orderNumber: "XR-685069051230596123",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
            moneyStatus: EAccountOrderMoneyStatus.processed,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.processed,
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
            ],
        },
        {
            id: "13",
            orderNumber: "XR-123",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
            moneyStatus: EAccountOrderMoneyStatus.processed,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.processed,
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
            ],
        },
    ],
    [ESegmentedOptionsNames.inProgress]: [
        {
            id: "21",
            orderNumber: "XR-11111111",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
            moneyStatus: EAccountOrderMoneyStatus.processed,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.processed,
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
            ],
        },
        {
            id: "212",
            orderNumber: "XR-22222qwdwqeq",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
            moneyStatus: EAccountOrderMoneyStatus.processed,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.processed,
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
                {
                    time: "Tomorrow at 9:12 am",
                    status: EAccountOrderStatusTimelapse.feature,
                    description: "Adam Smith receives your EUR",
                },
            ],
        },
    ],
    [ESegmentedOptionsNames.completed]: [],
};

const AccountOrder: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_order`;
    const [selectedSegment, setSelectedSegment] =
        useState<ESegmentedOptionsNames>(ESegmentedOptionsNames.transit);

    const generateOptionValue = (label: string, count: number): string => {
        return `${label}${count > 0 ? ` (${count})` : ""}`;
    };

    const getAccountOrderList = (value: ESegmentedOptionsNames): number => {
        return segmentAccountOrderMockup[value].length;
    };

    const orderSegmentedOptions: SegmentedLabeledOption[] = [
        {
            value: ESegmentedOptionsNames.transit,
            label: generateOptionValue(
                "In Transit",
                getAccountOrderList(ESegmentedOptionsNames.transit),
            ),
        },
        {
            value: ESegmentedOptionsNames.inProgress,
            label: generateOptionValue(
                "In Progress",
                getAccountOrderList(ESegmentedOptionsNames.inProgress),
            ),
        },
        {
            value: ESegmentedOptionsNames.completed,
            label: generateOptionValue(
                "Completed",
                getAccountOrderList(ESegmentedOptionsNames.completed),
            ),
        },
    ];

    const accountOrderList = (): TAccountOrderItem[] => {
        if (Object.values(ESegmentedOptionsNames).includes(selectedSegment)) {
            return segmentAccountOrderMockup[selectedSegment];
        }
        return [];
    };

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
                        setSelectedSegment(value as ESegmentedOptionsNames);
                    }}
                />
                <div className={`${classPrefix}__list`}>
                    {accountOrderList().length ? (
                        accountOrderList().map((item) => (
                            <AccountOrderItem
                                key={item.id}
                                wrapperClassPrefix={classPrefix}
                                id={item.id}
                                orderNumber={item.orderNumber}
                                dateOfOrder={item.dateOfOrder}
                                orderAddress={item.orderAddress}
                                orderStatus={item.orderStatus}
                                moneyStatus={item.moneyStatus}
                                statusTimelapse={item.statusTimelapse}
                            />
                        ))
                    ) : (
                        <Empty />
                    )}
                </div>
            </AccountSectionWrapper>
        </div>
    );
};

export default AccountOrder;
