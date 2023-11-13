import { FC, useState } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";
import { useRouter } from "next/router";
import { isNil } from "lodash";
import dynamic from "next/dynamic";

import { H3, P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import FormFieldInput from "@components/form/formFields/FormFieldInput";

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
import { EOrderCartNames } from "@store/order/types";
import { BUILDER_UNAUTHORIZED_CART_ID } from "@consts/storageNamesContsts";
import { getStorage } from "@services/storage.service";

const OrderAdyen = dynamic(() => import("./OrderAdyen"), {
    loading: () => <p>Loading...</p>,
    ssr: false,
});

const OrderSettings: FC<TOrderSettings> = inject("store")(
    observer(({ store, placement }) => {
        const { commonStore, orderStore, authStore } = store as IRoot;
        const { headerHeight } = commonStore;
        const {
            orderCart,
            orderCartFetching,
            deleteDoorRequestFetching,
            setOrderCart,
            createOrderCart,
        } = orderStore;
        const { isAuthorized, userData } = authStore;
        const classPrefix = `${ORDER_PAGE_CLASSPREFIX}_settings`;
        const router = useRouter();
        const [discountCode, setDiscountCode] = useState<string>();
        const [isDiscountApply, setIsDiscountApply] = useState(false);

        const handleDiscountCode = () => {
            if (isDiscountApply) {
                setDiscountCode("");
                setIsDiscountApply(false);
            }

            const createOrderCartParams = {
                items: orderCart?.items || [],
                code: discountCode,
                cartId: 0,
            };
            const unauthorizedCartId = getStorage(
                BUILDER_UNAUTHORIZED_CART_ID,
            ) as string | undefined;

            if (isAuthorized && userData) {
                createOrderCartParams.cartId = userData.cartId;
            } else {
                createOrderCartParams.cartId = Number(unauthorizedCartId);
            }

            createOrderCart(createOrderCartParams).then(({ data }) => {
                if (orderCart) {
                    setOrderCart({
                        ...orderCart,
                        amount: data[EOrderCartNames.amount],
                        discount: data[EOrderCartNames.discount],
                    });
                }
            });
        };

        const renderPriceValue = (
            fieldName: EOrderCartNames,
            valuePrefix?: string,
        ): TOptionsListItem | undefined => {
            if (!isNil(orderCart) && orderCart[fieldName]) {
                return {
                    label: ProductPriceLabels[fieldName],
                    value: `${valuePrefix ?? ""}$${orderCart[fieldName]}`,
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
                                    EOrderCartNames.discount,
                                    "- ",
                                ),
                            ],
                        },
                    ]}
                />
                {orderCart && (
                    <AdditionalServices
                        options={[]}
                        totalOption={{
                            label: ProductPriceLabels[EOrderCartNames.amount],
                            value: `$${orderCart[EOrderCartNames.amount]}`,
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
                                deleteDoorRequestFetching || orderCartFetching
                            }
                            disabled={
                                deleteDoorRequestFetching || orderCartFetching
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
