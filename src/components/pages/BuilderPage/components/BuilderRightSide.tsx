import { FC, useCallback, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import { renderResultDataToOptionsList } from "@helpers/builderHelper";

const BuilderRightSide: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const {
            resultDoorData,
            stepHistory,
            updateCurrentStepData,
            currentStepData,
        } = builderStore;
        const classPrefix = `${pageClassPrefix}_right-side`;

        const resultDataToOptionsList = useCallback(
            () =>
                renderResultDataToOptionsList(
                    resultDoorData,
                    updateCurrentStepData,
                    stepHistory,
                    currentStepData,
                ),
            [resultDoorData, stepHistory, currentStepData],
        );

        const getTotal = (): number => {
            return resultDataToOptionsList().reduce(
                (accumulator, currentValue) => {
                    const fieldPrice = currentValue.list.reduce(
                        (acc, cur) => acc + Number(cur.value),
                        0,
                    );
                    return accumulator + fieldPrice;
                },
                0,
            );
        };

        const additionalServicesTotalOption: TAdditionalServicesOption = {
            label: "Grand Total",
            value: `$${getTotal()}`,
        };

        const optionsList = useMemo(
            () => <AddedOptionsList optionsList={resultDataToOptionsList()} />,
            [resultDoorData, stepHistory, currentStepData],
        );

        return (
            <div className={cn(`${classPrefix}__wrapper`)}>
                <div className={cn(`${classPrefix}__inner-wrapper`)}>
                    {optionsList}
                    <AdditionalServices
                        options={[]}
                        totalOption={additionalServicesTotalOption}
                    />
                </div>
            </div>
        );
    }),
);

export default BuilderRightSide;
