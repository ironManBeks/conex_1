import { FC, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import { toJS } from "mobx";

const BuilderProgress: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { builderData, currentStepId, endDoorData, stepHistory } =
            builderStore;
        const [percent, setPercent] = useState<number>(0);
        const totalSteps = builderData?.meta.pagination.total;

        console.log(
            "builderData?.meta.pagination",
            toJS(builderData?.meta.pagination),
        );

        const calculatePercent = () => {
            if (!isEmpty(endDoorData)) {
                setPercent(100);
                return;
            }
            if (totalSteps && currentStepId && stepHistory.length) {
                setPercent((prevState) => {
                    const newStep = 100 / stepHistory.length;
                    return prevState + newStep;
                });
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
    }),
);

export default BuilderProgress;
