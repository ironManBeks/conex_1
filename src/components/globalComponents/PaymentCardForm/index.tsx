import { FC, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";

import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import FieldInputController from "@components/form/formControllers/FieldInputController";
import { IconCreditCard } from "@components/Icons";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";

import {
    EPaymentCardFromFieldsNames,
    paymentCardFromDefaultValues,
    paymentCardFromResolver,
    TPaymentCardFrom,
} from "./formAttrs";
import { notImplemented } from "@helpers/notImplemented";
import {
    CARD_AMERICAN_EXPRESS_REGEX,
    CARD_CVV_REGEX,
    CARD_EXPIRY_DATE_REGEX,
    CARD_ICON,
    CARDS_LIST,
    CARDS_REGEX,
    EPaymentCardNames,
} from "@components/globalComponents/PaymentCardForm/consts";
import { TPaymentCardFormSection } from "./types";
import {
    findDebitCardType,
    stripeCardExpValidation,
} from "@helpers/paymentMethodHelpers";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { pickOutErrorMessages } from "@helpers/errorsHelper";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const PaymentCardForm: FC<TPaymentCardFormSection> = ({
    className,
    submitText,
    actionsContent,
}) => {
    const classPrefix = "payment-card-form";
    const [cardType, setCardType] = useState<EPaymentCardNames | undefined>();

    const methods = useForm<TPaymentCardFrom>({
        resolver: paymentCardFromResolver(),
        defaultValues: paymentCardFromDefaultValues as TPaymentCardFrom,
    });

    const {
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        clearErrors,
    } = methods;
    const cardNumberValue = watch(EPaymentCardFromFieldsNames.cardNumber);
    const expDateValue = watch(EPaymentCardFromFieldsNames.expDate);

    const onSubmit: SubmitHandler<TPaymentCardFrom> = (data) => {
        notImplemented(`value: ${JSON.stringify(data)}`);
    };

    useEffect(() => {
        setCardType(findDebitCardType(cardNumberValue));
    }, [cardNumberValue]);

    useEffect(() => {
        if (expDateValue) {
            const validationText = stripeCardExpValidation(expDateValue);
            if (validationText) {
                setError(EPaymentCardFromFieldsNames.expDate, {
                    type: "manual",
                    message: validationText,
                });
            } else clearErrors(EPaymentCardFromFieldsNames.expDate);
        }
    }, [expDateValue]);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={cn(`${classPrefix}_form`, className)}
            >
                <FieldInputController
                    name={EPaymentCardFromFieldsNames.nameOnCard}
                    label="Name on the card"
                    floatingLabel={true}
                    wrapperClassName={"_name"}
                    maxLength={26}
                />
                <FieldInputMaskController
                    name={EPaymentCardFromFieldsNames.cardNumber}
                    label="Card number"
                    floatingLabel={true}
                    mask={
                        ["37", "34"].includes(
                            cardNumberValue &&
                                cardNumberValue.split("").splice(0, 2).join(""),
                        )
                            ? CARD_AMERICAN_EXPRESS_REGEX
                            : CARDS_REGEX
                    }
                    minAddonWidth={60}
                    addonAfter={
                        cardType && CARDS_LIST.includes(cardType) ? (
                            <ImgWrapper
                                src={CARD_ICON[cardType]}
                                width={50}
                                height={24}
                            />
                        ) : (
                            <IconCreditCard />
                        )
                    }
                    guide={false}
                    saveOnlyNumber={false}
                />
                <div className={`${classPrefix}_form__sub-fields`}>
                    <FieldInputMaskController
                        name={EPaymentCardFromFieldsNames.cvv}
                        label="CVV"
                        floatingLabel={true}
                        wrapperClassName={"_cvv"}
                        mask={CARD_CVV_REGEX}
                        guide={false}
                        showError={false}
                        saveOnlyNumber={false}
                    />
                    <FieldInputMaskController
                        name={EPaymentCardFromFieldsNames.expDate}
                        label="Exp. date"
                        floatingLabel={true}
                        wrapperClassName={"_exp"}
                        mask={CARD_EXPIRY_DATE_REGEX}
                        showError={false}
                        saveOnlyNumber={false}
                    />
                </div>
                <div className={`${classPrefix}_errors`}>
                    {pickOutErrorMessages<
                        FieldErrors<TPaymentCardFrom>,
                        EPaymentCardFromFieldsNames[]
                    >(errors, [
                        EPaymentCardFromFieldsNames.nameOnCard,
                        EPaymentCardFromFieldsNames.cardNumber,
                    ]).map((item, index) => (
                        <P key={index}>{item}</P>
                    ))}
                </div>
                {submitText && (
                    <div className={`${classPrefix}_actions`}>
                        {actionsContent && actionsContent}
                        <ButtonPrimary
                            type="submit"
                            color={EButtonColor.secondary}
                            size={EButtonSize.sm}
                        >
                            {submitText}
                        </ButtonPrimary>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};

export default PaymentCardForm;

// Validations logic
// https://medium.com/@surajps975/complete-frontend-card-validations-reactjs-305f44c2805
