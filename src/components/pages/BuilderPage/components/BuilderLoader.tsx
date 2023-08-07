import { FC } from "react";
import { Spin } from "antd";

import { TBuilderCompProps } from "../types";

const BuilderLoader: FC<TBuilderCompProps> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}_loader`}>
            <Spin size="large" />
        </div>
    );
};

export default BuilderLoader;
