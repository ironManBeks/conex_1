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
            height={height || "24"}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 24"
            fill={color || DEFAULT_ICON_COLOR}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 18C2 17.4477 2.44772 17 3 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18Z"
            />
        </svg>
    );
};

export default IconBurger;
