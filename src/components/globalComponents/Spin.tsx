import { Spin as AntSpin } from "antd";
import { FC } from "react";
import cn from "classnames";
import { SpinProps } from "antd/es/spin";

const Spin: FC<SpinProps> = (props) => {
    const { className, ...rest } = props;
    return <AntSpin {...rest} className={cn(className, "common-spin")} />;
};

export default Spin;
