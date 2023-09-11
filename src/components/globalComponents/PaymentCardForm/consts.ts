// import IconVisa from "/images/paymentCardIcons/payment-visa-icon.svg";
// import IconMastercard from "/images/paymentCardIcons/payment-mastercard-icon.svg";
// import IconAmex from "/images/paymentCardIcons/payment-amex-icon.svg";
// import IconDiscover from "/images/paymentCardIcons/payment-discover-icon.svg";
// import IconDinersClub from "/images/paymentCardIcons/payment-diners-club-icon.svg";
// import IconJcb from "/images/paymentCardIcons/payment-jcb-icon.svg";

export enum EPaymentCardNames {
    visa = "VISA",
    mastercard = "MASTERCARD",
    amex = "AMERICAN_EXPRESS",
    discover = "DISCOVER",
    dinersClub = "DINERS_CLUB",
    jcb = "JCB",
}

export const CARDS_REGEX = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const CARD_AMERICAN_EXPRESS_REGEX = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const CARD_EXPIRY_DATE_REGEX = [/[0-9]/, /\d/, "/", /\d/, /\d/];
export const CARD_CVV_REGEX = [/[0-9]/, /\d/, /\d/, /\d/];

export const CARDS_LIST = [
    EPaymentCardNames.visa,
    EPaymentCardNames.mastercard,
    EPaymentCardNames.amex,
    EPaymentCardNames.discover,
    EPaymentCardNames.dinersClub,
    EPaymentCardNames.jcb,
];

export const CARD_ICON: Record<EPaymentCardNames, string> = {
    [EPaymentCardNames.visa]: "/images/paymentCardIcons/payment-visa-icon.svg",
    [EPaymentCardNames.mastercard]:
        "/images/paymentCardIcons/payment-mastercard-icon.svg",
    [EPaymentCardNames.amex]: "/images/paymentCardIcons/payment-amex-icon.svg",
    [EPaymentCardNames.discover]:
        "/images/paymentCardIcons/payment-discover-icon.svg",
    [EPaymentCardNames.dinersClub]:
        "/images/paymentCardIcons/payment-diners-club-icon.svg",
    [EPaymentCardNames.jcb]: "/images/paymentCardIcons/payment-jcb-icon.svg",
};

export const CARD_NAME: Record<EPaymentCardNames, string> = {
    [EPaymentCardNames.visa]: "Visa",
    [EPaymentCardNames.mastercard]: "Mastercard",
    [EPaymentCardNames.amex]: "AmEx",
    [EPaymentCardNames.discover]: "Discover",
    [EPaymentCardNames.dinersClub]: "Diners Club",
    [EPaymentCardNames.jcb]: "JCB",
};
