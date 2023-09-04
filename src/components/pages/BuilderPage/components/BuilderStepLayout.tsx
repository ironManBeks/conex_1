import { FC, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";

import BuilderStep from "./BuilderStep";
import BuilderError from "./BuilderError";
import BuilderEndStep from "./BuilderEndStep";
import BuilderStepLoader from "./BuilderStepLoader";

import { IRoot } from "@store/store";
import { TBuilderCompProps } from "../types";

const BuilderStepLayout: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = store as IRoot;
        const {
            currentStepData,
            resultDoorData,
            endDoorData,
            builderParamsDataFetching,
        } = builderStore;

        return useMemo(() => {
            if (builderParamsDataFetching) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <BuilderStepLoader pageClassPrefix={pageClassPrefix} />
                    </div>
                );
            }

            if (!isEmpty(currentStepData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <BuilderStep />
                    </div>
                );
            }

            if (!isEmpty(resultDoorData) && !isEmpty(endDoorData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <BuilderEndStep pageClassPrefix={pageClassPrefix} />
                    </div>
                );
            }

            return (
                <div className={cn(`${classPrefix}__wrapper`)}>
                    <BuilderError pageClassPrefix={pageClassPrefix} />
                </div>
            );
        }, [
            builderParamsDataFetching,
            currentStepData,
            resultDoorData,
            endDoorData,
        ]);
    }),
);

export default BuilderStepLayout;
