import { FC } from "react";
import cn from "classnames";

import { TRowInfoProps } from "./types";

const RowInfo: FC<TRowInfoProps> = ({
    wrapperClassName,
    label,
    value,
    isBottomLine = true,
}) => {
    const classPrefix = "row-info";

    return (
        <div
            className={cn(`${classPrefix}_wrapper`, wrapperClassName, {
                _line: isBottomLine,
            })}
        >
            <span className={`${classPrefix}_label`}>{label}</span>
            {isBottomLine && <span className={`${classPrefix}_line`} />}
            <span className={`${classPrefix}_value`}>{value}</span>
        </div>
    );
};

export default RowInfo;
