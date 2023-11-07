import { EOrderPriceNames } from "@store/order/types";

export const ORDER_PAGE_CLASSPREFIX = "order-page";

export const ADYEN_WRAPPER_ID = "id_adyen_wrapper";

export const ProductPriceLabels: Record<EOrderPriceNames, string> = {
    [EOrderPriceNames.discount]: "Discount code",
    [EOrderPriceNames.amount]: "Grand total",
};
