import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconZoomOut: FC<IIcon> = ({
    color,
    className,
    width,
    height,
    onClick,
    opacity,
}) => {
    return (
        <svg
            width={width || "24"}
            height={height || "24"}
            fill="none"
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fillOpacity={opacity}
        >
            <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 21L16.65 16.65"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 11H14"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconZoomOut;
