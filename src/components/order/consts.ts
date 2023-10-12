import { EProductPriceNames } from "@store/products/types";

export const ORDER_PAGE_CLASSPREFIX = "order-page";

export const ProductPriceLabels: Record<EProductPriceNames, string> = {
    [EProductPriceNames.additionalCharges]: "Additional charges",
    [EProductPriceNames.tax]: "TAX",
    [EProductPriceNames.total]: "Goods",
    [EProductPriceNames.shippingCost]: "Shipping cost",
    [EProductPriceNames.discountCode]: "Discount code",
    [EProductPriceNames.grandTotal]: "Grand total",
};
