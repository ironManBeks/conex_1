import { FC, useState } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";
import { useRouter } from "next/router";
import { isNil } from "lodash";

import { H3, P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import FormFieldInput from "@components/form/formFields/FormFieldInput";
import OrderAdyen from "./OrderAdyen";

import {
    ORDER_PAGE_CLASSPREFIX,
    ProductPriceLabels,
} from "@components/order/consts";
import { PATH_CHECKOUT_PAGE } from "@consts/pathsConsts";
import { TOrderSettings } from "../pages/CheckoutPage/types";
import { EButtonColor } from "@components/buttons/types";

import { IRoot } from "@store/store";
import { IconArrowSingle, IconCross } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";
import { ProductPriceParamsMockup } from "../../mockups/ProductPriceMockup";
import { TOptionsListItem } from "@components/globalComponents/types";
import { EProductPriceNames } from "@store/products/types";
import { CHECKOUT_SUBMIT_BUTTON_ID } from "@components/pages/CheckoutPage/consts";

const OrderSettings: FC<TOrderSettings> = inject("store")(
    observer(({ store, placement }) => {
        const { commonStore, productsStore } = store as IRoot;
        const { headerHeight } = commonStore;
        const { productPrice, productPriceFetching, getProductPriceRequest } =
            productsStore;
        const classPrefix = `${ORDER_PAGE_CLASSPREFIX}_settings`;
        const router = useRouter();
        const [discountCode, setDiscountCode] = useState<string>();
        const [isDiscountApply, setIsDiscountApply] = useState(false);

        if (!productPrice) {
            return null;
        }

        const handleDiscountCode = () => {
            let discountParams = discountCode;
            if (isDiscountApply) {
                setDiscountCode("");
                setIsDiscountApply(false);
                discountParams = undefined;
            }
            getProductPriceRequest({
                ...ProductPriceParamsMockup,
                discountCode: discountParams,
            }).finally(() => {
                if (!isDiscountApply) {
                    setIsDiscountApply(true);
                }
            });
        };

        const renderPriceValue = (
            fieldName: EProductPriceNames,
            valuePrefix?: string,
        ): TOptionsListItem | undefined => {
            if (!isNil(productPrice[fieldName])) {
                return {
                    label: ProductPriceLabels[fieldName],
                    value: `${valuePrefix ?? ""}$${productPrice[fieldName]}`,
                };
            }
        };

        const handlePlaceOrder = () => {
            router.push(PATH_CHECKOUT_PAGE);
        };

        return (
            <div
                className={cn(`${classPrefix}__wrapper`, {
                    [`_${placement}`]: placement,
                })}
                style={{
                    top: `${headerHeight + 20}px`,
                }}
            >
                <H3>Order</H3>
                <AddedOptionsList
                    optionsList={[
                        {
                            // list: renderOptionsList(),
                            list: [
                                renderPriceValue(EProductPriceNames.total),
                                renderPriceValue(
                                    EProductPriceNames.additionalCharges,
                                ),
                                renderPriceValue(
                                    EProductPriceNames.shippingCost,
                                ),
                                renderPriceValue(EProductPriceNames.tax),
                                renderPriceValue(
                                    EProductPriceNames.discountCode,
                                    "- ",
                                ),
                            ],
                        },
                    ]}
                />
                {productPrice && (
                    <AdditionalServices
                        options={[]}
                        totalOption={{
                            label: ProductPriceLabels[
                                EProductPriceNames.grandTotal
                            ],
                            value: `$${
                                productPrice[EProductPriceNames.grandTotal]
                            }`,
                        }}
                    />
                )}
                {placement === "checkout" && (
                    <FormFieldInput
                        name={"discountCode"}
                        isFloatingLabel={false}
                        errorMessage={undefined}
                        placeholder="Discount code"
                        readOnly={isDiscountApply}
                        addonAfter={
                            isDiscountApply ? (
                                <IconCross />
                            ) : (
                                <IconArrowSingle
                                    direction={EArrowDirection.right}
                                    opacity={"0.36"}
                                />
                            )
                        }
                        value={discountCode}
                        onChange={(e) => {
                            const val = e.target.value;
                            setDiscountCode(val);
                        }}
                        onAddonClick={handleDiscountCode}
                        addonDisabled={!discountCode || productPriceFetching}
                    />
                )}
                <div className={cn(`${classPrefix}__actions`)}>
                    {placement === "cart" && (
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={handlePlaceOrder}
                            disabled={productPriceFetching}
                            isLoading={productPriceFetching}
                        >
                            Place an order
                        </ButtonPrimary>
                    )}
                    {placement === "checkout" && (
                        <div id={CHECKOUT_SUBMIT_BUTTON_ID} />
                    )}
                    <P>
                        The date and cost of delivery or pickup are determined
                        at checkout
                    </P>
                </div>
                {placement === "checkout" && <OrderAdyen />}
            </div>
        );
    }),
);
export default OrderSettings;

// ToDo Remove
// const renderOptionsList = useCallback((): TOptionsListItem[] => {
//     const result: TOptionsListItem[] = [];
//     if (!productPrice) {
//         return result;
//     }
//
//     const exceptions = [EProductPriceNames.grandTotal];
//
//     for (const key in productPrice) {
//         const curKey = key as keyof TProductPrice;
//         if (
//             !isNil(productPrice[curKey]) &&
//             !exceptions.includes(curKey)
//         ) {
//             result.push({
//                 label: ProductPriceLabels[curKey],
//                 value: `$${productPrice[curKey]}`,
//             });
//         }
//     }
//     return result;
// }, [productPrice]);
