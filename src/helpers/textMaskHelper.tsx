import { ReactNode } from "react";
import { IconPoint } from "@components/Icons";

export const paymentCardNumberMask = (
    val: string,
    trimVal?: boolean,
): string | ReactNode => {
    const icon = <IconPoint width={12} height={12} />;

    return trimVal ? (
        <>
            {icon}
            {icon}
            {icon}
            {icon}
            {val.substring(val.length - 4)}
        </>
    ) : (
        val
            .replace(/[^0-9]/gi, "")
            .replace(/(.{4})/g, "$1 ")
            .trim()
    );
};
