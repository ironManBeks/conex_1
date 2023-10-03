import { FC, useCallback, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ChoiceMode from "@components/globalComponents/ChoiceMode";
import OrderSettingsLayout from "@components/order/OrderSettingsLayout";
import OrderGuestModeForm from "@components/order/OrderGuestModeForm";
import OrderShippingMethod from "@components/order/OrderShippingMethod";
import AuthForm from "@components/globalComponents/AuthForm";
import OrderPaymentMethod from "@components/order/OrderPaymentMethod";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { ECheckoutStep, ECheckoutUserModes } from "../types";
import { IOrderGuestModeFormRef } from "@components/order/types";
import { TGuestModeForm } from "@components/order/OrderGuestModeForm/formAttrs";
import { AdditionalServicesOptionsMockup } from "../../../../mockups/AdditionalServicesOptionsMockup";
import { ShippingMethodsMockup } from "../../../../mockups/ShippingMethodsMockup";
import { notImplemented } from "@helpers/notImplemented";

const CheckoutSettings: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_settings`;

    const [checkoutStep, setCheckoutStep] = useState<ECheckoutStep>(
        ECheckoutStep.delivery,
    );
    const [selectedMode, setSelectedMode] = useState<ECheckoutUserModes>(
        ECheckoutUserModes.guest,
    );
    // const [selectedDelivery, setSelectedDelivery] = useState<string>("");
    // const [guestFormValues, setGuestFormValues] = useState<TGuestModeForm>();
    const guestFormRef = useRef<IOrderGuestModeFormRef>(null);

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
                            // onValuesChange={(values) =>
                            //     setGuestFormValues(values)
                            // }
                            reference={guestFormRef}
                        />
                    )}
                    <br />
                    address
                    <br />
                    {/*<AddressSelection*/}
                    {/*    className={classPrefix}*/}
                    {/*    errorMessage={undefined}*/}
                    {/*/>*/}
                    <OrderShippingMethod
                        className={classPrefix}
                        // onChange={(value) => setSelectedDelivery(value)}
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
        if (guestFormRef?.current) {
            await guestFormRef.current
                .submitForm()
                .then((data) => {
                    userData = data as TGuestModeForm;
                })
                .catch(() => {
                    userData = null;
                });
        }
        if (userData) {
            setCheckoutStep(ECheckoutStep.payment);
        }
    }, [guestFormRef]);

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
