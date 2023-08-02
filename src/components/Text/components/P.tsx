import React, { JSX } from "react";
import cn from "classnames";

import { commonTextClassName } from "../consts";

import { ITextProps } from "../types";

const P = ({
    children,
    className,
    ref,
    style,
    dangerouslySetInnerHTML,
}: ITextProps): JSX.Element => {
    return dangerouslySetInnerHTML ? (
        <p
            ref={ref}
            className={cn(commonTextClassName, "_p", className)}
            style={style}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <p
            ref={ref}
            className={cn(commonTextClassName, className)}
            style={style}
        >
            <>{children}</>
        </p>
    );
};

export default P;
