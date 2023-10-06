import { FC } from "react";
import { inject, observer } from "mobx-react";

import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldAutoCompleteController from "@components/form/formControllers/FieldAutoCompleteController";
import FieldTextAreaController from "@components/form/formControllers/FieldTextAreaController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    COMMENT_ORDER_MAX_MESSAGE_LENGTH,
    ECheckoutFormFieldsNames,
} from "@components/pages/CheckoutPage/formAttrs";

type TShippingMethodDTO = {
    name: string;
    value: string;
    price: number;
    currency: string;
    deliveryFrom: number;
    deliveryTo: number;
    imgSrc: string;
    showTitle: boolean;
};

const ShippingMethodsMockup: TShippingMethodDTO[] = [
    {
        name: "FedEx",
        value: "FedEx",
        price: 23.99,
        currency: "$",
        deliveryFrom: 3,
        deliveryTo: 5,
        imgSrc: "/images/svg/delivery-fedex.svg",
        showTitle: false,
    },
    {
        name: "UPS",
        value: "UPS",
        price: 123.99,
        currency: "$",
        deliveryFrom: 3,
        deliveryTo: 5,
        imgSrc: "/images/svg/delivery-ups.svg",
        showTitle: true,
    },
    {
        name: "USPS",
        value: "USPS",
        price: 1234.99,
        currency: "$",
        deliveryFrom: 1,
        deliveryTo: 100,
        imgSrc: "/images/svg/delivery-usps.svg",
        showTitle: true,
    },
];

const CheckoutShippingMethod: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_shipping-method`;

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Shipping method"
            >
                <div className={`${classPrefix}__select`}>
                    <FieldRadioButtonArrayController
                        name={ECheckoutFormFieldsNames.deliveryService}
                        options={ShippingMethodsMockup.map((item) => ({
                            value: item.value,
                            label: (
                                <>
                                    <ImgWrapper
                                        src={item.imgSrc}
                                        alt={"Logo"}
                                    />
                                    <P>
                                        {item.showTitle && (
                                            <span>{item.name} </span>
                                        )}
                                        <span>
                                            {item.currency}
                                            {item.price}
                                        </span>{" "}
                                        <span>
                                            {item.deliveryFrom}-
                                            {item.deliveryTo} business days
                                        </span>
                                    </P>
                                </>
                            ),
                        }))}
                    />
                </div>
                <div className={`${classPrefix}__fields`}>
                    <iframe
                        width="100%"
                        height="510"
                        className="gmap_iframe"
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    />
                    <div className="_row">
                        <FieldInputController
                            name={ECheckoutFormFieldsNames.state}
                            label="State"
                            placeholder="State"
                            className={""}
                        />
                        <FieldInputController
                            name={ECheckoutFormFieldsNames.city}
                            label="Town / City"
                            placeholder="Town / City"
                        />
                    </div>
                    <FieldAutoCompleteController
                        name={ECheckoutFormFieldsNames.streetAddress}
                        fieldLabel="Street address"
                        placeholder="Street address"
                    />
                    <FieldTextAreaController
                        name={ECheckoutFormFieldsNames.commentsOrder}
                        label="Comments on the order"
                        placeholder="Comments on the order"
                        minHeight={160}
                        maxSymbolLength={COMMENT_ORDER_MAX_MESSAGE_LENGTH}
                    />
                </div>
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutShippingMethod;
