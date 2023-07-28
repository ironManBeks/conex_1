import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCopy: FC<IIcon> = ({ color, className, width, height, onClick }) => {
    return (
        <svg
            width={width || "20"}
            height={height || "25"}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            fill="none"
            viewBox="0 0 20 25"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <rect
                x="0.5"
                y="0.5"
                width="17"
                height="21"
                rx="0.5"
                stroke={color || DEFAULT_ICON_COLOR}
            />
            <rect
                x="2.5"
                y="3.5"
                width="17"
                height="21"
                rx="0.5"
                fill="white"
                stroke={color || DEFAULT_ICON_COLOR}
            />
        </svg>
    );
};

export default IconCopy;
