import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver } from "react-hook-form";

import { TNullable } from "@globalTypes/commonTypes";
import { TUserData } from "@store/auth/types";
import {
    yupEmailRequired,
    yupNameRequired,
    yupPhoneRequired,
} from "@consts/validationConsts";
import { renderValidationText } from "@helpers/formHelpers";

export const COMMENT_ORDER_MAX_MESSAGE_LENGTH = 500;

export enum ECheckoutGetMode {
    delivery = "delivery",
    storePickup = "storePickup",
}

export enum EPaymentMethodValues {
    // paypal = "paypal",
    // amazonPay = "amazonPay",
    bankTransfer = "bankTransfer",
    creditDebitCard = "creditDebitCard",
}

export enum ECheckoutFormFieldsNames {
    // Delivery
    getMode = "getMode",
    // Details
    firstName = "firstName",
    lastName = "lastName",
    email = "email",
    phone = "phone",
    receiveNews = "receiveNews",
    // Shipping
    deliveryService = "deliveryService",
    state = "state",
    city = "city",
    streetAddress = "streetAddress",
    commentsOrder = "commentsOrder",
    pickupPoints = "pickupPoints",
    // Payment
    paymentMethod = "paymentMethod",
    // Additional services
    additionalServices = "additionalServices",
}

export type TReferenceShippingProps<T extends ECheckoutGetMode, E> = {
    [ECheckoutFormFieldsNames.getMode]: T;
} & E;

export type TCheckoutFormDetails = {
    [ECheckoutFormFieldsNames.firstName]: string;
    [ECheckoutFormFieldsNames.lastName]: string;
    [ECheckoutFormFieldsNames.email]: string;
    [ECheckoutFormFieldsNames.phone]: string;
    [ECheckoutFormFieldsNames.receiveNews]: boolean;
};

export type TCheckoutFormPayment = {
    [ECheckoutFormFieldsNames.paymentMethod]: string;
};

export type TCheckoutFormAdditionalServices = {
    [ECheckoutFormFieldsNames.additionalServices]: string[];
};

type TPickupOrShipping =
    | TReferenceShippingProps<
          ECheckoutGetMode.storePickup,
          {
              [ECheckoutFormFieldsNames.state]: string;
              [ECheckoutFormFieldsNames.city]: string;
          }
      >
    | TReferenceShippingProps<
          ECheckoutGetMode.delivery,
          {
              [ECheckoutFormFieldsNames.deliveryService]?: string;
              [ECheckoutFormFieldsNames.streetAddress]: string;
              [ECheckoutFormFieldsNames.commentsOrder]?: string;
          }
      >;

export type TCheckoutForm = TCheckoutFormDetails &
    TCheckoutFormPayment &
    TCheckoutFormAdditionalServices &
    TPickupOrShipping;

export const checkoutFormDefaultValues = (
    data?: TNullable<TUserData>,
): TCheckoutForm => {
    return {
        [ECheckoutFormFieldsNames.getMode]: ECheckoutGetMode.delivery,
        //
        [ECheckoutFormFieldsNames.firstName]: data?.first_name ?? "",
        [ECheckoutFormFieldsNames.lastName]: data?.last_name ?? "",
        [ECheckoutFormFieldsNames.email]: data?.email ?? "",
        [ECheckoutFormFieldsNames.phone]: data?.phone ?? "",
        [ECheckoutFormFieldsNames.receiveNews]: true,
        //
        [ECheckoutFormFieldsNames.deliveryService]: "",
        [ECheckoutFormFieldsNames.streetAddress]: data?.address ?? "",
        [ECheckoutFormFieldsNames.commentsOrder]: "",
        //
        [ECheckoutFormFieldsNames.paymentMethod]: "",
        //
        [ECheckoutFormFieldsNames.additionalServices]: [],
    };
};

export const checkoutFormResolver = (): Resolver<TCheckoutForm> => {
    const requiredText = "This field is required";

    // ToDo Remove ts-ignore (should work, but for some reason in a typing error)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return yupResolver(
        yup.object().shape({
            [ECheckoutFormFieldsNames.getMode]: yup
                .mixed<ECheckoutGetMode>()
                .oneOf(Object.values(ECheckoutGetMode))
                .required(),
            [ECheckoutFormFieldsNames.firstName]: yupNameRequired(),
            [ECheckoutFormFieldsNames.lastName]: yupNameRequired(true),
            [ECheckoutFormFieldsNames.email]: yupEmailRequired(),
            [ECheckoutFormFieldsNames.phone]: yupPhoneRequired(),
            [ECheckoutFormFieldsNames.receiveNews]: yup
                .boolean()
                .required(requiredText),
            // ____________________________________________________
            [ECheckoutFormFieldsNames.state]: yup
                .string()
                .when(ECheckoutFormFieldsNames.getMode, {
                    is: ECheckoutGetMode.storePickup,
                    then: (schema) =>
                        schema
                            .max(50, renderValidationText("max", undefined, 50))
                            .required(requiredText)
                            .trim(),
                    otherwise: (schema) => schema,
                }),
            [ECheckoutFormFieldsNames.city]: yup
                .string()
                .when(ECheckoutFormFieldsNames.getMode, {
                    is: ECheckoutGetMode.storePickup,
                    then: (schema) =>
                        schema
                            .max(50, renderValidationText("max", undefined, 50))
                            .required(requiredText)
                            .trim(),
                    otherwise: (schema) => schema,
                }),
            // ____________________________________________________
            [ECheckoutFormFieldsNames.deliveryService]: yup.string(),
            [ECheckoutFormFieldsNames.streetAddress]: yup
                .string()
                .when(ECheckoutFormFieldsNames.getMode, {
                    is: ECheckoutGetMode.delivery,
                    then: (schema) =>
                        schema
                            .max(
                                100,
                                renderValidationText("max", undefined, 100),
                            )
                            .required(requiredText)
                            .trim(),
                    otherwise: (schema) => schema,
                }),
            [ECheckoutFormFieldsNames.commentsOrder]: yup
                .string()
                .when(ECheckoutFormFieldsNames.getMode, {
                    is: ECheckoutGetMode.delivery,
                    then: (schema) =>
                        schema
                            .max(
                                COMMENT_ORDER_MAX_MESSAGE_LENGTH,
                                renderValidationText(
                                    "max",
                                    undefined,
                                    COMMENT_ORDER_MAX_MESSAGE_LENGTH,
                                ),
                            )
                            .trim(),
                    otherwise: (schema) => schema,
                }),
            // ____________________________________________________
            [ECheckoutFormFieldsNames.paymentMethod]: yup
                .string()
                .required(requiredText),
            [ECheckoutFormFieldsNames.additionalServices]: yup
                .array()
                .of(yup.string().required(requiredText))
                .required(requiredText),
        }),
    );
};
