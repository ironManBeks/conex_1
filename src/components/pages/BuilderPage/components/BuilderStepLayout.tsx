import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty } from "lodash";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import { H2, P } from "@components/Text";
import BuilderStep from "./BuilderStep";

import { IRoot } from "@store/store";
import { TBuilderCompProps } from "../types";
import { toJS } from "mobx";

const BuilderStepLayout: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = store as IRoot;
        const { builderData, currentStepData, endDoorData } = builderStore;

        // useEffect(() => {
        //     console.log("currentStepData", toJS(currentStepData));
        // }, [currentStepData]);

        return useMemo(() => {
            if (!isEmpty(currentStepData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <BuilderStep
                            id={currentStepData?.id}
                            attributes={currentStepData?.attributes}
                        />
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
    }),
);

export default BuilderStepLayout;
