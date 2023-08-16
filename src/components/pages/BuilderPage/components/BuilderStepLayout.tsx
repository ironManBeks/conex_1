import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { observer } from "mobx-react";
import { isEmpty } from "lodash";

import BuilderField from "@components/pages/BuilderPage/components/BuilderField";
import { H2, P } from "@components/Text";

import { useRootStore } from "@store";
import { TBuilderCompProps } from "../types";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { toJS } from "mobx";

const BuilderStepLayout: FC<TBuilderCompProps> = observer(
    ({ pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = useRootStore();
        const { builderData, currentStepData, endDoorData } = builderStore;

        // useEffect(() => {
        //     console.log("endDoorData", toJS(endDoorData));
        // }, [endDoorData]);

        return useMemo(() => {
            if (!isEmpty(currentStepData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <div className={`${classPrefix}__content`}>
                            <BuilderField
                                id={currentStepData?.id}
                                attributes={currentStepData?.attributes}
                            />
                        </div>
                        {/*{currentStepData?.stepDescription && (*/}
                        {/*    <div className={`${classPrefix}__description`}>*/}
                        {/*        <P>{currentStepData.stepDescription}</P>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                );
            }

            if (!isEmpty(endDoorData)) {
                const keys = Object.keys(endDoorData);
                const result: { key: string; value: string }[] = [];

                for (let i = 0; i < keys.length; i++) {
                    const currentKey: keyof FieldErrors = keys[i];
                    result.push({
                        key: currentKey,
                        value: endDoorData[currentKey] as string,
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

            return (
                <div style={{ textAlign: "center" }}>
                    Something went wrong. <br /> Please try to reload the page
                </div>
            );
        }, [currentStepData, endDoorData]);
    },
);

export default BuilderStepLayout;
