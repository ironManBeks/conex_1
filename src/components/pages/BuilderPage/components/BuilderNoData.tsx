import { FC } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { IRoot } from "@store/store";
import { handleClearBuilderStorage } from "../utils";
import { EButtonColor } from "@components/buttons/types";
import { TBuilderCompProps } from "../types";

const BuilderNoData: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { resetBuilderFormData } = builderStore;

        const handleReset = () => {
            handleClearBuilderStorage();
            resetBuilderFormData(true);
        };

        return (
            <div
                style={{
                    minHeight: "50vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Empty />
                <br />
                <br />
                <div>Please reload the page</div>
                <div className={`${pageClassPrefix}_error__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={handleReset}
                    >
                        Reset and reload
                    </ButtonPrimary>
                </div>
            </div>
        );
    }),
);

export default BuilderNoData;
