import { FC } from "react";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { TBuilderProgress } from "../types";
import { observer } from "mobx-react";

const BuilderProgress: FC<TBuilderProgress> = observer(
    ({ pageClassPrefix }) => {
        return (
            <ProgressWrapper
                percent={22}
                wrapperClassPrefix={pageClassPrefix}
            />
        );
    },
);

export default BuilderProgress;
