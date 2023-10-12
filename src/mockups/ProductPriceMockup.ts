import { TProductPrice, TProductPriceParams } from "@store/products/types";

export const ProductPriceMockup: TProductPrice = {
    additionalCharges: 213,
    tax: 33,
    total: 513,
    grandTotal: 983,
    // shippingCost: 123,
    // discountCode: 123,
};

export const ProductPriceParamsMockup: TProductPriceParams = {
    products: [
        {
            id: "id1",
            count: 1,
        },
        { id: "id2", count: 2 },
    ],
};
