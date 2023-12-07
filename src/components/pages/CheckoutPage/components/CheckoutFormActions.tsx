import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { createPortal } from "react-dom";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { CHECKOUT_SUBMIT_BUTTON_ID } from "@components/pages/CheckoutPage/consts";

const CheckoutFormActions: FC<TSectionTypes> = inject("store")(
    observer(() => {
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
            // INFO: temporary commented
            // <ButtonPrimary
            //     type="submit"
            //     color={EButtonColor.primary}
            //     onClick={onSubmitClick}
            //     disabled={orderCartFetching}
            //     isLoading={orderCartFetching}
            // >
            //     Place an order
            // </ButtonPrimary>
            <></>
        );

        return portalContainer
            ? createPortal(component, portalContainer)
            : component;
    }),
);

export default CheckoutFormActions;
