import { EOrderCartNames } from "@store/order/types";

export const ORDER_PAGE_CLASSPREFIX = "order-page";

export const ADYEN_WRAPPER_ID = "id_adyen_wrapper";

export const ProductPriceLabels: Record<EOrderCartNames, string> = {
    [EOrderCartNames.discount]: "Discount code",
    [EOrderCartNames.amount]: "Grand total",
};
