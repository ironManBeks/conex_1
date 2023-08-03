import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCross: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "17"}
            height={height || "17"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 17 17"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.54 8.19L16.11 1.62C16.47 1.26 16.47 0.675 16.11 0.27C15.75 -0.09 15.165 -0.09 14.76 0.27L8.19 6.84L1.62 0.27C1.26 -0.09 0.675 -0.09 0.27 0.27C-0.09 0.63 -0.09 1.215 0.27 1.62L6.84 8.19L0.27 14.76C-0.09 15.12 -0.09 15.705 0.27 16.11C0.45 16.29 0.72 16.38 0.945 16.38C1.17 16.38 1.44 16.29 1.62 16.11L8.19 9.54L14.76 16.11C14.94 16.29 15.165 16.38 15.435 16.38C15.66 16.38 15.93 16.29 16.11 16.11C16.47 15.75 16.47 15.165 16.11 14.76L9.54 8.19Z" />
        </svg>
    );
};

export default IconCross;
