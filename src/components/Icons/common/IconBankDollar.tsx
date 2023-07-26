import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconBankDollar: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "18"}
            height={height || "18"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8.55 0V0.9C7.80975 0.9 7.2 1.50975 7.2 2.25C7.2 2.99025 7.80975 3.6 8.55 3.6H9.45C9.70386 3.6 9.9 3.79614 9.9 4.05C9.9 4.30386 9.70386 4.5 9.45 4.5H8.55H7.2V5.4H8.55V6.3H9.45V5.4C10.1903 5.4 10.8 4.79025 10.8 4.05C10.8 3.30975 10.1903 2.7 9.45 2.7H8.55C8.29614 2.7 8.1 2.50386 8.1 2.25C8.1 1.99614 8.29614 1.8 8.55 1.8H9.45H10.8V0.9H9.45V0H8.55ZM6.3 3.53145L0 5.51953V5.85V8.1H0.9V15.3H0V18H18V15.3H17.55H17.1V8.1H18V5.51953L11.7 3.53145V4.47363L17.1 6.18047V7.2H0.9V6.17871L6.3 4.47363V3.53145ZM1.8 8.1H2.7V15.3H1.8V8.1ZM3.6 8.1H5.4V15.3H3.6V8.1ZM6.3 8.1H7.2V15.3H6.3V8.1ZM8.1 8.1H9.9V15.3H8.1V8.1ZM10.8 8.1H11.7V15.3H10.8V8.1ZM12.6 8.1H14.4V15.3H12.6V8.1ZM15.3 8.1H16.2V15.3H15.3V8.1ZM0.9 16.2H3.6H5.4H8.1H9.9H12.6H14.4H17.1V17.1H0.9V16.2Z" />
        </svg>
    );
};

export default IconBankDollar;
