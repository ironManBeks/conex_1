import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { FieldValues, useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isArray, isEmpty, isNumber, uniq } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { EBuilderFieldTypes, TBuilderStepDataDTO } from "@store/builder/types";
import { notImplemented } from "@helpers/notImplemented";
import { toJS } from "mobx";
import { IRoot } from "@store/store";
import { getNextStep } from "@helpers/builderHelper";

const BuilderStepActions: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = store as IRoot;
        const {
            handleSubmit,
            formState: { errors },
            resetField,
        } = useFormContext();
        const {
            updateCurrentStepData,
            currentStepData,
            stepQueue,
            setStepQueue,
            endDoorData,
            setEndDoorData,
            setCurrentStepData,
            setResultDoorData,
            stepHistory,
            resultDoorData,
            setStepHistory,
            currentStepId,
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
        };

        const handleNext = handleSubmit((data) => {
            if (!isEmpty(endDoorData)) {
                notImplemented();
                return;
            }
            if (!errorMessageList.length) {
                const currentStepName =
                    currentStepData?.attributes.fieldName || "";
                const nextStep = getNextStep(currentStepData, data);

                setResultDoorData(data);

                if (stepQueue.length) {
                    updateCurrentStepData(stepQueue[0]);
                    if (isNumber(nextStep)) {
                        setStepQueue(nextStep, "add");
                    }
                } else {
                    if (isNumber(nextStep)) {
                        updateCurrentStepData(nextStep);
                        return;
                    }
                    if (isArray(nextStep) && nextStep.length) {
                        const uniqList = uniq(nextStep);
                        console.log("uniqList", uniqList);
                        if (stepQueue.length) {
                            updateCurrentStepData(stepQueue[0]);
                        } else {
                            updateCurrentStepData(uniqList[0]);
                        }
                        setStepQueue(uniqList.slice(1, uniqList.length), "add");
                        return;
                    }
                    if (
                        nextStep === "end" ||
                        (isArray(nextStep) && !nextStep.length)
                    ) {
                        console.log("123123");
                        setEndDoorData(data);
                        setCurrentStepData(null);
                        if (currentStepId) {
                            setStepHistory(currentStepId, "add");
                            setStepQueue(currentStepId, "remove");
                        }
                    }
                }
            }
        });

        useEffect(() => {
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
        //
        // useEffect(() => {
        //     console.log("stepHistory_______________", toJS(stepHistory));
        // }, [stepHistory]);
        //
        // useEffect(() => {
        //     console.log("resultDoorData_______________", toJS(resultDoorData));
        // }, [resultDoorData]);
        //
        // useEffect(() => {
        //     console.log(
        //         "currentStepData_______________",
        //         toJS(currentStepData),
        //     );
        // }, [currentStepData]);

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
                    >
                        {isEmpty(endDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default BuilderStepActions;
