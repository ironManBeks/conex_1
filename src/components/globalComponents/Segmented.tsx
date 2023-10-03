import { Segmented as AntSegmented } from "antd";
import { FC } from "react";
import cn from "classnames";

import { TSegmented } from "./types";

const Segmented: FC<TSegmented> = (props) => {
    const {
        className,
        disabled,
        defaultValue,
        onChange,
        viewStyle = "default",
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
