import { FC } from "react";
import { inject, observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { isArray, isEmpty, isEqual, isNil, isNumber, uniq } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ModalConfirm from "@components/modals/components/ModalConfirm";

import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { notImplemented } from "@helpers/notImplemented";
import { IRoot } from "@store/store";
import {
    convertFormValuesToResultData,
    getDefaultValuesFromResultDoorData,
    getNextStepByFormValues,
    getSelectedElementByFormValues,
    getUpdatedResultDoorData,
} from "@helpers/builderHelper";
import { handleClearBuilderStorage } from "../utils";
import { TResultDoorData } from "@store/builder/types";

const BuilderActions: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore, commonStore } = store as IRoot;
        const {
            handleSubmit,
            formState: { isValid },
            resetField,
            getValues,
            reset,
        } = useFormContext();

        const { setModalConfirmVisible } = commonStore;

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
        } = builderStore;

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

        const handleNext = (
            checkToResetDataAfter = true,
            newResultDoorData?: TResultDoorData[],
        ) =>
            handleSubmit(() => {
                if (!isEmpty(endDoorData)) {
                    notImplemented();
                    return;
                }

                const formData = getValues();
                const currentStepHistoryIndex = stepHistory.findIndex(
                    (item) => item === currentStepId,
                );
                const currentStepResultIndex = resultDoorData?.findIndex(
                    (item) => item.stepId === currentStepId,
                );
                const newResult = convertFormValuesToResultData(
                    formData,
                    currentStepData,
                );

                // If user stepped back and changed the selected values
                if (
                    checkToResetDataAfter &&
                    currentStepHistoryIndex !== -1 &&
                    resultDoorData &&
                    !isNil(currentStepResultIndex) &&
                    currentStepResultIndex !== -1 &&
                    resultDoorData[currentStepResultIndex + 1]
                ) {
                    const currentStepInResultDoor = resultDoorData?.find(
                        (item) => item.stepId === currentStepId,
                    );

                    if (!isEqual(newResult, currentStepInResultDoor)) {
                        setModalConfirmVisible(true);
                        return;
                    }
                }

                const updatedResultDoorData =
                    newResultDoorData?.length && !isEmpty(newResult)
                        ? [...newResultDoorData, newResult]
                        : getUpdatedResultDoorData(
                              formData,
                              currentStepData,
                              resultDoorData,
                          );

                const nextStep = getNextStepByFormValues(
                    currentStepData,
                    formData,
                );

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

                // If first (main) step
                if (!stepHistory.length) {
                    const selectedElement = getSelectedElementByFormValues(
                        currentStepData,
                        formData,
                    );
                    if (selectedElement) {
                        updateCurrentStepData({
                            action: "start-way",
                            parentId: selectedElement.id,
                            nextStep: nextStep,
                        });
                    }
                    return;
                }

                // In first, way from the element, then from the queue
                if (stepHistory.length) {
                    if (!isNil(nextStep)) {
                        if (isNumber(nextStep)) {
                            updateCurrentStepData(nextStep);
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
                        // If way has steps in queue
                        if (stepQueue.length) {
                            updateCurrentStepData(stepQueue[0], false);
                            setStepQueue(stepQueue[0], "remove");
                            return;
                        }
                    }
                }
            });

        const resetDataAfterCurrentStep = () => {
            if (currentStepId && resultDoorData) {
                const indexInHistory = stepHistory.findIndex(
                    (item) => item === currentStepId,
                );
                const indexInResultDoor = resultDoorData?.findIndex(
                    (item) => item.stepId === currentStepId,
                );
                if (indexInHistory !== -1 && indexInResultDoor !== -1) {
                    const slicedHistory = stepHistory.slice(0, indexInHistory);
                    const slicedResultDoor = resultDoorData.slice(
                        0,
                        indexInResultDoor,
                    );
                    const resetData = slicedResultDoor
                        .map((item) =>
                            getDefaultValuesFromResultDoorData(item.stepId, [
                                item,
                            ]),
                        )
                        .reduce(
                            (memo, current) => ({ ...memo, ...current }),
                            {},
                        );
                    reset(resetData);
                    setStepHistory(slicedHistory, "replace");
                    handleNext(false, slicedResultDoor)();
                }
            }
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {!!stepHistory.length && (
                        <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    )}
                    <ButtonPrimary
                        onClick={() => {
                            handleClearBuilderStorage();
                            resetAllBuilderData(true);
                        }}
                        color={EButtonColor.transparent}
                        size={EButtonSize.sm}
                        style={{
                            marginLeft: stepHistory.length ? 20 : 0,
                        }}
                    >
                        Reset state and cache
                    </ButtonPrimary>
                    {/*<button*/}
                    {/*    type={"button"}*/}
                    {/*    onClick={() => {*/}
                    {/*        console.log("getValues", getValues());*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    get values*/}
                    {/*</button>*/}
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleNext()}
                        style={{
                            marginLeft: "auto",
                        }}
                        disabled={!isValid}
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                </div>
                <ModalConfirm
                    text="Are you sure you want to change this option? Doing so will clear any options you have selected past this section."
                    confirmColor={EButtonColor.danger}
                    onConfirm={() => resetDataAfterCurrentStep()}
                />
            </div>
        );
    }),
);

export default BuilderActions;
