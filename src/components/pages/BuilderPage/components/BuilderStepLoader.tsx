import { FC } from "react";
import { inject, observer } from "mobx-react";

import Spin from "@components/globalComponents/Spin";

import { TBuilderCompProps } from "../types";

const BuilderStepLoader: FC<TBuilderCompProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        return (
            <div className={`${pageClassPrefix}_step-loader`}>
                <Spin size="large" />
            </div>
        );
    }),
);

export default BuilderStepLoader;
