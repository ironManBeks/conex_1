import { FC, useEffect, useState } from "react";
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
import { TOptionsListItem } from "@components/globalComponents/types";
import { CHECKOUT_SUBMIT_BUTTON_ID } from "@components/pages/CheckoutPage/consts";
import { EOrderPriceNames } from "@store/order/types";
import { toJS } from "mobx";

const OrderSettings: FC<TOrderSettings> = inject("store")(
    observer(({ store, placement }) => {
        const { commonStore, orderStore } = store as IRoot;
        const { headerHeight } = commonStore;
        const {
            orderPrice,
            getOrderPrice,
            orderPriceFetching,
            deleteDoorRequestFetching,
            priceParams,
            setPriceParams,
        } = orderStore;
        const classPrefix = `${ORDER_PAGE_CLASSPREFIX}_settings`;
        const router = useRouter();
        const [discountCode, setDiscountCode] = useState<string>();
        const [isDiscountApply, setIsDiscountApply] = useState(false);

        useEffect(() => {
            if (priceParams?.items.length) {
                getOrderPrice({
                    ...priceParams,
                    items: priceParams.items.map((item) => ({
                        ...item,
                        quantity: item.quantity ? item.quantity : 1,
                    })),
                })
                    .then(({ data }) => {
                        if (data.code) {
                            setIsDiscountApply(true);
                        }
                    })
                    .catch(() => {
                        setDiscountCode("");
                        setPriceParams({
                            ...priceParams,
                            code: undefined,
                        });
                    });
            }
        }, [priceParams]);

        const handleDiscountCode = () => {
            let discountParams = discountCode;
            if (isDiscountApply) {
                setDiscountCode("");
                setIsDiscountApply(false);
                discountParams = undefined;
            }
            if (priceParams) {
                setPriceParams({
                    ...priceParams,
                    code: discountParams,
                });
            }
        };

        const renderPriceValue = (
            fieldName: EOrderPriceNames,
            valuePrefix?: string,
        ): TOptionsListItem | undefined => {
            if (!isNil(orderPrice) && orderPrice[fieldName]) {
                return {
                    label: ProductPriceLabels[fieldName],
                    value: `${valuePrefix ?? ""}$${orderPrice[fieldName]}`,
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
                                renderPriceValue(
                                    EOrderPriceNames.discount,
                                    "- ",
                                ),
                            ],
                        },
                    ]}
                />
                {orderPrice && (
                    <AdditionalServices
                        options={[]}
                        totalOption={{
                            label: ProductPriceLabels[EOrderPriceNames.amount],
                            value: `$${orderPrice[EOrderPriceNames.amount]}`,
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
                        addonDisabled={!discountCode}
                    />
                )}
                <div className={cn(`${classPrefix}__actions`)}>
                    {placement === "cart" && (
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={handlePlaceOrder}
                            isLoading={
                                deleteDoorRequestFetching || orderPriceFetching
                            }
                            disabled={
                                deleteDoorRequestFetching || orderPriceFetching
                            }
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
