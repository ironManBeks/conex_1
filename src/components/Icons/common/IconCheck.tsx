import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCheck: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "16"}
            height={height || "16"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.8047 3.52859C14.0651 3.78894 14.0651 4.21105 13.8047 4.4714L6.4714 11.8047C6.21106 12.0651 5.78894 12.0651 5.5286 11.8047L2.19526 8.4714C1.93491 8.21105 1.93491 7.78894 2.19526 7.52859C2.45561 7.26824 2.87772 7.26824 3.13807 7.52859L6 10.3905L12.8619 3.52859C13.1223 3.26824 13.5444 3.26824 13.8047 3.52859Z"
            />
        </svg>
    );
};

export default IconCheck;
