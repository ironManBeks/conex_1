import { FC } from "react";
import { inject, observer } from "mobx-react";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { H4, P } from "@components/Text";
import {
    ECheckoutFormFieldsNames,
    ECheckoutGetMode,
} from "@components/pages/CheckoutPage/formAttrs";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";

const GetModeOptions: {
    value: ECheckoutGetMode;
    title: string;
    description: string;
}[] = [
    {
        value: ECheckoutGetMode.delivery,
        title: "Delivery",
        description: "Our delivery service will bring your order",
    },
    {
        value: ECheckoutGetMode.storePickup,
        title: "Store Pickup",
        description: "Pick up your order for free from the store",
    },
];

const CheckoutGetMode: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_get-mode`;
        return (
            <div className={`${classPrefix}__wrapper`}>
                <FieldRadioButtonArrayController
                    name={ECheckoutFormFieldsNames.getMode}
                    options={GetModeOptions.map((item) => ({
                        value: item.value,
                        label: (
                            <>
                                <div className="icon-wrapper">
                                    <div className="icon" />
                                </div>
                                <div className="content">
                                    <H4>{item.title}</H4>
                                    <P>{item.description}</P>
                                </div>
                            </>
                        ),
                    }))}
                />
            </div>
        );
    }),
);

export default CheckoutGetMode;
