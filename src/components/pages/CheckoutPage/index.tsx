import { FC } from "react";
import { inject, observer } from "mobx-react";

import OrderLayout from "@components/order/OrderLayout";
import OrderSettings from "../../order/OrderSettings";
import CheckoutForm from "./components/CheckoutForm";

import { TStore } from "@globalTypes/storeTypes";
import { IconArrowSingle } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";
import ButtonLink from "@components/buttons/ButtonLink";
import { PATH_CART_PAGE } from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";

const CheckoutPage: FC<TStore> = inject("store")(
    observer(() => {
        const classPrefix = "checkout-page";

        return (
            <OrderLayout
                leftSideContent={<CheckoutForm pageClassPrefix={classPrefix} />}
                rightSideContent={
                    <OrderSettings
                        pageClassPrefix={classPrefix}
                        placement="checkout"
                    />
                }
                title={
                    <>
                        <ButtonLink
                            href={PATH_CART_PAGE}
                            color={EButtonColor.transparent}
                        >
                            <IconArrowSingle direction={EArrowDirection.left} />
                        </ButtonLink>
                        Checkout
                    </>
                }
                pageClassPrefix={classPrefix}
            />
        );
    }),
);

export default CheckoutPage;
