import { Segmented as AntSegmented } from "antd";
import { FC } from "react";
import cn from "classnames";

import { TSegmented } from "./types";

const Segmented: FC<TSegmented> = (props) => {
    const {
        className,
        // options,
        disabled,
        defaultValue,
        onChange,
        viewStyle = "default",
        ref,
        ...rest
    } = props;
    return (
        <AntSegmented
            {...rest}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            className={cn(className, "common-segmented", `_${viewStyle}`)}
            // options={options}
        />
    );
};

export default Segmented;
