import { FC } from "react";
import { SegmentedLabeledOption } from "antd/lib/segmented";

import { H2, H4, H5, P } from "@components/Text";
import Segmented from "@components/globalComponents/Segmented";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TAccountOrderItem } from "@components/pages/AccountPage/types";
import AccountOrderItem from "./AccountOrderItem";

const orderListMockup: TAccountOrderItem[] = [
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
];

const AccountOrder: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_order`;
    const transitValue = 2;
    const inProgressValue = 3;
    const completedValue = 0;

    const generateOptionValue = (label: string, count: number): string => {
        return `${label}${count > 0 ? ` (${count})` : ""}`;
    };

    const orderSegmentedOptions: SegmentedLabeledOption[] = [
        {
            value: "transit",
            label: generateOptionValue("In Transit", transitValue),
        },
        {
            value: "inProgress",
            label: generateOptionValue("In Progress", inProgressValue),
        },
        {
            value: "completed",
            label: generateOptionValue("Completed", completedValue),
        },
    ];

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2>Your Orders</H2>
            <Segmented
                options={orderSegmentedOptions}
                className={`${classPrefix}__segmented`}
            />
            <div className={`${classPrefix}__list`}>
                {orderListMockup.map((item) => (
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
                ))}
            </div>
        </div>
    );
};

export default AccountOrder;
