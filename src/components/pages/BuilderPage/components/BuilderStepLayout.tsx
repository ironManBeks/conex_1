import { FC, useEffect, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import { isEmpty, isNil } from "lodash";
import { FieldErrors } from "react-hook-form/dist/types/errors";

import { H2, H4, P } from "@components/Text";
import BuilderStep from "./BuilderStep";

import { IRoot } from "@store/store";
import { TBuilderCompProps } from "../types";
import { toJS } from "mobx";
import {
    getResultFieldsParams,
    renderResultDataToOptionsList,
} from "@helpers/builderHelper";
import AddedOptionsList from "@components/globalComponents/AddedOptionsList";

const BuilderStepLayout: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const classPrefix = `${pageClassPrefix}_step`;
        const { builderStore } = store as IRoot;
        const { builderData, currentStepData, resultDoorData, endDoorData } =
            builderStore;

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

            if (!isEmpty(resultDoorData) && !isEmpty(endDoorData)) {
                return (
                    <div className={cn(`${classPrefix}__wrapper`)}>
                        <H2>Selected values in form:</H2>
                        <br />
                        <br />
                        {renderResultDataToOptionsList(resultDoorData).map(
                            (item) => (
                                <div>
                                    <H4>{item.title}</H4>
                                    <ul>
                                        {item.list.map((value) => (
                                            <li>
                                                {value.label} _____{" "}
                                                {value.value}
                                            </li>
                                        ))}
                                    </ul>
                                    <br />
                                </div>
                            ),
                        )}
                    </div>
                );
            }

            return (
                <div style={{ textAlign: "center" }}>
                    Something went wrong. <br /> Please try to reload the page
                </div>
            );
        }, [currentStepData, resultDoorData, endDoorData]);
    }),
);

export default BuilderStepLayout;
