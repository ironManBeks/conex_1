import {
    EAccountOrderMoneyStatus,
    EAccountOrderStatusTimelapse,
    TSingleOrderData,
} from "@store/auth/types";

export const AccountSingleOrderMockup: TSingleOrderData = {
    id: 1,
    orderNumber: "XR-685069050596",
    dateOfOrder: "8 august",
    orderAddress: "Brooklyn, NY 23409",
    moneyStatus: EAccountOrderMoneyStatus.processed,
    paymentMethod: "Direct bank transfer",
    total: 1029.6,
    subtotal: 1287,
    details: [
        {
            label: "Material",
            value: "12mm Phenolic Mesh Plywood",
        },
        {
            label: "Shipping",
            value: "Collection, Collection, Collection, Collection, Collection, Collection",
        },
    ],
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
};
