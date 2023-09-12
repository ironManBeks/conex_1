import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCalendar: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "24"}
            height={height || "24"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.3999 2C8.95219 2 9.3999 2.44772 9.3999 3V3.8H14.5999V3C14.5999 2.44772 15.0476 2 15.5999 2C16.1522 2 16.5999 2.44772 16.5999 3V3.8H18.2999C19.8463 3.8 21.0999 5.0536 21.0999 6.6V19.2C21.0999 20.7464 19.8463 22 18.2999 22H5.6999C4.15351 22 2.8999 20.7464 2.8999 19.2V6.6C2.8999 5.0536 4.15351 3.8 5.6999 3.8H7.3999V3C7.3999 2.44772 7.84762 2 8.3999 2ZM7.3999 5.8H5.6999C5.25807 5.8 4.8999 6.15817 4.8999 6.6V9.2H19.0999V6.6C19.0999 6.15817 18.7417 5.8 18.2999 5.8H16.5999V6.6C16.5999 7.15228 16.1522 7.6 15.5999 7.6C15.0476 7.6 14.5999 7.15228 14.5999 6.6V5.8H9.3999V6.6C9.3999 7.15228 8.95219 7.6 8.3999 7.6C7.84762 7.6 7.3999 7.15228 7.3999 6.6V5.8ZM19.0999 11.2H4.8999V19.2C4.8999 19.6418 5.25807 20 5.6999 20H18.2999C18.7417 20 19.0999 19.6418 19.0999 19.2V11.2Z"
            />
        </svg>
    );
};

export default IconCalendar;
