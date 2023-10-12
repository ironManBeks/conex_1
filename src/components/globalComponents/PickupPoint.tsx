import { FC } from "react";
import cn from "classnames";
import dayjs from "dayjs";

import { H4, P } from "@components/Text";
import { IconBox } from "@components/Icons";

import { TPickupPoint } from "./types";

const PickupPoint: FC<TPickupPoint & { className?: string }> = ({
    className,
    title,
    description,
    deliveryDate,
    deliveryTimeFrom,
    deliveryTimeTo,
}) => {
    const classPrefix = `pickup-point`;

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <div className={`${classPrefix}_title`}>
                <H4>{title}</H4>
                {description && <P>{description}</P>}
            </div>
            <div className={`${classPrefix}_details`}>
                <H4>
                    <IconBox /> {dayjs(deliveryDate).format("MMMM D")}
                </H4>
                <P>
                    {deliveryTimeFrom} - {deliveryTimeTo}
                </P>
            </div>
        </div>
    );
};

export default PickupPoint;
