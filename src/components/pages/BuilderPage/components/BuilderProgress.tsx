import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { isEmpty } from "lodash";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";

const BuilderProgress: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        // const { builderStore } = useRootStore();
        // const { builderData, getCurrentStepIndex, creatingDoorData } =
        //     builderStore;
        // const [percent, setPercent] = useState<number>(0);
        // const totalSteps = builderData?.length;
        // const currentStepIndex = getCurrentStepIndex();
        // const calculatePercent = () => {
        //     if (!isEmpty(creatingDoorData)) {
        //         setPercent(100);
        //         return;
        //     }
        //     if (totalSteps && currentStepIndex) {
        //         setPercent((currentStepIndex * 100) / totalSteps);
        //     } else setPercent(0);
        // };
        //
        // useEffect(() => {
        //     calculatePercent();
        // }, [totalSteps, currentStepIndex, creatingDoorData]);

        return (
            <ProgressWrapper
                // percent={percent}
                percent={80}
                wrapperClassPrefix={pageClassPrefix}
            />
        );
    },
);

export default BuilderProgress;
