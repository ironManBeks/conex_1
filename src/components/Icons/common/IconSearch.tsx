import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconSearch: FC<IIcon> = ({
    color,
    className,
    width,
    height,
    onClick,
    opacity,
}) => {
    return (
        <svg
            width={width || "16"}
            height={height || "16"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
            fillOpacity={opacity}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.40741 3.33333C5.15736 3.33333 3.33333 5.15736 3.33333 7.40741C3.33333 9.65746 5.15736 11.4815 7.40741 11.4815C9.65746 11.4815 11.4815 9.65746 11.4815 7.40741C11.4815 5.15736 9.65746 3.33333 7.40741 3.33333ZM2 7.40741C2 4.42098 4.42098 2 7.40741 2C10.3938 2 12.8148 4.42098 12.8148 7.40741C12.8148 10.3938 10.3938 12.8148 7.40741 12.8148C4.42098 12.8148 2 10.3938 2 7.40741Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2841 10.2841C10.5445 10.0238 10.9666 10.0238 11.2269 10.2841L13.8047 12.8619C14.0651 13.1223 14.0651 13.5444 13.8047 13.8047C13.5444 14.0651 13.1223 14.0651 12.8619 13.8047L10.2841 11.2269C10.0238 10.9666 10.0238 10.5445 10.2841 10.2841Z"
            />
        </svg>
    );
};

export default IconSearch;
