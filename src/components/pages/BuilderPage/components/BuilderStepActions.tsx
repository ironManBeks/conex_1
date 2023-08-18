import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isArray, isEmpty, isNumber, uniq } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { TBuilderStepDataDTO } from "@store/builder/types";
import { notImplemented } from "@helpers/notImplemented";
import { toJS } from "mobx";
import { IRoot } from "@store/store";

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

        const getNextPage = (
            step: TBuilderStepDataDTO | null,
            selectedValue: string | number | string[],
        ): number | null | "end" | number[] => {
            if (isEmpty(step) || !selectedValue) {
                return null;
            }
            if (isArray(selectedValue)) {
                const pages: number[] = [];
                for (let i = 0; i < selectedValue.length; i++) {
                    const selectedElement = step?.attributes.fieldElements.find(
                        (item) => item.value === selectedValue[i],
                    );
                    if (selectedElement?.nextQuestion) {
                        pages.push(selectedElement.nextQuestion);
                    }
                }
                return pages;
            } else {
                const selectedElement = step?.attributes.fieldElements.find(
                    (item) => item.value === selectedValue,
                );
                if (!isEmpty(selectedElement)) {
                    if (isNumber(selectedElement.nextQuestion)) {
                        return selectedElement.nextQuestion;
                    } else return "end";
                }
            }

            return null;
        };

        const handleNext = handleSubmit((data) => {
            if (!isEmpty(endDoorData)) {
                notImplemented();
                return;
            }
            if (!errorMessageList.length) {
                const currentStepName =
                    currentStepData?.attributes.fieldName || "";
                const nextPage = getNextPage(
                    currentStepData,
                    data[currentStepName],
                );
                setResultDoorData(data);

                if (stepQueue.length) {
                    updateCurrentStepData(stepQueue[0]);
                    if (isNumber(nextPage)) {
                        setStepQueue(nextPage, "add");
                    }
                } else {
                    if (isNumber(nextPage)) {
                        updateCurrentStepData(nextPage);
                    }
                    if (isArray(nextPage)) {
                        const uniqList = uniq(nextPage);
                        if (stepQueue.length) {
                            updateCurrentStepData(stepQueue[0]);
                        } else {
                            updateCurrentStepData(uniqList[0]);
                        }
                        setStepQueue(uniqList.slice(1, uniqList.length), "add");
                    }
                    console.log("nextPage", nextPage);
                    if (nextPage === "end") {
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

        useEffect(() => {
            console.log("stepQueue_______________", toJS(stepQueue));
        }, [stepQueue]);

        useEffect(() => {
            console.log("stepHistory_______________", toJS(stepHistory));
        }, [stepHistory]);

        useEffect(() => {
            console.log("resultDoorData_______________", toJS(resultDoorData));
        }, [resultDoorData]);

        useEffect(() => {
            console.log(
                "currentStepData_______________",
                toJS(currentStepData),
            );
        }, [currentStepData]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {currentStepData?.id !== 1 && currentStepData?.id !== 0 && (
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
