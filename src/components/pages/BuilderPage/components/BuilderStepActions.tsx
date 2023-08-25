import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isArray, isEmpty, isNil, isNumber, uniq } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { TResultDoorData } from "@store/builder/types";
import { notImplemented } from "@helpers/notImplemented";
import { IRoot } from "@store/store";
import {
    convertFormValuesToResultData,
    getNextStep,
} from "@helpers/builderHelper";

const BuilderStepActions: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = store as IRoot;
        const {
            handleSubmit,
            formState: { errors },
            resetField,
            trigger,
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
            setEndDoorData,
        } = builderStore;

        const errorMessageList = pickOutFormErrorMessages<FieldErrors<any>, []>(
            errors,
            [],
        );

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

            setResultDoorData(renderResult());
        };

        const handleNext = handleSubmit((formData) => {
            if (!isEmpty(endDoorData)) {
                notImplemented();
                return;
            }
            if (!errorMessageList.length) {
                const nextStep = getNextStep(currentStepData, formData);

                // console.log("formData", formData);

                updateResultDoorData(formData);

                if (stepQueue.length) {
                    updateCurrentStepData(stepQueue[0]);
                    if (isNumber(nextStep)) {
                        setStepQueue(nextStep, "add");
                    }
                } else {
                    if (
                        nextStep === "end" ||
                        (isArray(nextStep) && !nextStep.length)
                    ) {
                        if (resultDoorData) {
                            setEndDoorData([...resultDoorData]);
                        }
                        setCurrentStepData(null);
                        if (currentStepId) {
                            setStepHistory(currentStepId, "add");
                            setStepQueue(currentStepId, "remove");
                        }
                    }
                    if (isNumber(nextStep)) {
                        updateCurrentStepData(nextStep);
                        return;
                    }
                    if (isArray(nextStep) && nextStep.length) {
                        const uniqList = uniq(nextStep);
                        if (stepQueue.length) {
                            updateCurrentStepData(stepQueue[0]);
                        } else {
                            updateCurrentStepData(uniqList[0]);
                        }
                        setStepQueue(uniqList.slice(1, uniqList.length), "add");
                        return;
                    }
                }
            }
        });

        useEffect(() => {
            console.log("errors", errors);
            if (errorMessageList.length) {
                showNotification({
                    message: "Validation",
                    description: errorMessageList.map((errMessage, index) => (
                        <div key={index}>{errMessage}</div>
                    )),
                });
            }
        }, [errors]);

        // useEffect(() => {
        //     console.log("stepQueue_______________", toJS(stepQueue));
        // }, [stepQueue]);

        // useEffect(() => {
        //     console.log("stepHistory_______________", toJS(stepHistory));
        // }, [stepHistory]);

        // useEffect(() => {
        //     console.log("resultDoorData_______________", toJS(resultDoorData));
        // }, [resultDoorData]);

        // useEffect(() => {
        //     console.log(
        //         "currentStepData_______________",
        //         toJS(currentStepData),
        //     );
        // }, [currentStepData]);

        useEffect(() => {
            console.log("errors", errors);
        }, [errors]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {!!stepHistory.length && (
                        <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    )}
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleNext}
                        style={{
                            marginLeft: "auto",
                        }}
                        // disabled={!!errorMessageList.length}
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default BuilderStepActions;
