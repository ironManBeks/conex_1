import { FC, useEffect } from "react";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { isEmpty } from "lodash";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { useRootStore } from "@store";
import { pickOutFormErrorMessages } from "@helpers/errorsHelper";
import { notImplemented } from "@helpers/notImplemented";
import { showNotification } from "@helpers/notificarionHelper";
import { EStepPosition } from "@store/stores/builder/types";

const BuilderStepActions: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = useRootStore();
        const {
            handleSubmit,
            formState: { errors },
        } = useFormContext();
        const {
            setCurrentStepData,
            getStepPosition,
            updateCurrentStepData,
            setCreatingDoorData,
            creatingDoorData,
        } = builderStore;
        const stepPosition = getStepPosition();

        const errorMessageList = pickOutFormErrorMessages<FieldErrors<any>, []>(
            errors,
            [],
        );

        const handleBack = () => {
            updateCurrentStepData("back");
        };

        const handleNext = handleSubmit((data) => {
            if (!errorMessageList.length) {
                if (stepPosition === EStepPosition.end) {
                    if (isEmpty(creatingDoorData)) {
                        setCurrentStepData(null);
                        setCreatingDoorData(data);
                    }
                } else if (stepPosition === EStepPosition.confirm) {
                    notImplemented("Create order");
                } else {
                    updateCurrentStepData("next");
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

        const nextButtonText = () => {
            if (stepPosition === EStepPosition.end) return "Create door";
            if (stepPosition === EStepPosition.confirm) return "Create order";
            return "Next";
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    {stepPosition !== "start" && (
                        <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    )}
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleNext}
                        style={{
                            marginLeft: "auto",
                        }}
                    >
                        {nextButtonText()}
                    </ButtonPrimary>
                </div>
            </div>
        );
    },
);

export default BuilderStepActions;
