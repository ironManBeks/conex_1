import { FC } from "react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TBuilderFormActions } from "../types";

const BuilderFormActions: FC<TBuilderFormActions> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_actions`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                <ButtonPrimary>Back</ButtonPrimary>
                <ButtonPrimary color={EButtonColor.primary}>Next</ButtonPrimary>
            </div>
        </div>
    );
};

export default BuilderFormActions;
