import { FC } from "react";

import ProgressWrapper from "@components/globalComponents/ProgressWrapper";

import { TBuilderCompProps } from "../types";
import { observer } from "mobx-react";
import { useRootStore } from "@store";

const BuilderProgress: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const { builderStore } = useRootStore();

        return (
            <ProgressWrapper
                percent={22}
                wrapperClassPrefix={pageClassPrefix}
            />
        );
    },
);

export default BuilderProgress;
