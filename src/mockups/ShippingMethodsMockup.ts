import { TShippingMethod } from "@components/order/types";

export const ShippingMethodsMockup: TShippingMethod[] = [
    {
        isDefault: true,
        name: "Express Delivery",
        price: "$13.99",
        value: "expressDelivery",
    },
    {
        name: "QWE",
        price: "$3,99",
        value: "ups",
        dayFrom: 3,
        dayTo: 3,
        iconSrc: "https://picsum.photos/id/111/55/15",
    },
    {
        name: "QERTY",
        price: "$33,99",
        value: "fedex",
        dayFrom: 10,
        dayTo: 10,
        iconSrc: "https://picsum.photos/id/122/20/20",
    },
    {
        name: "QERTYQERTY",
        price: "$333,99",
        value: "usps",
        dayFrom: 100,
        dayTo: 100,
        iconSrc: "https://picsum.photos/id/123/200/300",
    },
];
