import { FC } from "react";
import { inject, observer } from "mobx-react";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import PickupPoint from "@components/globalComponents/PickupPoint";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    COMMENT_ORDER_MAX_MESSAGE_LENGTH,
    ECheckoutFormFieldsNames,
} from "@components/pages/CheckoutPage/formAttrs";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { CheckoutPickupPointMockup } from "../../../../mockups/CheckoutPickupPointMockup";

const CheckoutPickup: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { commonStore } = store as IRoot;
        const { setModalMapPickupVisible } = commonStore;
        const classPrefix = `${pageClassPrefix}_pickup`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Pickup point*"
            >
                <div className="_row">
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.state}
                        label="State"
                        placeholder="State"
                    />
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.city}
                        label="Town / City"
                        placeholder="Town / City"
                    />
                </div>
                <FieldRadioButtonArrayController
                    name={ECheckoutFormFieldsNames.pickupPoints}
                    options={CheckoutPickupPointMockup.map((item) => ({
                        value: item.id,
                        label: <PickupPoint {...item} />,
                    }))}
                />
                <div className={`${classPrefix}__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.secondary}
                        onClick={() => setModalMapPickupVisible(true)}
                    >
                        All pickup points on the map
                    </ButtonPrimary>
                </div>
                <FieldTextAreaController
                    name={ECheckoutFormFieldsNames.commentsOrder}
                    label="Comments on the order"
                    placeholder="Comments on the order"
                    minHeight={160}
                    maxSymbolLength={COMMENT_ORDER_MAX_MESSAGE_LENGTH}
                />
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutPickup;
