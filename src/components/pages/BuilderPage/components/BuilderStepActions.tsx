import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isArray, isEmpty, isNumber } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { useRootStore } from "@store";
import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { TBuilderStepDataDTO } from "@store/stores/builder/types";
import { notImplemented } from "@helpers/notImplemented";
import loginWithApple from "@components/globalComponents/AuthForm/components/LoginWithApple";
import { toJS } from "mobx";

const BuilderStepActions: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = useRootStore();
        const {
            handleSubmit,
            formState: { errors },
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
        } = builderStore;

        const errorMessageList = pickOutFormErrorMessages<FieldErrors<any>, []>(
            errors,
            [],
        );

        const handleBack = () => {
            updateCurrentStepData("prev");
        };

        const getNextPageId = (
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
            }
            if (!errorMessageList.length) {
                const currentStepName =
                    currentStepData?.attributes.fieldName || "";
                const nextPage = getNextPageId(
                    currentStepData,
                    data[currentStepName],
                );
                setResultDoorData(data);
                // console.log("stepQueue", toJS(stepQueue));
                // console.log("nextPage", nextPage);

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
                        if (stepQueue.length) {
                            updateCurrentStepData(stepQueue[0]);
                        } else {
                            updateCurrentStepData(nextPage[0]);
                        }
                        setStepQueue(nextPage.slice(1, nextPage.length), "add");
                    }
                    if (nextPage === "end") {
                        setEndDoorData(data);
                        setCurrentStepData(null);
                    }
                }
            }
        });

        // useEffect(() => {
        //     console.log("__stepQueue", toJS(stepQueue));
        // }, [stepQueue]);
        //
        // useEffect(() => {
        //     console.log("__stepHistory", toJS(stepHistory));
        // }, [stepHistory]);

        useEffect(() => {
            updateCurrentStepData("start");
        }, []);

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
    },
);

export default BuilderStepActions;
