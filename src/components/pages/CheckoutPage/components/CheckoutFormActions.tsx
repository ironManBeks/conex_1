import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { createPortal } from "react-dom";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { CHECKOUT_SUBMIT_BUTTON_ID } from "@components/pages/CheckoutPage/consts";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor } from "@components/buttons/types";

const CheckoutFormActions: FC<
    TSectionTypes & { onSubmitClick: () => Promise<void> }
> = inject("store")(
    observer(({ onSubmitClick }) => {
        const [portalContainer, setPortalContainer] =
            useState<HTMLElement | null>(null);

        useEffect(() => {
            if (document) {
                setPortalContainer(
                    document.getElementById(CHECKOUT_SUBMIT_BUTTON_ID),
                );
            }
        }, []);

        const component = (
            <ButtonPrimary
                type="submit"
                color={EButtonColor.primary}
                onClick={onSubmitClick}
            >
                Place an order
            </ButtonPrimary>
        );

        return portalContainer
            ? createPortal(component, portalContainer)
            : component;
    }),
);

export default CheckoutFormActions;
