import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconPlusCircle: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "15"}
            height={height || "15"}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 27 27"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <path
                d="M13.5 24.75C19.6875 24.75 24.75 19.6875 24.75 13.5C24.75 7.3125 19.6875 2.25 13.5 2.25C7.3125 2.25 2.25 7.3125 2.25 13.5C2.25 19.6875 7.3125 24.75 13.5 24.75Z"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9 13.5H18"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.5 18V9"
                stroke={color || DEFAULT_ICON_COLOR}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconPlusCircle;
