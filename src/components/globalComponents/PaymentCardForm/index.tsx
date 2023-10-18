import { FC, useEffect, useImperativeHandle, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import cn from "classnames";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import FieldInputMaskController from "@components/form/formControllers/FieldInputMaskController";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { P } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { IconQuestionCircle } from "@components/Icons";
import Tooltip from "@components/globalComponents/Tooltip";

import {
    EPaymentCardFromFieldsNames,
    paymentCardFromDefaultValues,
    paymentCardFromResolver,
    TPaymentCardForm,
} from "./formAttrs";
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
import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

const PaymentCardForm: FC<TPaymentCardFormSection> = ({
    className,
    submitText,
    actionsContent,
    onSuccessfulSubmit,
    defaultValues,
    reference,
    subText,
}) => {
    const classPrefix = "payment-card-form";
    const [cardType, setCardType] = useState<EPaymentCardNames | undefined>();

    const methods = useForm<TPaymentCardForm>({
        resolver: paymentCardFromResolver(),
        defaultValues:
            defaultValues || (paymentCardFromDefaultValues as TPaymentCardForm),
    });

    const {
        handleSubmit,
        watch,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = methods;
    const cardNumberValue = watch(EPaymentCardFromFieldsNames.cardNumber);
    const expDateValue = watch(EPaymentCardFromFieldsNames.expDate);

    const onSubmit: SubmitHandler<TPaymentCardForm> = (data) => {
        if (onSuccessfulSubmit) {
            onSuccessfulSubmit(data);
        }
        reset();
    };

    useImperativeHandle(reference, () => ({
        reset: (newData?: TPaymentCardForm) => {
            reset(
                newData ?? (paymentCardFromDefaultValues as TPaymentCardForm),
            );
        },
    }));

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
            <form className={cn(`${classPrefix}_form`, className)}>
                <div className={`${classPrefix}_inner`}>
                    {/*<FieldInputController*/}
                    {/*    name={EPaymentCardFromFieldsNames.nameOnCard}*/}
                    {/*    label="Name on the card"*/}
                    {/*    wrapperClassName={"_name"}*/}
                    {/*    maxLength={26}*/}
                    {/*/>*/}
                    {cardType && CARDS_LIST.includes(cardType) && (
                        <ImgWrapper
                            src={CARD_ICON[cardType]}
                            width={50}
                            height={24}
                            alt="Card"
                        />
                    )}
                    <FieldInputMaskController
                        name={EPaymentCardFromFieldsNames.cardNumber}
                        label="Card number"
                        isFloatingLabel={true}
                        mask={
                            ["37", "34"].includes(
                                cardNumberValue &&
                                    cardNumberValue
                                        .split("")
                                        .splice(0, 2)
                                        .join(""),
                            )
                                ? CARD_AMERICAN_EXPRESS_REGEX
                                : CARDS_REGEX
                        }
                        // minAddonWidth={60}
                        // addonAfter={
                        //     cardType && CARDS_LIST.includes(cardType) ? (
                        //         <ImgWrapper
                        //             src={CARD_ICON[cardType]}
                        //             width={50}
                        //             height={24}
                        //         />
                        //     ) : (
                        //         <IconCreditCard />
                        //     )
                        // }
                        guide={false}
                        saveOnlyNumber={false}
                    />
                    <div className={`${classPrefix}_form__sub-fields`}>
                        <FieldInputMaskController
                            name={EPaymentCardFromFieldsNames.expDate}
                            label="Exp date"
                            wrapperClassName={"_exp"}
                            mask={CARD_EXPIRY_DATE_REGEX}
                            showError={false}
                            saveOnlyNumber={false}
                        />
                        <FieldInputMaskController
                            name={EPaymentCardFromFieldsNames.cvv}
                            label="CVV/CVC"
                            wrapperClassName={"_cvv"}
                            mask={CARD_CVV_REGEX}
                            guide={false}
                            showError={false}
                            saveOnlyNumber={false}
                            addonAfter={
                                <Tooltip
                                    placement="top"
                                    title="The last digits on the back of the card"
                                >
                                    <span>
                                        <IconQuestionCircle opacity={"0.36"} />
                                    </span>
                                </Tooltip>
                            }
                        />
                    </div>
                    {!!pickOutFormErrorMessages<
                        FieldErrors<TPaymentCardForm>,
                        EPaymentCardFromFieldsNames[]
                    >(errors, [
                        // EPaymentCardFromFieldsNames.nameOnCard,
                        EPaymentCardFromFieldsNames.cardNumber,
                    ]).length && (
                        <div className={`${classPrefix}_errors`}>
                            {pickOutFormErrorMessages<
                                FieldErrors<TPaymentCardForm>,
                                EPaymentCardFromFieldsNames[]
                            >(errors, [
                                // EPaymentCardFromFieldsNames.nameOnCard,
                                EPaymentCardFromFieldsNames.cardNumber,
                            ]).map((item, index) => (
                                <P key={index}>{item}</P>
                            ))}
                        </div>
                    )}
                </div>
                {subText?.top && <P className="_top-text">{subText?.top}</P>}
                {submitText && (
                    <div className={`${classPrefix}_actions`}>
                        {actionsContent && actionsContent}
                        <ButtonPrimary
                            color={EButtonColor.secondary}
                            size={EButtonSize.md}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {submitText}
                        </ButtonPrimary>
                    </div>
                )}
                {subText?.bottom && (
                    <P className="_bottom-text">{subText?.bottom}</P>
                )}
            </form>
        </FormProvider>
    );
};

export default PaymentCardForm;

// Validations logic
// https://medium.com/@surajps975/complete-frontend-card-validations-reactjs-305f44c2805
