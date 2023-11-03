import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconFacebook: FC<IIcon> = ({
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
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fillOpacity={opacity}
        >
            <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
        </svg>
    );
};

export default IconFacebook;
