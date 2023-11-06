import { FC, useCallback, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { isArray, isEmpty, isEqual, isNil, isNumber, uniq } from "lodash";

import ButtonLink from "@components/buttons/ButtonLink";
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
import { getStorage, removeStorage } from "@services/storage.service";
import {
    BUILDER_PARENT_ID,
    EDIT_BUILDER_CART_ITEM_DATA,
} from "@consts/storageNamesContsts";
import { useRouter } from "next/router";
import { PATH_CART_PAGE } from "@consts/pathsConsts";
import { showNotification } from "@helpers/notificarionHelper";

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
            editBuilderCartItemData,
            setElementsToBuilderCard,
            builderSettings,
            builderCartData,
            setBuilderCartData,
        } = builderStore;
        const { setModalConfirmVisible } = commonStore;

        const isEdit = !isNil(editBuilderCartItemData);

        const handleBack = () => {
            if (isEdit) {
                const currentStepIndex =
                    editBuilderCartItemData.history.findIndex(
                        (item) => item === currentStepId,
                    );
                if (currentStepIndex !== -1) {
                    const prevStepId =
                        editBuilderCartItemData.history[currentStepIndex - 1];
                    updateCurrentStepData(prevStepId, false, false);
                }
                return;
            }

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
            defaultResultDoorData?: TResultDoorData[],
        ) =>
            handleSubmit(() => {
                if (!isEmpty(endDoorData)) {
                    notImplemented("Error on the end step");
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

                //
                // If user stepped back and changed selected values
                //
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
                    defaultResultDoorData && !isEmpty(newResult)
                        ? [...defaultResultDoorData, newResult]
                        : getUpdatedResultDoorData(
                              formData,
                              currentStepData,
                              resultDoorData,
                          );

                const parentId = getStorage(BUILDER_PARENT_ID) as number;

                const nextStep = getNextStepByFormValues(
                    currentStepData,
                    formData,
                    parentId,
                );

                setResultDoorData(updatedResultDoorData);

                //
                // If last step and no queue (END -> go to cart)
                //
                if (
                    !stepQueue.length &&
                    ((isArray(nextStep) && !nextStep.length) || !nextStep)
                ) {
                    if (isEdit) {
                        const isInCart = !isNil(
                            builderCartData?.elements.find(
                                (item) =>
                                    item.doorId ===
                                    editBuilderCartItemData?.doorId,
                            ),
                        );

                        if (isInCart) {
                            setElementsToBuilderCard(
                                [
                                    {
                                        ...editBuilderCartItemData,
                                        doorData: updatedResultDoorData,
                                    },
                                ],
                                "update",
                            );
                            router.push(PATH_CART_PAGE);
                        } else {
                            showNotification({
                                mainProps: {
                                    type: "warning",
                                    message: (
                                        <>
                                            The item being changed could not be
                                            found. <br />
                                            Please create a product again.
                                        </>
                                    ),
                                },
                            });
                        }
                        handleClearBuilderStorage();
                        removeStorage(EDIT_BUILDER_CART_ITEM_DATA);
                        setBuilderCartData(null);
                        resetBuilderFormData(true);
                        return;
                    }

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

                //
                // If first (main) step
                //
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

                //
                // In first way from the element, then from the queue
                //
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
                        //
                        // If way has steps in queue
                        //
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

        const isBackDisable = useCallback((): boolean => {
            return currentStepId === builderSettings?.data.quizStartId;
        }, [builderSettings, currentStepId]);

        const subActionsContent = useMemo(() => {
            if (isEdit) {
                return (
                    <ButtonLink
                        color={EButtonColor.transparent}
                        size={EButtonSize.lg}
                        href={PATH_CART_PAGE}
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        Continue ordering
                    </ButtonLink>
                );
            }

            return (
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
                    Reset form
                </ButtonPrimary>
            );
        }, [isEdit]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    <ButtonPrimary
                        onClick={handleBack}
                        size={EButtonSize.lg}
                        color={EButtonColor.secondary}
                        disabled={isBackDisable()}
                    >
                        Back
                    </ButtonPrimary>
                    <ButtonPrimary
                        onClick={handleNext()}
                        color={EButtonColor.primary}
                        size={EButtonSize.lg}
                        disabled={!isValid}
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create door"}
                    </ButtonPrimary>
                    {subActionsContent}
                </div>
                <ModalConfirm
                    title="Are you sure you want to change this option?"
                    description={
                        "Doing so will clear any options you have selected past this section."
                    }
                    confirmColor={EButtonColor.primary}
                    onConfirm={() => resetDataAfterCurrentStep()}
                />
            </div>
        );
    }),
);

export default BuilderActions;
