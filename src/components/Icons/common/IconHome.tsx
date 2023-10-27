import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconHome: FC<IIcon> = ({
    color,
    className,
    width,
    height,
    onClick,
    opacity,
}) => {
    return (
        <svg
            width={width || "16"}
            height={height || "16"}
            fill="none"
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fillOpacity={opacity}
        >
            <path
                d="M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 14.6667V8H10V14.6667"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconHome;
