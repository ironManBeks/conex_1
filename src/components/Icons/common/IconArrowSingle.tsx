import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
    ICON_ARROW_CLASSNAME,
} from "@components/Icons/consts";

import { EArrowDirection, TIconArrow } from "../types";

const IconArrowSingle: FC<TIconArrow> = ({
    color,
    className,
    width,
    height,
    direction = EArrowDirection.top,
}) => {
    return (
        <svg
            width={width || "5"}
            height={height || "3"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(
                DEFAULT_ICON_CLASSNAME,
                ICON_ARROW_CLASSNAME,
                className,
                direction,
            )}
            viewBox="0 0 5 3"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.92692 2.78348C5.02436 2.68225 5.02436 2.51836 4.92692 2.41739L2.86103 0.276643C2.66591 0.0744525 2.34937 0.0744525 2.15425 0.276643L0.0731152 2.43289C-0.0233213 2.53308 -0.0245709 2.69494 0.0706166 2.79642C0.167803 2.90023 0.327946 2.90123 0.426631 2.79923L2.33088 0.825715C2.42856 0.72449 2.58671 0.72449 2.6844 0.825715L4.57365 2.78348C4.67109 2.8847 4.82948 2.8847 4.92692 2.78348Z"
                fillOpacity="0.81"
            />
        </svg>
    );
};

export default IconArrowSingle;
