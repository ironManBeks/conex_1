import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { inject, observer } from "mobx-react";

import BuilderProgress from "./BuilderProgress";
import BuilderStepLayout from "./BuilderStepLayout";
import BuilderRightSide from "./BuilderRightSide";
import BuilderActions from "./BuilderActions";

import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import { builderFormResolver } from "../utils";
import { isNil } from "lodash";
import { setStorage } from "@services/storage.service";
import {
    BUILDER_CURRENT_STEP_ID,
    BUILDER_HISTORY,
    BUILDER_QUEUE,
} from "@consts/storageNamesContsts";
import { toJS } from "mobx";

const BuilderForm: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const {
            currentStepId,
            currentStepData,
            stepQueue,
            stepHistory,
            resultDoorData,
            builderSettings,
        } = builderStore;

        const methods = useForm({
            resolver: builderFormResolver(
                currentStepId,
                currentStepData?.attributes,
            ),
            defaultValues: undefined,
        });

        useEffect(() => {
            if (!isNil(stepQueue)) {
                setStorage(BUILDER_QUEUE, stepQueue);
            }
        }, [stepQueue]);

        useEffect(() => {
            if (!isNil(stepHistory)) {
                setStorage(BUILDER_HISTORY, stepHistory);
            }
        }, [stepHistory]);

        // useEffect(() => {
        //     console.log("resultDoorData", toJS(resultDoorData));
        // }, [resultDoorData?.length, resultDoorData]);

        useEffect(() => {
            if (
                !isNil(currentStepId) &&
                builderSettings?.data.quizStartId !== currentStepId
            ) {
                setStorage(BUILDER_CURRENT_STEP_ID, currentStepId);
            }
        }, [currentStepId]);

        return (
            <FormProvider {...methods}>
                <form action="">
                    <BuilderProgress pageClassPrefix={pageClassPrefix} />
                    <div className={`${pageClassPrefix}_content__wrapper`}>
                        <div
                            className={`${pageClassPrefix}_left-side__wrapper`}
                        >
                            <BuilderStepLayout
                                pageClassPrefix={pageClassPrefix}
                            />
                        </div>
                        <BuilderRightSide pageClassPrefix={pageClassPrefix} />
                    </div>
                    <BuilderActions pageClassPrefix={pageClassPrefix} />
                </form>
            </FormProvider>
        );
    }),
);

export default BuilderForm;
