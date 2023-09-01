import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty, isNil } from "lodash";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import { H2, H4, P } from "@components/Text";
import BuilderStep from "./BuilderStep";

import { IRoot } from "@store/store";
import { TBuilderCompProps } from "../types";
import { toJS } from "mobx";
import {
    getResultFieldsParams,
    renderResultDataToOptionsList,
} from "@helpers/builderHelper";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import BuilderEndStep from "@components/pages/BuilderPage/components/BuilderEndStep";
import BuilderError from "@components/pages/BuilderPage/components/BuilderError";

const BuilderStepLayout: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = store as IRoot;
        const { currentStepData, resultDoorData, endDoorData } = builderStore;

        return useMemo(() => {
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
        }, [currentStepData, resultDoorData, endDoorData]);
    }),
);

export default BuilderStepLayout;
