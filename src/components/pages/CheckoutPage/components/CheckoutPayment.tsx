import React, { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import CheckoutSectionWrapper from "./CheckoutSectionWrapper";
import PaymentCardForm from "@components/globalComponents/PaymentCardForm";
import PaymentCard from "@components/globalComponents/PaymentCard";
import ModalConfirm from "@components/modals/components/ModalConfirm";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import {
    ECheckoutFormFieldsNames,
    EPaymentMethodValues,
} from "@components/pages/CheckoutPage/formAttrs";
import { EButtonColor } from "@components/buttons/types";
import { IRoot } from "@store/store";
import { notImplemented } from "@helpers/notImplemented";
import { TPaymentCard } from "@components/globalComponents/types";
import { PaymentMethodsMockup } from "@components/pages/CheckoutPage/consts";
import Spin from "@components/globalComponents/Spin";

import { EPaymentCardNames } from "../formAttrs";

const CheckoutAdyenPayment = dynamic(() => import("./CheckoutAdyenPayment"), {
    loading: () => (
        <div className="component-preloader">
            <Spin size="large" />
        </div>
    ),
    ssr: false,
});

const CheckoutPayment: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { authStore, commonStore } = store as IRoot;
        const { userCardsData, userCardsDataFetching } = authStore;
        const { setModalConfirmVisible, setConfirmModalData } = commonStore;
        const classPrefix = `${pageClassPrefix}_payment`;
        const { watch } = useFormContext();
        const [visibleCardPayment, setVisibleCardPayment] = useState(
            EPaymentCardNames.saved,
        );
        const [cardFormVisible, setCardFormVisible] = useState(false);
        const [selectedCard, setSelectedCard] = useState<TPaymentCard>();

        const selectedService = watch(ECheckoutFormFieldsNames.paymentMethod);
        const isAdyenCard = visibleCardPayment === EPaymentCardNames.adyen;

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

                {selectedService === EPaymentMethodValues.creditDebitCard && (
                    <>
                        {userCardsData?.length &&
                            !cardFormVisible &&
                            visibleCardPayment === EPaymentCardNames.saved && (
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
                                            isActive={
                                                selectedCard?.id === item.id
                                            }
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

                        {isAdyenCard && (
                            <div>
                                <CheckoutAdyenPayment
                                    pageClassPrefix={pageClassPrefix}
                                />
                            </div>
                        )}

                        {!cardFormVisible && (
                            <div className={`${classPrefix}__actions`}>
                                <ButtonPrimary
                                    color={EButtonColor.secondary}
                                    onClick={() => {
                                        if (!isAdyenCard) {
                                            setCardFormVisible(true);
                                        } else {
                                            setVisibleCardPayment(
                                                EPaymentCardNames.saved,
                                            );
                                        }
                                    }}
                                >
                                    {isAdyenCard
                                        ? "Select Card"
                                        : "Add new card"}
                                </ButtonPrimary>

                                <ButtonPrimary
                                    color={EButtonColor.secondary}
                                    onClick={() => {
                                        setVisibleCardPayment(
                                            EPaymentCardNames.adyen,
                                        );
                                    }}
                                >
                                    Pay now
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
