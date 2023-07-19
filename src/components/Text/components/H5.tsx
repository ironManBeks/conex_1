import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";

const H5: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
}) => {
    const classNames = cn(commonTitleClassName, "_h5", className);
    return dangerouslySetInnerHTML ? (
        <h5
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <h5 ref={ref} className={classNames}>
            <>{children}</>
        </h5>
    );
};

export default H5;
