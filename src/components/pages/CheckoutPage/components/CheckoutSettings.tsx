import { FC, useCallback, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ChoiceMode from "@components/globalComponents/ChoiceMode";
import OrderSettingsLayout from "@components/order/OrderSettingsLayout";
import OrderChoiceAddress from "@components/order/OrderChoiceAddress";
import OrderGuestModeForm from "@components/order/OrderGuestModeForm";
import OrderShippingMethod from "@components/order/OrderShippingMethod";
import AuthForm from "@components/globalComponents/AuthForm";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { ECheckoutStep, ECheckoutUserModes } from "../types";
import {
    IOrderGuestModeFormRef,
    TShippingMethod,
} from "@components/order/types";
import { useRootStore } from "@store";
import OrderPaymentMethod from "@components/order/OrderPaymentMethod";
import { TGuestModeForm } from "@components/order/formAttrs";
import AdditionalServices from "@components/globalComponents/AdditionalServices";
import { AdditionalServicesOptionsMockup } from "../../../../mockups/AdditionalServicesOptionsMockup";
import { ShippingMethodsMockup } from "../../../../mockups/ShippingMethodsMockup";
import { notImplemented } from "@helpers/notImplemented";

const CheckoutSettings: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_settings`;
    const { commonStore } = useRootStore();
    const { setModalAuthVisible } = commonStore;

    const [checkoutStep, setCheckoutStep] = useState<ECheckoutStep>(
        ECheckoutStep.delivery,
    );
    const [selectedMode, setSelectedMode] = useState<ECheckoutUserModes>(
        ECheckoutUserModes.guest,
    );
    const [selectedDelivery, setSelectedDelivery] = useState<string>("");
    const [guestFormValues, setGuestFormValues] = useState<TGuestModeForm>();
    const formRef = useRef<IOrderGuestModeFormRef>(null);

    const choiceModeOptions = [
        {
            label: "Guest Mode",
            value: ECheckoutUserModes.guest,
            isActive: selectedMode === ECheckoutUserModes.guest,
            onClick: () => setSelectedMode(ECheckoutUserModes.guest),
        },
        selectedMode === ECheckoutUserModes.user
            ? {
                  label: "userName",
                  value: ECheckoutUserModes.user,
                  isActive: selectedMode === ECheckoutUserModes.user,
                  onClick: () => setSelectedMode(ECheckoutUserModes.user),
              }
            : {
                  label: "Log In",
                  value: ECheckoutUserModes.logIn,
                  isActive: selectedMode === ECheckoutUserModes.logIn,
                  onClick: () => setSelectedMode(ECheckoutUserModes.logIn),
              },
    ];

    const bodyContent = useMemo(() => {
        if (selectedMode === ECheckoutUserModes.logIn) {
            return (
                <AuthForm
                    className="modal-auth"
                    onAuth={() => setSelectedMode(ECheckoutUserModes.user)}
                />
            );
        }

        if (checkoutStep === ECheckoutStep.delivery) {
            return (
                <>
                    {selectedMode === ECheckoutUserModes.guest && (
                        <OrderGuestModeForm
                            className={classPrefix}
                            onValuesChange={(values) =>
                                setGuestFormValues(values)
                            }
                            reference={formRef}
                        />
                    )}
                    <OrderChoiceAddress className={classPrefix} />
                    <OrderShippingMethod
                        className={classPrefix}
                        onChange={(value) => setSelectedDelivery(value)}
                        options={ShippingMethodsMockup}
                    />
                </>
            );
        }

        if (checkoutStep === ECheckoutStep.payment) {
            return (
                <>
                    <OrderPaymentMethod userMode={selectedMode} />
                    <AdditionalServices
                        options={AdditionalServicesOptionsMockup}
                        totalOption={{
                            label: "Grand Total",
                            value: "$2,323.00",
                        }}
                    />
                </>
            );
        }
        return null;
    }, [checkoutStep, selectedMode]);

    const handleDeliveryCheckout = useCallback(async () => {
        let userData: TGuestModeForm | null = null;
        if (formRef?.current) {
            await formRef.current
                .submitForm()
                .then((data) => {
                    console.log("data", data);
                    userData = data as TGuestModeForm;
                })
                .catch((err) => {
                    console.log("err", err);
                    userData = null;
                });
        }
        if (userData) {
            setCheckoutStep(ECheckoutStep.payment);
        }
    }, [formRef]);

    const handlePaymentCheckout = () => {
        notImplemented();
    };

    return (
        <OrderSettingsLayout
            className={classPrefix}
            title="Payment"
            headContent={
                <ChoiceMode
                    options={choiceModeOptions}
                    className={classPrefix}
                />
            }
            bodyContent={bodyContent}
            footerActions={
                selectedMode !== ECheckoutUserModes.logIn && (
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={() => {
                            if (checkoutStep === ECheckoutStep.payment) {
                                handlePaymentCheckout();
                            } else handleDeliveryCheckout().then();
                        }}
                    >
                        Checkout
                    </ButtonPrimary>
                )
            }
        />
    );
});

export default CheckoutSettings;
