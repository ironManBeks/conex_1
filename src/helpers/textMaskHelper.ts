export const paymentCardNumberMask = (val: string): string => {
    return val
        .replace(/[^0-9]/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
};
