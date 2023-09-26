import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconEyeOpen: FC<IIcon> = ({
    color,
    className,
    width,
    height,
    ...rest
}) => {
    return (
        <svg
            width={width || "24"}
            height={height || "24"}
            fill={color || DEFAULT_ICON_COLOR}
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.14603 12C4.22556 12.1336 4.32341 12.2925 4.43916 12.4704C4.81192 13.0436 5.36374 13.8054 6.07943 14.5635C7.52853 16.0985 9.53314 17.5 12 17.5C14.4669 17.5 16.4715 16.0985 17.9206 14.5635C18.6363 13.8054 19.1881 13.0436 19.5608 12.4704C19.6766 12.2925 19.7744 12.1336 19.854 12C19.7744 11.8664 19.6766 11.7075 19.5608 11.5296C19.1881 10.9564 18.6363 10.1946 17.9206 9.43647C16.4715 7.9015 14.4669 6.5 12 6.5C9.53314 6.5 7.52853 7.9015 6.07943 9.43647C5.36374 10.1946 4.81192 10.9564 4.43916 11.5296C4.32341 11.7075 4.22556 11.8664 4.14603 12ZM21 12C21.8932 11.5503 21.893 11.55 21.8928 11.5496L21.8924 11.5488L21.8913 11.5466L21.8883 11.5406L21.8785 11.5216C21.8703 11.5059 21.859 11.4841 21.8444 11.4567C21.8152 11.402 21.7731 11.3246 21.7183 11.2278C21.6088 11.0345 21.448 10.7629 21.2375 10.4392C20.8176 9.79359 20.1933 8.93043 19.3749 8.06353C17.7558 6.3485 15.2604 4.5 12 4.5C8.73959 4.5 6.24419 6.3485 4.62512 8.06353C3.80671 8.93043 3.1824 9.79359 2.76254 10.4392C2.55199 10.7629 2.39123 11.0345 2.2817 11.2278C2.2269 11.3246 2.18481 11.402 2.15563 11.4567C2.14103 11.4841 2.12965 11.5059 2.12151 11.5216L2.11174 11.5406L2.10867 11.5466L2.1076 11.5488L2.10717 11.5496C2.10699 11.55 2.10683 11.5503 3 12L2.10683 11.5503C1.96439 11.8332 1.96439 12.1668 2.10683 12.4497L3 12C2.10683 12.4497 2.10699 12.45 2.10717 12.4504L2.1076 12.4512L2.10867 12.4534L2.11174 12.4594L2.12151 12.4784C2.12965 12.4941 2.14103 12.5159 2.15563 12.5433C2.18481 12.598 2.2269 12.6754 2.2817 12.7722C2.39123 12.9655 2.55199 13.2371 2.76254 13.5608C3.1824 14.2064 3.80671 15.0696 4.62512 15.9365C6.24419 17.6515 8.73959 19.5 12 19.5C15.2604 19.5 17.7558 17.6515 19.3749 15.9365C20.1933 15.0696 20.8176 14.2064 21.2375 13.5608C21.448 13.2371 21.6088 12.9655 21.7183 12.7722C21.7731 12.6754 21.8152 12.598 21.8444 12.5433C21.859 12.5159 21.8703 12.4941 21.8785 12.4784L21.8883 12.4594L21.8913 12.4534L21.8924 12.4512L21.8928 12.4504C21.893 12.45 21.8932 12.4497 21 12ZM21 12L21.8932 12.4497C22.0356 12.1668 22.0356 11.8332 21.8932 11.5503L21 12Z"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z"
            />
        </svg>
    );
};

export default IconEyeOpen;
