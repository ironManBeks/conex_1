import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { useRootStore } from "@store";
import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { showNotification } from "@helpers/notificarionHelper";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { TBuilderStepDataDTO } from "@store/stores/builder/types";
import { isArray, isEmpty, isNumber } from "lodash";
import { toJS } from "mobx";
import { notImplemented } from "@helpers/notImplemented";

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
            setResultDoorData,
            setCurrentStepData,
            resultDoorData,
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
            if (!isEmpty(resultDoorData)) {
                notImplemented();
            }
            if (!errorMessageList.length) {
                const currentStepName =
                    currentStepData?.attributes.fieldName || "";
                const nextPage = getNextPageId(
                    currentStepData,
                    data[currentStepName],
                );
                if (isArray(nextPage) || isNumber(nextPage)) {
                    setStepQueue(nextPage, "add");
                }
                if (nextPage === "end") {
                    setResultDoorData(data);
                    setCurrentStepData(null);
                }
            }
        });

        useEffect(() => {
            updateCurrentStepData(stepQueue[0]);
            console.log("stepQueue", toJS(stepQueue));
        }, [stepQueue]);

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
                        {isEmpty(resultDoorData) ? "Next" : "Create order"}
                    </ButtonPrimary>
                </div>
            </div>
        );
    },
);

export default BuilderStepActions;
