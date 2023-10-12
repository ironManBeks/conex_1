import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { createPortal } from "react-dom";

import { IRoot } from "@store/store";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { CHECKOUT_SUBMIT_BUTTON_ID } from "@components/pages/CheckoutPage/consts";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor } from "@components/buttons/types";

const CheckoutFormActions: FC<
    TSectionTypes & { onSubmitClick: () => Promise<void> }
> = inject("store")(
    observer(({ store, onSubmitClick }) => {
        const { productsStore } = store as IRoot;
        const { productPriceFetching } = productsStore;
        const [portalContainer, setPortalContainer] =
            useState<HTMLElement | null>(null);

        useEffect(() => {
            setPortalContainer(
                document.getElementById(CHECKOUT_SUBMIT_BUTTON_ID),
            );
        }, [document]);

        const component = (
            <ButtonPrimary
                type="submit"
                disabled={productPriceFetching}
                isLoading={productPriceFetching}
                color={EButtonColor.primary}
                onClick={onSubmitClick}
            >
                Place an order
            </ButtonPrimary>
        );

        return document && portalContainer
            ? createPortal(component, portalContainer)
            : component;
    }),
);

export default CheckoutFormActions;
