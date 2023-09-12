import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";
import { isFunction } from "lodash";

const H4: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
    onClick,
}) => {
    const classNames = cn(commonTitleClassName, "_h4", className);
    return dangerouslySetInnerHTML ? (
        <h4
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <h4
            ref={ref}
            className={classNames}
            onClick={(e) => {
                if (isFunction(onClick)) {
                    onClick(e);
                }
            }}
        >
            <>{children}</>
        </h4>
    );
};

export default H4;
