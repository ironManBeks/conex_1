import { FC, useState } from "react";
import cn from "classnames";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import FormFieldInput from "@components/form/formFields/FormFieldInput";
import { H3, H4 } from "@components/Text";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import {
    IconAmazonPay,
    IconBankDollar,
    IconCreditCard,
    IconPaypal,
} from "@components/Icons";

import { notImplemented } from "@helpers/notImplemented";
import {
    EPaymentMethodFromFieldsNames,
    orderPaymentMethodDefaultValues,
    orderPaymentMethodFormResolver,
    TOrderPaymentMethodFrom,
} from "./formAttrs";
import { EPaymentMethodsNames, TOrderPaymentMethod } from "./types";
import { ECheckoutUserModes } from "@components/pages/CheckoutPage/types";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const OrderPaymentMethod: FC<TOrderPaymentMethod> = ({
    className,
    userMode,
}) => {
    const classPrefix = "order-payment-method";
    const [formVisible, setFormVisible] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] =
        useState<EPaymentMethodsNames>();

    const methods = useForm<TOrderPaymentMethodFrom>({
        resolver: orderPaymentMethodFormResolver(),
        // ToDo remove "as"
        defaultValues:
            orderPaymentMethodDefaultValues as TOrderPaymentMethodFrom,
    });

    const { handleSubmit } = methods;

    const onSubmit: SubmitHandler<TOrderPaymentMethodFrom> = (data) => {
        console.log("SubmitHandler", data);
        notImplemented(`value: ${JSON.stringify(data)}`);
    };

    const changeMethodHandle = (value: EPaymentMethodsNames) => {
        if (value === EPaymentMethodsNames.card) {
            setFormVisible(true);
        } else {
            setFormVisible(false);
        }
        setActivePaymentMethod(value);
    };

    const isActiveBtn = (value: EPaymentMethodsNames): string | undefined => {
        return activePaymentMethod === value ? "_active" : undefined;
    };

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <H3>Payment method</H3>
            <div className={`${classPrefix}_actions`}>
                <div className={`${classPrefix}_actions__sub-actions`}>
                    <ButtonPrimary
                        onClick={() =>
                            changeMethodHandle(EPaymentMethodsNames.paypal)
                        }
                        className={cn(isActiveBtn(EPaymentMethodsNames.paypal))}
                        size={EButtonSize.sm}
                    >
                        <IconPaypal />
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={() =>
                            changeMethodHandle(EPaymentMethodsNames.amazon)
                        }
                        className={cn(isActiveBtn(EPaymentMethodsNames.amazon))}
                        size={EButtonSize.sm}
                    >
                        <IconAmazonPay />
                    </ButtonPrimary>
                </div>
                <ButtonPrimary
                    icon={<IconBankDollar color="#868582" />}
                    onClick={() =>
                        changeMethodHandle(EPaymentMethodsNames.bankTransfer)
                    }
                    className={cn(
                        isActiveBtn(EPaymentMethodsNames.bankTransfer),
                    )}
                    size={EButtonSize.sm}
                >
                    Bank Transfer
                </ButtonPrimary>
                {userMode === ECheckoutUserModes.guest && (
                    <ButtonPrimary
                        onClick={() => {
                            changeMethodHandle(EPaymentMethodsNames.card);
                        }}
                        className={cn(isActiveBtn(EPaymentMethodsNames.card))}
                        icon={<IconCreditCard color="#868582" />}
                        size={EButtonSize.sm}
                    >
                        Credit/Debit Card
                    </ButtonPrimary>
                )}
                {userMode === ECheckoutUserModes.user && (
                    <ButtonPrimary
                        onClick={() => setFormVisible(!formVisible)}
                        size={EButtonSize.sm}
                    >
                        Add a new card
                    </ButtonPrimary>
                )}
            </div>
            {formVisible && (
                <FormProvider {...methods}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`${classPrefix}_form`}
                    >
                        <FieldInputController
                            name={EPaymentMethodFromFieldsNames.nameOnCard}
                            label="Name on the card"
                            floatingLabel={true}
                        />
                        <FieldInputController
                            name={EPaymentMethodFromFieldsNames.cardNumber}
                            label="Card number"
                            floatingLabel={true}
                        />
                        <div className={`${classPrefix}_form__sub-fields`}>
                            <FieldInputController
                                name={EPaymentMethodFromFieldsNames.cvv}
                                label="CVV"
                                floatingLabel={true}
                                wrapperClassName={"_cvv"}
                            />
                            <FieldInputController
                                name={EPaymentMethodFromFieldsNames.expDate}
                                label="Exp. date"
                                floatingLabel={true}
                                wrapperClassName={"_exp"}
                            />
                        </div>
                    </form>
                </FormProvider>
            )}
            <div className={`${classPrefix}_discount-code__wrapper`}>
                <H4>Discount code</H4>
                <div className={`${classPrefix}_discount-code__inner-wrapper`}>
                    <FormFieldInput
                        name="discountCode"
                        errorMessage={undefined}
                    />
                    <ButtonPrimary
                        onClick={() => notImplemented()}
                        color={EButtonColor.orange}
                        size={EButtonSize.sm}
                    >
                        Apply
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    );
};

export default OrderPaymentMethod;
