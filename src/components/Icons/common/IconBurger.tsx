import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconBurger: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "24"}
            height={height || "14"}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 14"
            fill={color || DEFAULT_ICON_COLOR}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 1C0 1.55228 0.447715 2 1 2H23C23.5523 2 24 1.55228 24 1C24 0.447715 23.5523 0 23 0H12.72H1C0.447715 0 0 0.447715 0 1Z" />
            <rect y="4" width="24" height="2" rx="1" />
            <rect y="8" width="24" height="2" rx="1" />
            <rect y="12" width="24" height="2" rx="1" />
        </svg>
    );
};

export default IconBurger;
