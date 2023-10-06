import { FC } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";
import { useRouter } from "next/router";

import { H3, P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import FormFieldInput from "@components/form/formFields/FormFieldInput";

import { ORDER_PAGE_CLASSPREFIX } from "@components/order/consts";
import { PATH_CHECKOUT_PAGE } from "@consts/pathsConsts";
import { notImplemented } from "@helpers/notImplemented";
import { TOrderSettings } from "../pages/CheckoutPage/types";
import { EButtonColor } from "@components/buttons/types";

import { IRoot } from "@store/store";

const OrderSettings: FC<TOrderSettings> = inject("store")(
    observer(({ store, placement }) => {
        const classPrefix = `${ORDER_PAGE_CLASSPREFIX}_settings`;
        const router = useRouter();
        const { commonStore } = store as IRoot;
        const { headerHeight } = commonStore;

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
                            list: [
                                { label: "Goods (2)", value: "$202.40" },
                                {
                                    label: "Additional charges",
                                    value: "$33.00",
                                },
                                {
                                    label: "Shipping cost",
                                    value: "$60.00",
                                },
                                {
                                    label: "TAX",
                                    value: "$33.46",
                                },
                            ],
                        },
                    ]}
                />
                <AdditionalServices
                    options={[]}
                    totalOption={{
                        label: "Grand Total",
                        value: `$308.86`,
                    }}
                />
                <FormFieldInput
                    name={"discountCode"}
                    isFloatingLabel={false}
                    errorMessage={undefined}
                    placeholder="Discount code"
                />
                <div className={cn(`${classPrefix}__actions`)}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={() => {
                            if (placement === "cart") {
                                router.push(PATH_CHECKOUT_PAGE);
                            } else notImplemented();
                        }}
                    >
                        Place an order
                    </ButtonPrimary>
                    <P>
                        The date and cost of delivery or pickup are determined
                        at checkout
                    </P>
                </div>
            </div>
        );
    }),
);
export default OrderSettings;
