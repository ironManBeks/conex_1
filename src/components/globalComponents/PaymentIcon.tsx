import { FC } from "react";
import cn from "classnames";

import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TPaymentIconProps } from "@components/globalComponents/types";

const PaymentIcon: FC<TPaymentIconProps> = ({
    wrapperClassName,
    src,
    title,
    alt,
}) => {
    if (!src) return null;
    return (
        <div className={cn(`payment-icon_wrapper`, wrapperClassName)}>
            <ImgWrapper src={src} title={title} alt={alt} />
        </div>
    );
};

export default PaymentIcon;
