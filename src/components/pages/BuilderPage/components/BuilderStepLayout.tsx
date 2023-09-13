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

        const content = useMemo(() => {
            if (builderParamsDataFetching) {
                return <BuilderStepLoader pageClassPrefix={pageClassPrefix} />;
            }

            if (!isEmpty(currentStepData)) {
                return <BuilderStep />;
            }

            if (!isEmpty(resultDoorData) && !isEmpty(endDoorData)) {
                return <BuilderEndStep pageClassPrefix={pageClassPrefix} />;
            }

            return <BuilderError pageClassPrefix={pageClassPrefix} />;
        }, [
            builderParamsDataFetching,
            currentStepData,
            resultDoorData,
            endDoorData,
        ]);

        return <div className={cn(`${classPrefix}__wrapper`)}>{content}</div>;
    }),
);

export default BuilderStepLayout;
