import dayjs from "dayjs";
import { EPaymentCardNames } from "@components/globalComponents/PaymentCardForm/consts";

export const findDebitCardType = (
    cardNumber: string,
): EPaymentCardNames | undefined => {
    const regexPattern: Record<EPaymentCardNames, RegExp> = {
        [EPaymentCardNames.mastercard]: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
        [EPaymentCardNames.visa]: /^4[0-9]{2,}$/,
        [EPaymentCardNames.amex]: /^3[47][0-9]{5,}$/,
        [EPaymentCardNames.discover]: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        [EPaymentCardNames.dinersClub]: /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
        [EPaymentCardNames.jcb]: /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
    };
    let card: EPaymentCardNames;
    for (card in regexPattern) {
        if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
            return card;
    }
    return undefined;
};

export const stripeCardExpValidation = (value: string): string | undefined => {
    if (value) {
        if (/^(0[1-9]|1[0-2])\/[0-9]{2}$/i.test(value.trim())) {
            const today = new Date();
            const CurrentDate = dayjs(
                new Date(
                    today.getFullYear() +
                        "-" +
                        (today.getMonth() + 1) +
                        "-" +
                        new Date(
                            today.getFullYear(),
                            today.getMonth() + 1,
                            0,
                        ).getDate(),
                ),
            );
            const visaValue = value.split("/");
            const visaDate = new Date(
                Number(`20${visaValue[1]}`),
                Number(visaValue[0]),
                0,
            );
            return CurrentDate < dayjs(visaDate)
                ? undefined
                : "Invalid date format";
        } else {
            return "Invalid date format";
        }
    }
};
