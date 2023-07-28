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

const PaymentCardForm: FC<TPaymentCardFormSection> = ({ className }) => {
    const classPrefix = "payment-card-form";
    const [cardType, setCardType] = useState<EPaymentCardNames | undefined>();

    const methods = useForm<TPaymentCardFrom>({
        resolver: paymentCardFromResolver(),
        // ToDo remove "as"
        defaultValues: paymentCardFromDefaultValues as TPaymentCardFrom,
        // mode: "all",
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
        console.log("SubmitHandler", data);
        notImplemented(`value: ${JSON.stringify(data)}`);
    };

    useEffect(() => {
        setCardType(findDebitCardType(cardNumberValue));
    }, [cardNumberValue]);

    useEffect(() => {
        console.log("expDateValue", expDateValue);
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
                    />
                    <FieldInputMaskController
                        name={EPaymentCardFromFieldsNames.expDate}
                        label="Exp. date"
                        floatingLabel={true}
                        wrapperClassName={"_exp"}
                        mask={CARD_EXPIRY_DATE_REGEX}
                        showError={false}
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
            </form>
        </FormProvider>
    );
};

export default PaymentCardForm;

// Validations logic
// https://medium.com/@surajps975/complete-frontend-card-validations-reactjs-305f44c2805
