import { FC, ReactNode } from "react";
import { inject, observer } from "mobx-react";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { ECheckoutFormFieldsNames } from "@components/pages/CheckoutPage/formAttrs";

type TAdditionalService = {
    value: string;
    label: ReactNode;
};

const AdditionalServicesMockup: TAdditionalService[] = [
    {
        value: "liftToTheFloor",
        label: "Lift to the floor",
    },
    {
        value: "unloading",
        label: "Unloading",
    },
    {
        value: "equipmentRental",
        label: "Equipment rental",
    },
];

const CheckoutAdditionalServices: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_additional-services`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Additional services"
            >
                <FieldCheckboxArrayController
                    name={ECheckoutFormFieldsNames.additionalServices}
                    options={AdditionalServicesMockup}
                />
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutAdditionalServices;
