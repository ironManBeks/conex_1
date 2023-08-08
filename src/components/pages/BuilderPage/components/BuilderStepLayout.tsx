import { FC, useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react";
import { isEmpty } from "lodash";

import BuilderField from "@components/pages/BuilderPage/components/BuilderField";
import { H2, P } from "@components/Text";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";
import { FieldErrors } from "react-hook-form/dist/types/errors";

const BuilderStepLayout: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = useRootStore();
        const { currentStepData, creatingDoorData } = builderStore;

        return useMemo(() => {
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
                                // ToDo remove ts-ignore
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
                const keys = Object.keys(creatingDoorData);
                const result: { key: string; value: string }[] = [];

                for (let i = 0; i < keys.length; i++) {
                    const currentKey: keyof FieldErrors = keys[i];
                    result.push({
                        key: currentKey,
                        value: creatingDoorData[currentKey] as string,
                    });
                }

                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <H2>Selected values in form:</H2>
                        <br />
                        {result.map((item, index) => (
                            <P key={index}>
                                <b>{item.key}:</b> {item.value}
                            </P>
                        ))}
                    </div>
                );
            }

            return <div>12313123</div>;
        }, [currentStepData, creatingDoorData]);
    },
);

export default BuilderStepLayout;
