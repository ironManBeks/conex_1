import { Segmented as AntSegmented } from "antd";
import { FC } from "react";
import cn from "classnames";

import { TSegmented } from "./types";

const Segmented: FC<TSegmented> = ({
    className,
    options,
    disabled,
    defaultValue,
    onChange,
}) => {
    return (
        <AntSegmented
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            className={cn(className, "common-segmented")}
            options={options}
        />
    );
};

export default Segmented;
