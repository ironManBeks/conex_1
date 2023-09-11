import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconCard: FC<IIcon> = ({ color, className, width, height }) => {
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
                d="M4.63636 6.45459C4.28491 6.45459 4 6.7395 4 7.09095V16.9091C4 17.2606 4.28491 17.5455 4.63636 17.5455H19.3636C19.7151 17.5455 20 17.2606 20 16.9091V7.09095C20 6.7395 19.7151 6.45459 19.3636 6.45459H4.63636ZM2 7.09095C2 5.63493 3.18034 4.45459 4.63636 4.45459H19.3636C20.8197 4.45459 22 5.63493 22 7.09095V16.9091C22 18.3652 20.8197 19.5455 19.3636 19.5455H4.63636C3.18034 19.5455 2 18.3652 2 16.9091V7.09095Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 10.3636C2 9.81136 2.44772 9.36365 3 9.36365H21C21.5523 9.36365 22 9.81136 22 10.3636C22 10.9159 21.5523 11.3636 21 11.3636H3C2.44772 11.3636 2 10.9159 2 10.3636Z"
            />
        </svg>
    );
};

export default IconCard;
