import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react";

import BuilderField from "@components/pages/BuilderPage/components/BuilderField";
import { H2, P } from "@components/Text";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";
import { isEmpty } from "lodash";
import { toJS } from "mobx";

const BuilderStepLayout: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = useRootStore();
        const { currentStepData, creatingDoorData } = builderStore;

        useEffect(() => {
            console.log("creatingDoorData", toJS(creatingDoorData));
        }, [creatingDoorData]);

        const stepContent = useMemo(() => {
            if (!isEmpty(currentStepData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        {currentStepData?.stepTitle && (
                            <H2 className={`${classPrefix}__title`}>
                                {currentStepData.stepTitle}
                            </H2>
                        )}
                        <div className={`${classPrefix}__content`}>
                            {currentStepData?.fields.map((item) => (
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //  @ts-ignore
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
                        {currentStepData?.stepDescription && (
                            <div className={`${classPrefix}__description`}>
                                <P>{currentStepData.stepDescription}</P>
                            </div>
                        )}
                    </div>
                );
            }

            if (!isEmpty(creatingDoorData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <H2>Selected values in form:</H2>
                        <br />
                        <P>{JSON.stringify(creatingDoorData, undefined, 4)}</P>
                    </div>
                );
            }

            return <></>;
        }, [currentStepData, creatingDoorData]);

        return stepContent;
    },
);

export default BuilderStepLayout;
