import { FC } from "react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TBuilderStepActions } from "@components/pages/BuilderPage/types";

const BuilderStepActions: FC<TBuilderStepActions> = ({
    pageClassPrefix,
    onBackClick,
    onNextClick,
}) => {
    const classPrefix = `${pageClassPrefix}_actions`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                <ButtonPrimary onClick={onBackClick}>Back</ButtonPrimary>
                <ButtonPrimary
                    color={EButtonColor.primary}
                    onClick={onNextClick}
                >
                    Next
                </ButtonPrimary>
            </div>
        </div>
    );
};

export default BuilderStepActions;
