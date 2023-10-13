import { TProductDelivery } from "@store/products/types";

export const ProductDeliveryCompanyMockup: TProductDelivery[] = [
    {
        id: "1",
        title: "FedEx",
        price: 23.99,
        deliveryFrom: 3,
        deliveryTo: 5,
        img: "/images/svg/delivery-fedex.svg",
        showTitle: false,
    },
    {
        id: "2",
        title: "UPS",
        price: 123.99,
        deliveryFrom: 3,
        deliveryTo: 5,
        img: "/images/svg/delivery-ups.svg",
        showTitle: true,
    },
    {
        id: "3",
        title: "USPS",
        price: 1234.99,
        deliveryFrom: 1,
        deliveryTo: 100,
        img: "/images/svg/delivery-usps.svg",
        showTitle: true,
    },
];
