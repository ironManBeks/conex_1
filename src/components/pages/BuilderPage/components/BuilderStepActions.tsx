import { FC, useCallback, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isArray, isEmpty, isNil, isNumber, uniq } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { TResultDoorData } from "@store/builder/types";
import { notImplemented } from "@helpers/notImplemented";
import { IRoot } from "@store/store";
import {
    convertFormValuesToResultData,
    getNextStepByFormValues,
} from "@helpers/builderHelper";
import { removeStorage, setStorage } from "@services/storage.service";
import {
    BUILDER_CURRENT_STEP_ID,
    BUILDER_HISTORY,
    BUILDER_QUEUE,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";
import { toJS } from "mobx";

const BuilderStepActions: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = store as IRoot;
        const {
            handleSubmit,
            formState: { errors, isValid },
            resetField,
        } = useFormContext();

        const {
            updateCurrentStepData,
            currentStepData,
            stepQueue,
            setStepQueue,
            endDoorData,
            setCurrentStepData,
            setResultDoorData,
            stepHistory,
            resultDoorData,
            setStepHistory,
            currentStepId,
            resetAllBuilderData,
            setEndDoorData,
            getBuilderSettings,
            getBuilderData,
        } = builderStore;

        // const errorMessageList = useMemo(() => {
        //     return pickOutFormErrorMessages<FieldErrors<any>, []>(errors, []);
        // }, [errors]);

        const handleBack = () => {
            updateCurrentStepData("prev");
            const curr = currentStepData?.attributes.fieldName;
            if (curr) {
                resetField(curr);
            }
            const newResult = resultDoorData?.filter(
                (item) => item.stepId !== currentStepData?.id,
            );
            setResultDoorData(isArray(newResult) ? newResult : []);
        };

        const updateResultDoorData = (formData: FieldValues) => {
            const newResult = convertFormValuesToResultData(
                formData,
                currentStepData,
            );

            const renderResult = (): TResultDoorData[] => {
                const oldResultIndex = resultDoorData?.findIndex(
                    (item) => item.stepId === currentStepId,
                );
                const arr: TResultDoorData[] = resultDoorData?.length
                    ? resultDoorData
                    : [];
                if (newResult) {
                    if (!isNil(oldResultIndex) && oldResultIndex !== -1) {
                        arr.splice(oldResultIndex, 1);
                    }
                    arr.push(newResult);
                }
                return arr;
            };

            return renderResult();
        };

        const handleNext = handleSubmit((formData) => {
            if (!isEmpty(endDoorData)) {
                notImplemented();
                return;
            }
            if (isValid) {
                const nextStep = getNextStepByFormValues(
                    currentStepData,
                    formData,
                );
                const updatedResultDoorData = updateResultDoorData(formData);
                setResultDoorData(updatedResultDoorData);

                // If last step and no queue
                if (
                    !stepQueue.length &&
                    ((isArray(nextStep) && !nextStep.length) || !nextStep)
                ) {
                    setEndDoorData(updatedResultDoorData);
                    setCurrentStepData(null);
                    if (currentStepId) {
                        setStepHistory(currentStepId, "add-to-end");
                    }
                    return;
                }

                // First the whole first path, then the path from the queue
                if (!isNil(nextStep)) {
                    if (isNumber(nextStep)) {
                        updateCurrentStepData(nextStep);
                        console.log("nextStep", nextStep);
                        return;
                    }
                    if (isArray(nextStep) && nextStep.length) {
                        const uniqList = uniq(nextStep);
                        updateCurrentStepData(uniqList[0]);
                        setStepQueue(
                            uniqList.slice(1, uniqList.length),
                            "add-to-start",
                        );
                        return;
                    }
                } else {
                    // If she has steps in stepQueue
                    if (stepQueue.length) {
                        updateCurrentStepData(stepQueue[0], false);
                        setStepQueue(stepQueue[0], "remove");
                        return;
                    }
                }
            }
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

        useEffect(() => {
            if (!isNil(resultDoorData)) {
                setStorage(BUILDER_RESUlT_DATA, resultDoorData);
            }
            // ToDo почему не работает просто с resultDoorData? исправить
        }, [resultDoorData?.length]);

        useEffect(() => {
            if (!isNil(currentStepId)) {
                setStorage(BUILDER_CURRENT_STEP_ID, currentStepId);
            }
        }, [currentStepId]);

        const handleClearCache = () => {
            removeStorage(BUILDER_HISTORY);
            removeStorage(BUILDER_QUEUE);
            removeStorage(BUILDER_RESUlT_DATA);
            removeStorage(BUILDER_CURRENT_STEP_ID);
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {!!stepHistory.length && (
                        <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    )}
                    <ButtonPrimary
                        onClick={handleClearCache}
                        color={EButtonColor.orange}
                        size={EButtonSize.sm}
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        Clear cache
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={() => {
                            resetAllBuilderData(true);
                        }}
                        color={EButtonColor.primary}
                        isOutline={true}
                        size={EButtonSize.sm}
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        Reset form
                    </ButtonPrimary>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleNext}
                        style={{
                            marginLeft: "auto",
                        }}
                        disabled={!isValid}
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default BuilderStepActions;
