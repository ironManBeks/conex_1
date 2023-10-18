import { TProductDelivery } from "@store/products/types";

export const ProductDeliveryCompanyMockup: TProductDelivery[] = [
    {
        id: 1,
        name: "FedEx",
        price: 23.99,
        period: "3-5 business days",
        icon: {
            url: "https://conexwest-doors.opserver.store/uploads/fedex_cf2870a982.svg",
            alt: "FedEx",
        },
    },
    {
        id: 2,
        name: "UPS",
        price: 33.99,
        period: "2-3 business days",
        icon: {
            url: "https://conexwest-doors.opserver.store/uploads/ups_b4ccb26fd6.svg",
            alt: "UPS",
        },
    },
    {
        id: 3,
        name: "USPS",
        price: 13.99,
        period: "8-10 business days",
        icon: {
            url: "https://conexwest-doors.opserver.store/uploads/usps_32046cb121.svg",
            alt: "USPS",
        },
    },
];
