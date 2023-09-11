export const paymentCardNumberMask = (
    val: string,
    trimVal?: boolean,
): string => {
    return trimVal
        ? `* * * * ${val.substring(val.length - 4)}`
        : val
              .replace(/[^0-9]/gi, "")
              .replace(/(.{4})/g, "$1 ")
              .trim();
};
