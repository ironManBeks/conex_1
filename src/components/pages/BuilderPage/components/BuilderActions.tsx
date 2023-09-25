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
    getFormValuesByStepId,
    getNextStepByFormValues,
    getSelectedElementByFormValues,
    getUpdatedResultDoorData,
} from "@helpers/builderHelper";
import { handleClearBuilderStorage } from "../utils";
import { TResultDoorData } from "@store/builder/types";
import { getStorage, setStorage } from "@services/storage.service";
import { BUILDER_CART, BUILDER_PARENT_ID } from "@consts/storageNamesContsts";
import { useRouter } from "next/router";
import { PATH_CART_PAGE } from "@consts/pathsConsts";

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
        const router = useRouter();

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
            resetBuilderFormData,
            setEndDoorData,
            setBuilderCartData,
            builderCartData,
            setElementsToBuilderCard,
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

                const parentId: number = getStorage(BUILDER_PARENT_ID);

                const nextStep = getNextStepByFormValues(
                    currentStepData,
                    formData,
                    parentId,
                );

                setResultDoorData(updatedResultDoorData);

                // If last step and no queue (end)
                if (
                    !stepQueue.length &&
                    ((isArray(nextStep) && !nextStep.length) || !nextStep)
                ) {
                    const isInHistory = !isNil(
                        stepHistory.find((item) => item === currentStepId),
                    );

                    setEndDoorData(updatedResultDoorData);
                    setCurrentStepData(null);

                    const updatedHistory = [...stepHistory];

                    if (!isInHistory && currentStepId) {
                        updatedHistory.push(currentStepId);
                        setStepHistory(currentStepId, "add-to-end");
                    }

                    setElementsToBuilderCard(
                        [
                            {
                                doorId: Date.now().toString(),
                                doorData: updatedResultDoorData,
                                history: updatedHistory,
                                builderParentId: parentId,
                            },
                        ],
                        "add-to-end",
                    );
                    handleClearBuilderStorage();
                    resetBuilderFormData(true);
                    router.push(PATH_CART_PAGE);
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

                // In first way from the element, then from the queue
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
                    const formValues = getValues();
                    const currentStepValues = getFormValuesByStepId(
                        formValues,
                        currentStepId,
                    );
                    const newFormValues = slicedResultDoor
                        .map((item) =>
                            getDefaultValuesFromResultDoorData(item.stepId, [
                                item,
                            ]),
                        )
                        .reduce(
                            (memo, current) => ({ ...memo, ...current }),
                            {},
                        );
                    reset({ ...newFormValues, ...currentStepValues });
                    setStepHistory(slicedHistory, "replace");
                    handleNext(false, slicedResultDoor)();
                }
            }
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    <ButtonPrimary
                        onClick={handleBack}
                        size={EButtonSize.lg}
                        color={EButtonColor.secondary}
                        disabled={!stepHistory.length}
                    >
                        Back
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={handleNext()}
                        color={EButtonColor.primary}
                        size={EButtonSize.lg}
                        disabled={!isValid}
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={() => {
                            handleClearBuilderStorage();
                            resetBuilderFormData(true);
                        }}
                        color={EButtonColor.transparent}
                        size={EButtonSize.lg}
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        Reset form <sup>(remove in future)</sup>
                    </ButtonPrimary>
                </div>
                <ModalConfirm
                    title="Are you sure you want to change this option?"
                    description="Doing so will clear any options you have selected past this section."
                    confirmColor={EButtonColor.primary}
                    onConfirm={() => resetDataAfterCurrentStep()}
                />
            </div>
        );
    }),
);

export default BuilderActions;
