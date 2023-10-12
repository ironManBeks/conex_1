import React, { FC, ReactNode, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { useFormContext } from "react-hook-form";

import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import { IconBank, IconCreditCard } from "@components/Icons";
import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";
import PaymentCard from "@components/globalComponents/PaymentCard";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { ECheckoutFormFieldsNames } from "@components/pages/CheckoutPage/formAttrs";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { notImplemented } from "@helpers/notImplemented";
import { TPaymentCard } from "@components/globalComponents/types";

enum ETPaymentMethodValues {
    // paypal = "paypal",
    // amazonPay = "amazonPay",
    bankTransfer = "bankTransfer",
    creditDebitCard = "creditDebitCard",
}

type TPaymentMethod = {
    value: ETPaymentMethodValues;
    label: ReactNode;
};

const PaymentMethodsMockup: TPaymentMethod[] = [
    // {
    //     value: ETPaymentMethodValues.paypal,
    //     label: <IconPaypal />,
    // },
    // {
    //     value: ETPaymentMethodValues.amazonPay,
    //     label: <IconAmazonPay />,
    // },
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
    observer(({ store, pageClassPrefix }) => {
        const { authStore, commonStore } = store as IRoot;
        const { userCardsData, userCardsDataFetching } = authStore;
        const { setModalConfirmVisible, setConfirmModalData } = commonStore;
        const classPrefix = `${pageClassPrefix}_payment`;
        const { watch } = useFormContext();
        const [cardFormVisible, setCardFormVisible] = useState(false);
        const [selectedCard, setSelectedCard] = useState<TPaymentCard>();

        const selectedService = watch(ECheckoutFormFieldsNames.paymentMethod);

        useEffect(() => {
            setCardFormVisible(false);
            setSelectedCard(undefined);
        }, [selectedService]);

        return (
            <CheckoutSectionWrapper
                pageClassPrefix={pageClassPrefix}
                className={`${classPrefix}__wrapper`}
                title="Payment method*"
                fetching={userCardsDataFetching}
            >
                <FieldRadioButtonArrayController
                    name={ECheckoutFormFieldsNames.paymentMethod}
                    options={PaymentMethodsMockup}
                />

                {selectedService === ETPaymentMethodValues.creditDebitCard && (
                    <>
                        {userCardsData?.length && !cardFormVisible && (
                            <>
                                {userCardsData?.map((item) => (
                                    <PaymentCard
                                        key={item.id}
                                        id={item.id}
                                        cvv={item.cvv}
                                        cardNumber={item.cardNumber}
                                        expMonth={item.expMonth}
                                        expYear={item.expYear}
                                        onDelete={() => {
                                            setModalConfirmVisible(true);
                                            setConfirmModalData(item);
                                        }}
                                        onClick={() => {
                                            setSelectedCard(item);
                                        }}
                                        isActive={selectedCard?.id === item.id}
                                    />
                                ))}
                                <ModalConfirm
                                    title="Do you want to remove the card?"
                                    confirmColor={EButtonColor.primary}
                                    onConfirm={(confirmModalData) => {
                                        notImplemented(
                                            `value: ${JSON.stringify(
                                                confirmModalData,
                                            )}`,
                                        );
                                    }}
                                />
                            </>
                        )}

                        {!cardFormVisible && (
                            <div className={`${classPrefix}__actions`}>
                                <ButtonPrimary
                                    color={EButtonColor.secondary}
                                    onClick={() => {
                                        setCardFormVisible(true);
                                    }}
                                >
                                    Add new card
                                </ButtonPrimary>
                            </div>
                        )}

                        {cardFormVisible && (
                            <PaymentCardForm
                                // reference={formRef}
                                className={`${classPrefix}__card-form`}
                                actionsContent={
                                    <ButtonPrimary
                                        color={EButtonColor.transparent}
                                        onClick={() => {
                                            setCardFormVisible(false);
                                        }}
                                    >
                                        Cancel
                                    </ButtonPrimary>
                                }
                                submitText={"Save card"}
                                onSuccessfulSubmit={(data) => {
                                    notImplemented(
                                        `value: ${JSON.stringify(data)}`,
                                    );
                                }}
                            />
                        )}
                    </>
                )}
            </CheckoutSectionWrapper>
        );
    }),
);

export default CheckoutPayment;
