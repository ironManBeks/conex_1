import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";

const H2: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
}) => {
    const classNames = cn(commonTitleClassName, "_h2", className);
    return dangerouslySetInnerHTML ? (
        <h2
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <h2 ref={ref} className={classNames}>
            <>{children}</>
        </h2>
    );
};

export default H2;
