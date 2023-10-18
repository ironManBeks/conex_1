import { FC } from "react";
import { Tooltip as AntTooltip } from "antd";
import cn from "classnames";

import { TTooltip } from "./types";

const Tooltip: FC<TTooltip> = (props) => {
    const { children, overlayClassName, className, ...rest } = props;
    return (
        <AntTooltip
            {...rest}
            overlayClassName={cn(overlayClassName, "common-tooltip_overlay")}
            className={cn(className, "common-tooltip_wrapper")}
        >
            {children}
        </AntTooltip>
    );
};

export default Tooltip;
