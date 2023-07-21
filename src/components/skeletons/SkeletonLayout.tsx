import { FC } from "react";
import cn from "classnames";

import { TSkeletonLayout } from "./types";

const SkeletonLayout: FC<TSkeletonLayout> = ({
    className,
    children,
    classPrefix,
}) => {
    return (
        <div
            className={cn("skeleton_wrapper", className, {
                [`skeleton_${classPrefix}`]: classPrefix,
            })}
        >
            {children}
        </div>
    );
};

export default SkeletonLayout;
