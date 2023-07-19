import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";

const H1: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
}) => {
    const classNames = cn(commonTitleClassName, "_h1", className);
    return dangerouslySetInnerHTML ? (
        <h1
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <h1 ref={ref} className={classNames}>
            <>{children}</>
        </h1>
    );
};

export default H1;
