import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";

const H4: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
}) => {
    const classNames = cn(commonTitleClassName, "_h4", className);
    return dangerouslySetInnerHTML ? (
        <h4
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
        />
    ) : (
        <h4 ref={ref} className={classNames}>
            <>{children}</>
        </h4>
    );
};

export default H4;
