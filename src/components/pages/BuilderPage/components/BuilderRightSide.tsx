import { FC, useCallback, useMemo } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { TBuilderCompProps } from "../types";
import { IRoot } from "@store/store";
import { renderResultDataToOptionsList } from "@helpers/builderHelper";
import { H3 } from "@components/Text";
import { isEmpty, isString } from "lodash";

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
                    const fieldPrice = currentValue.list.reduce((acc, cur) => {
                        const val: number = isString(cur.value)
                            ? parseFloat(cur.value.replace(/\*|%|#|&|\$/g, ""))
                            : cur.value;
                        return acc + parseFloat(val.toFixed(2));
                    }, 0);
                    return accumulator + fieldPrice;
                },
                0,
            );
        };

        const additionalServicesTotalOption: TAdditionalServicesOption = {
            label: "Grand Total",
            value: `$${getTotal()}`,
        };

        return (
            <div
                className={cn(`${classPrefix}__wrapper`)}
                style={{ paddingTop: !isEmpty(currentStepData) ? "96px" : 0 }}
            >
                <div className={cn(`${classPrefix}__inner-wrapper`)}>
                    <H3 className={cn(`${classPrefix}__title`)}>
                        Price Estimate
                    </H3>
                    <AddedOptionsList optionsList={resultDataToOptionsList()} />
                    <AdditionalServices
                        options={
                            !isEmpty(resultDoorData)
                                ? [
                                      {
                                          label: "Shipping cost",
                                          value: "$123.00",
                                      },
                                      {
                                          label: "Additional charges and more big text with big price",
                                          value: "$123456.99",
                                      },
                                  ]
                                : []
                        }
                        totalOption={additionalServicesTotalOption}
                    />
                </div>
            </div>
        );
    }),
);

export default BuilderRightSide;
