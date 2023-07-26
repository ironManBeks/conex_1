import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCreditCard: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "21"}
            height={height || "17"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 21 17"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.34376e-05 15.073C7.34376e-05 15.437 0.126073 15.745 0.378073 15.997C0.630073 16.249 0.945073 16.375 1.32307 16.375H19.6981C20.0481 16.375 20.3561 16.249 20.6221 15.997C20.8881 15.745 21.0141 15.437 21.0001 15.073V1.948C21.0001 1.584 20.8741 1.276 20.6221 1.024C20.3701 0.772 20.0621 0.639 19.6981 0.625H1.32307C0.959073 0.625 0.644073 0.758 0.378073 1.024C0.112073 1.29 -0.0139266 1.598 7.34376e-05 1.948V15.073ZM1.32307 15.073V5.875H19.6981V15.073H1.32307ZM1.32307 3.25V1.948H19.6981V3.25H1.32307ZM2.62507 13.75H5.25007V12.448H2.62507V13.75ZM2.62507 11.125H6.57307V7.198H2.62507V11.125ZM6.57307 13.75H9.19807V12.448H6.57307V13.75ZM10.5001 13.75H13.1251V12.448H10.5001V13.75ZM14.4481 13.75H15.7501V12.448H14.4481V13.75ZM17.0731 13.75H18.3751V12.448H17.0731V13.75Z"
                fillOpacity="0.71"
            />
        </svg>
    );
};

export default IconCreditCard;
