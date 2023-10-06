import { FC, ReactNode } from "react";
import { inject, observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import {
    IconAmazonPay,
    IconBank,
    IconCreditCard,
    IconPaypal,
} from "@components/Icons";
import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { ECheckoutFormFieldsNames } from "@components/pages/CheckoutPage/formAttrs";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { useFormContext } from "react-hook-form";

enum ETPaymentMethodValues {
    paypal = "paypal",
    amazonPay = "amazonPay",
    bankTransfer = "bankTransfer",
    creditDebitCard = "creditDebitCard",
}

type TPaymentMethod = {
    value: ETPaymentMethodValues;
    label: ReactNode;
};

const PaymentMethodsMockup: TPaymentMethod[] = [
    {
        value: ETPaymentMethodValues.paypal,
        label: <IconPaypal />,
    },
    {
        value: ETPaymentMethodValues.amazonPay,
        label: <IconAmazonPay />,
    },
    {
        value: ETPaymentMethodValues.bankTransfer,
        label: (
            <>
                <IconBank /> Bank Transfer
            </>
        ),
    },
    {
        value: ETPaymentMethodValues.creditDebitCard,
        label: (
            <>
                <IconCreditCard /> Credit/Debit Card
            </>
        ),
    },
];

const CheckoutPayment: FC<TSectionTypes> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_payment`;
        const { watch } = useFormContext();

        const selectedService = watch(ECheckoutFormFieldsNames.deliveryService);

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Payment method"
            >
                <FieldRadioButtonArrayController
                    name={ECheckoutFormFieldsNames.deliveryService}
                    options={PaymentMethodsMockup}
                />

                {selectedService === ETPaymentMethodValues.creditDebitCard && (
                    <PaymentCardForm
                        // reference={formRef}
                        className={`${classPrefix}__card-form`}
                        // submitText={isEdit ? "Save changes" : "Add to card"}
                        // onSuccessfulSubmit={(data) => {
                        //     notImplemented(`value: ${JSON.stringify(data)}`);
                        //     handleCloseModal();
                        // }}
                    />
                )}

                <div className={`${classPrefix}__discount`}>
                    <FieldInputController
                        name={ECheckoutFormFieldsNames.discountCode}
                        label="Discount code"
                        placeholder="Discount code"
                    />
                    <ButtonPrimary
                        size={EButtonSize.lg}
                        color={EButtonColor.primary}
                        onClick={() => {
                            notImplemented();
                        }}
                    >
                        Apply
                    </ButtonPrimary>
                </div>
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutPayment;
