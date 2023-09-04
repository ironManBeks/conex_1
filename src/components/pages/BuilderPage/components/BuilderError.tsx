import { FC } from "react";
import { inject, observer } from "mobx-react";

import { H3, H4 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { IRoot } from "@store/store";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";
import { handleClearBuilderStorage } from "../utils";

const BuilderError: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { resetAllBuilderData } = builderStore;

        const handleReset = () => {
            handleClearBuilderStorage();
            resetAllBuilderData(true);
        };

        return (
            <div className={`${pageClassPrefix}_error`}>
                <H3>Oops, looks like something went wrong</H3>
                <H4>Please try to reset data and cache</H4>
                <div className={`${pageClassPrefix}_error__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleReset}
                    >
                        Reset
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default BuilderError;
