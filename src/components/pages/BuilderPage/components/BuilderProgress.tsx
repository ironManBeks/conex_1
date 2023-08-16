import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { isEmpty } from "lodash";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";

const BuilderProgress: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const { builderStore } = useRootStore();
        const { builderData, currentStepId, endDoorData, stepHistory } =
            builderStore;
        const [percent, setPercent] = useState<number>(0);
        const totalSteps = builderData?.meta.pagination.total;
        const calculatePercent = () => {
            if (!isEmpty(endDoorData)) {
                setPercent(100);
                return;
            }
            if (totalSteps && currentStepId && stepHistory.length) {
                setPercent((currentStepId * 100) / totalSteps);
            } else setPercent(0);
        };

        useEffect(() => {
            calculatePercent();
        }, [totalSteps, currentStepId, endDoorData]);

        return (
            <ProgressWrapper
                percent={percent}
                wrapperClassPrefix={pageClassPrefix}
            />
        );
    },
);

export default BuilderProgress;
