import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";

const BuilderProgress: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { builderParamsData, endDoorData, stepHistory } = builderStore;
        const [percent, setPercent] = useState<number>(0);
        const totalSteps = builderParamsData?.filteredData?.length;

        const calculatePercent = () => {
            if (!isEmpty(endDoorData)) {
                setPercent(100);
                return;
            }
            if (totalSteps && stepHistory.length) {
                setPercent((stepHistory.length / totalSteps) * 100);
            } else setPercent(0);
        };

        useEffect(() => {
            calculatePercent();
        }, [totalSteps, stepHistory, endDoorData]);

        return (
            <ProgressWrapper
                percent={percent}
                wrapperClassPrefix={pageClassPrefix}
            />
        );
    }),
);

export default BuilderProgress;
