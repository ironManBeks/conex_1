import { FC, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { notification } from "antd";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { useRootStore } from "@store";
import { pickOutErrorMessages } from "@helpers/errorsHelper";
import { isEmpty } from "lodash";
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
            setPassedStep,
            currentStepData,
            getStepWay,
            updateCurrentStepData,
            setCreatingDoorData,
            creatingDoorData,
        } = builderStore;
        const stepWay = getStepWay();
        const [isErrors, setIsErrors] = useState(false);

        const handleBack = () => {
            updateCurrentStepData("back");
        };

        const handleNext = handleSubmit((data) => {
            if (stepWay === "end") {
                if (isEmpty(creatingDoorData)) {
                    setCreatingDoorData(data);
                } else notImplemented("Create door");
            } else {
                updateCurrentStepData("next");
                if (currentStepData?.stepId) {
                    setPassedStep(currentStepData.stepId);
                }
            }
        });

        useEffect(() => {
            if (isErrors) {
                notification.info({
                    message: "Validation",
                    placement: "bottomRight",
                    description: pickOutErrorMessages<FieldErrors<any>, []>(
                        errors,
                        [],
                    ).map((errMessage, index) => (
                        <div key={index}>{errMessage}</div>
                    )),
                });
            }
        }, [isErrors]);

        useEffect(() => {
            setIsErrors(
                !!pickOutErrorMessages<FieldErrors<any>, []>(errors, []).length,
            );
        }, [errors]);

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {stepWay !== "start" && (
                        <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    )}
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleNext}
                        style={{
                            marginLeft: "auto",
                        }}
                        disabled={
                            !!pickOutErrorMessages<FieldErrors<any>, []>(
                                errors,
                                [],
                            ).length
                        }
                    >
                        {stepWay === "end" ? "Create door" : "Next"}
                    </ButtonPrimary>
                </div>
            </div>
        );
    },
);

export default BuilderStepActions;
