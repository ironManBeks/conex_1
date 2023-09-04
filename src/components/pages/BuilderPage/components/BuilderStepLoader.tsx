import { FC } from "react";
import { inject, observer } from "mobx-react";

import { TBuilderCompProps } from "../types";
import { Spin } from "antd";

const BuilderStepLoader: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        return (
            <div className={`${pageClassPrefix}_step-loader`}>
                <Spin size="large" />
            </div>
        );
    }),
);

export default BuilderStepLoader;
