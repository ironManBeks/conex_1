import { FC } from "react";
import { observer } from "mobx-react";
import { useFormContext } from "react-hook-form";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { notImplemented } from "@helpers/notImplemented";
import { useRootStore } from "@store";

const BuilderStepActions: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_actions`;
        const { builderStore } = useRootStore();
        const { handleSubmit } = useFormContext();

        const handleBack = () => {
            notImplemented("Back");
        };

        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__inner-wrapper`}>
                    <ButtonPrimary onClick={handleBack}>Back</ButtonPrimary>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleSubmit((data) => {
                            console.log("data", data);
                            notImplemented(
                                `Next__________________________   ${JSON.stringify(
                                    data,
                                    null,
                                    "\t",
                                )}`,
                            );
                        })}
                    >
                        Next
                    </ButtonPrimary>
                </div>
            </div>
        );
    },
);

export default BuilderStepActions;
