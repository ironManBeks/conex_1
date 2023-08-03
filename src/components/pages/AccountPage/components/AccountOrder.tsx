import { FC, useState } from "react";
import { SegmentedLabeledOption } from "antd/lib/segmented";

import { H2 } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TAccountOrderItem } from "@components/pages/AccountPage/types";
import AccountOrderItem from "./AccountOrderItem";
import { Empty } from "antd";

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
            orderPlaced: "04.06.2023 4:34 pm Est",
            orderProcessed: "04.06.2023 4:34 pm Est",
            manufacturing: "04.06.2023 4:34 pm Est",
            shipped: "04.06.2023 4:34 pm Est",
            deliveryWillCompleted: "04.06.2023 4:34 pm Est",
            address: "Brooklyn, NY 23409",
            status: "In transit",
        },
        {
            id: "12",
            orderNumber: "XR-685069051230596123",
            orderPlaced: "04.06.2023 4:34 pm Est",
            orderProcessed: "04.06.2023 4:34 pm Est",
            manufacturing: "04.06.2023 4:34 pm Est",
            shipped: "04.06.2023 4:34 pm Est",
            deliveryWillCompleted: "04.06.2023 4:34 pm Est",
            address: "Brookly1123123123, NY123123 23409123123",
            status: "Intransit123",
        },
        {
            id: "13",
            orderNumber: "XR-123",
            orderPlaced: "04.06.2023 4:34 pm Est",
            orderProcessed: "04.06.2023 4:34 pm Est",
            manufacturing: "04.06.2023 4:34 pm Est",
            shipped: "04.06.2023 4:34 pm Est",
            deliveryWillCompleted: "04.06.2023 4:34 pm Est",
            address: "123, 123 123",
            status: "123",
        },
    ],
    [ESegmentedOptionsNames.inProgress]: [
        {
            id: "21",
            orderNumber: "XR-11111111",
            orderPlaced: "04.06.2023 4:34 pm Est",
            orderProcessed: "04.06.2023 4:34 pm Est",
            manufacturing: "04.06.2023 4:34 pm Est",
            shipped: "04.06.2023 4:34 pm Est",
            deliveryWillCompleted: "04.06.2023 4:34 pm Est",
            address: "Brooklyn, NY 11111",
            status: "stop",
        },
        {
            id: "212",
            orderNumber: "XR-22222qwdwqeq",
            orderPlaced: "04.06.2023 4:34 pm Est",
            orderProcessed: "04.06.2023 4:34 pm Est",
            manufacturing: "04.06.2023 4:34 pm Est",
            shipped: "04.06.2023 4:34 pm Est",
            deliveryWillCompleted: "04.06.2023 4:34 pm Est",
            address: "Brookly1123123123, NY123123 23409123123",
            status: "Intransit123",
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
                            classPrefix={classPrefix}
                            id={item.id}
                            orderNumber={item.orderNumber}
                            orderPlaced={item.orderPlaced}
                            orderProcessed={item.orderProcessed}
                            manufacturing={item.manufacturing}
                            shipped={item.shipped}
                            deliveryWillCompleted={item.deliveryWillCompleted}
                            address={item.address}
                            status={item.status}
                        />
                    ))
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    );
};

export default AccountOrder;
