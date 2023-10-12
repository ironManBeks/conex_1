import { FC } from "react";
import { inject, observer } from "mobx-react";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import FieldCheckboxController from "@components/form/formControllers/FieldCheckboxController";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { ECheckoutFormFieldsNames } from "@components/pages/CheckoutPage/formAttrs";
import { phoneNumberMask } from "@consts/masksConsts";

const CheckoutDetails: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_details`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Billing details*"
            >
                <div className={`${classPrefix}__fields`}>
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.firstName}
                        label="First name"
                        placeholder="First name"
                    />
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.lastName}
                        label="Last name"
                        placeholder="Last name"
                    />
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.email}
                        label="Email"
                        placeholder="Email"
                    />
                    <FieldInputMaskController
                        name={ECheckoutFormFieldsNames.phone}
                        placeholder="Phone"
                        label="Phone"
                        mask={phoneNumberMask}
                    />
                </div>
                <div>
                    <FieldCheckboxController
                        name={ECheckoutFormFieldsNames.receiveNews}
                        label="I want to receive news and promotional messages Caption"
                    />
                </div>
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutDetails;
