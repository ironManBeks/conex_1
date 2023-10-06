import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconBank: FC<IIcon> = ({ color, className, width, height }) => {
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
                d="M11.5004 2.25113C11.8028 2.04959 12.1966 2.04959 12.4989 2.25113L21.4989 8.25113C21.8289 8.47112 21.976 8.8812 21.8611 9.26078C21.7461 9.64036 21.3963 9.89998 20.9997 9.89998H18.8997V17.1H20.9997C21.4967 17.1 21.8997 17.5029 21.8997 18C21.8997 18.497 21.4967 18.9 20.9997 18.9H2.99968C2.50262 18.9 2.09968 18.497 2.09968 18C2.09968 17.5029 2.50262 17.1 2.99968 17.1H5.09968V9.89998H2.99968C2.60308 9.89998 2.25323 9.64036 2.1383 9.26078C2.02337 8.8812 2.17046 8.47112 2.50045 8.25113L11.5004 2.25113ZM6.89968 9.89998V17.1H9.09968V9.89998H6.89968ZM10.8997 9.89998V17.1H13.0997V9.89998H10.8997ZM14.8997 9.89998V17.1H17.0997V9.89998H14.8997ZM5.97218 8.09998H18.0272L11.9997 4.08164L5.97218 8.09998ZM2.09968 21C2.09968 20.5029 2.50262 20.1 2.99968 20.1H20.9997C21.4967 20.1 21.8997 20.5029 21.8997 21C21.8997 21.497 21.4967 21.9 20.9997 21.9H2.99968C2.50262 21.9 2.09968 21.497 2.09968 21Z"
            />
        </svg>
    );
};

export default IconBank;
