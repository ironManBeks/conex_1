import { TPickupPoint } from "@components/globalComponents/types";

export const CheckoutPickupPointMockup: TPickupPoint[] = [
    {
        id: "1",
        title: "short 1",
        description: "Short 1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "10:00 am",
        deliveryTimeTo: "16:00 pm",
    },
    {
        id: "2",
        title: "1023 Massachusetts Ave",
        description: "1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "08:00 am",
        deliveryTimeTo: "16:00 pm",
    },
    {
        id: "3",
        title: "Long Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 Place3Place3 Place3 ",
        description:
            "Long 1023 Massachusetts Ave, Lexington, MA 02420, 1023 Massachusetts Ave, Lexington, MA 02420 1023 Massachusetts Ave, Lexington, MA 02420",
        deliveryDate: "2023-08-30T09:34:14.281Z",
        deliveryTimeFrom: "13:00 pn",
        deliveryTimeTo: "16:00 pm",
    },
];
