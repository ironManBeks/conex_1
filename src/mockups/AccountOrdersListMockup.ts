import { ESegmentedOptionsNames } from "@components/pages/account/AccountPage/types";
import {
    EAccountOrderMoneyStatus,
    EAccountOrderStatus,
    EAccountOrderStatusTimelapse,
    TAccountOrderItem,
} from "@store/auth/types";

export const AccountOrdersMockup: Record<
    ESegmentedOptionsNames,
    TAccountOrderItem[]
> = {
    [ESegmentedOptionsNames.all]: [
        {
            id: 1,
            orderNumber: "XR-685069050596",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            moneyStatus: EAccountOrderMoneyStatus.processed,
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
            id: 12,
            orderNumber: "XR-685069051230596123",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
            statusTimelapse: [
                {
                    time: "Today at 4:34 pm",
                    status: EAccountOrderStatusTimelapse.done,
                    description: "You used your EUR balance",
                },
                {
                    time: "Your order has been delivered",
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
            id: 13,
            orderNumber: "XR-123",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
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
    [ESegmentedOptionsNames.transit]: [
        {
            id: 14,
            orderNumber: "XR-11111111",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
            orderStatus: EAccountOrderStatus.delivered,
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
            id: 212,
            orderNumber: "XR-22222qwdwqeq",
            dateOfOrder: "8 august",
            orderAddress: "Brooklyn, NY 23409",
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
    [ESegmentedOptionsNames.inProgress]: [],
    [ESegmentedOptionsNames.completed]: [],
};
