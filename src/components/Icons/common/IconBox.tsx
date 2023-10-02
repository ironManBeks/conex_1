import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconBox: FC<IIcon> = ({
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
                d="M7.99967 0.667969C7.64915 0.667969 7.30479 0.760092 7.0011 0.935094L4.87056 2.15255C4.73046 2.18026 4.59979 2.25263 4.5014 2.3635L2.33558 3.60111L2.33558 3.6011L2.33301 3.60258C2.08636 3.74499 1.87365 3.93802 1.70841 4.16815C1.66817 4.2084 1.63245 4.25451 1.6026 4.30612C1.57688 4.35058 1.55687 4.39677 1.54234 4.44385C1.40522 4.71948 1.33333 5.0236 1.33301 5.33258V5.33327V10.6666V10.6673C1.33337 11.018 1.42595 11.3625 1.60147 11.6661C1.77699 11.9698 2.02927 12.2219 2.33301 12.3973L2.33558 12.3988L6.99967 15.064L7.00091 15.0647C7.21238 15.1866 7.44357 15.2683 7.68284 15.3066C7.77708 15.3576 7.885 15.3866 7.99967 15.3866C8.11436 15.3866 8.22226 15.3576 8.3165 15.3066C8.55579 15.2683 8.787 15.1865 8.99848 15.0646L8.99967 15.064L13.6638 12.3988L13.6663 12.3973C13.9701 12.2219 14.2224 11.9698 14.3979 11.6661C14.5734 11.3625 14.666 11.018 14.6663 10.6673V10.6666V5.33327V5.33258C14.666 5.02357 14.5941 4.71942 14.457 4.44377C14.4424 4.39672 14.4224 4.35055 14.3967 4.30612C14.3669 4.25453 14.3312 4.20844 14.291 4.1682C14.1257 3.93805 13.913 3.74499 13.6663 3.60258L13.6638 3.60111L8.99967 0.935918L8.99828 0.935116C8.69458 0.7601 8.35021 0.667969 7.99967 0.667969ZM8.66634 13.7188L12.9997 11.2426L13.0007 11.242C13.1015 11.1835 13.1852 11.0997 13.2435 10.9989C13.302 10.8976 13.3329 10.7828 13.333 10.6659V5.69162L8.66634 8.39113V13.7188ZM7.33301 8.39114L2.66634 5.69163V10.6662C2.66651 10.783 2.69737 10.8977 2.75583 10.9989C2.81413 11.0997 2.89785 11.1835 2.99862 11.242L2.99967 11.2426L7.33301 13.7188V8.39114ZM8.33558 2.0921L12.6403 4.55196L11.0031 5.49903L6.37361 2.82933L7.66377 2.0921L7.66377 2.0921L7.66634 2.09062C7.76769 2.03211 7.88265 2.0013 7.99967 2.0013C8.1167 2.0013 8.23166 2.03211 8.33301 2.09062L8.333 2.09062L8.33558 2.0921ZM7.99967 7.23643L9.6707 6.2698L5.033 3.59539L3.35899 4.55196L7.99967 7.23643Z"
            />
        </svg>
    );
};

export default IconBox;