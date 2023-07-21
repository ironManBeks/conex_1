import { FC } from "react";
import { Tooltip as AntTooltip } from "antd";
import { TTooltip } from "./types";
import cn from "classnames";
const Tooltip: FC<TTooltip> = (props) => {
    return (
        <AntTooltip
            {...props}
            overlayClassName={cn(props.overlayClassName, "common-tooltip")}
        />
    );
};

export default Tooltip;
