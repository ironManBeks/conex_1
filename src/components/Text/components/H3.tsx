import { FC } from "react";
import cn from "classnames";

import { commonTitleClassName } from "../consts";

import { ITitlesProps } from "../types";

const H3: FC<ITitlesProps> = ({
    children,
    className,
    ref,
    dangerouslySetInnerHTML,
    title,
}) => {
    const classNames = cn(commonTitleClassName, "_h3", className);
    return dangerouslySetInnerHTML ? (
        <h3
            ref={ref}
            className={classNames}
            dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }}
            title={title}
        />
    ) : (
        <h3 ref={ref} className={classNames} title={title}>
            <>{children}</>
        </h3>
    );
};

export default H3;
