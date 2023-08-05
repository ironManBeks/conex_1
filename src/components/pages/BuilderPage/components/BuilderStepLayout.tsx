import { FC } from "react";
import cn from "classnames";
import { observer } from "mobx-react";

import BuilderField from "@components/pages/BuilderPage/components/BuilderField";
import { H2, P } from "@components/Text";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";

const BuilderStepLayout: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = useRootStore();
        const stepData = builderStore.getCurrentStepData();

        return (
            <>
                <div className={cn(`${classPrefix}__wrapper`)}>
                    {stepData?.stepTitle && (
                        <H2 className={`${classPrefix}__title`}>
                            {stepData.stepTitle}
                        </H2>
                    )}
                    <div className={`${classPrefix}__content`}>
                        {stepData?.fields.map((item) => (
                            <BuilderField
                                key={item.id}
                                id={item.id}
                                value={item.value}
                                title={item.title}
                                titleSize={item.titleSize}
                                isRequired={item.isRequired}
                                type={item.type}
                                elements={item.elements}
                            />
                        ))}
                    </div>
                    {stepData?.stepDescription && (
                        <div className={`${classPrefix}__description`}>
                            <P>{stepData.stepDescription}</P>
                        </div>
                    )}
                </div>
            </>
        );
    },
);

export default BuilderStepLayout;
