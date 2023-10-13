import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconDrag: FC<IIcon> = ({
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
            <circle cx="9.5" cy="5.5" r="1.5" />
            <circle cx="9.5" cy="11.5" r="1.5" />
            <circle cx="9.5" cy="17.5" r="1.5" />
            <circle cx="14.5" cy="5.5" r="1.5" />
            <circle cx="14.5" cy="11.5" r="1.5" />
            <circle cx="14.5" cy="17.5" r="1.5" />
        </svg>
    );
};

export default IconDrag;
