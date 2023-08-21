import { FC, useEffect } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import {
    TAddedOptionsListItem,
    TAdditionalServicesOption,
} from "@components/globalComponents/types";
import { TBuilderCompProps } from "../types";
import { toJS } from "mobx";
import { isArray, isEmpty, isNumber } from "lodash";
import {
    IBuilderElementDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { IRoot } from "@store/store";
import { useFormContext } from "react-hook-form";

const BuilderRightSide: FC<TBuilderCompProps> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { builderStore } = store as IRoot;
        const { builderData, resultDoorData, currentStepData } = builderStore;
        const classPrefix = `${pageClassPrefix}_right-side`;
        const { watch } = useFormContext();

        // const currentStepValue = watch(currentStepData?.attributes.fieldName);
        //
        // useEffect(() => {
        //     console.log("currentStepValue", currentStepValue);
        // }, [currentStepValue]);

        const getParamsByValue = (): TAddedOptionsListItem[] => {
            if (isEmpty(resultDoorData) || isEmpty(builderData)) {
                return [];
            }
            const result: TAddedOptionsListItem[] = [];
            const keys = Object.keys(resultDoorData);

            for (let i = 0; i < keys.length; i++) {
                const stepName = keys[i];
                const currentStep = builderData?.data.find(
                    (item) => item.attributes.fieldName === stepName,
                );
                if (!currentStep) continue;
                const selectedElements: IBuilderElementDataDTO[] = [];
                if (isArray(resultDoorData[stepName])) {
                    const doorArr = resultDoorData[stepName] as [];
                    for (let j = 0; j < doorArr.length; j++) {
                        const element =
                            // ToDo Remove ts-ignore
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            currentStep.attributes.subQuestions.find(
                                // ToDo Remove ts-ignore
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                (item) => item.value === doorArr[j],
                            );
                        if (element) selectedElements.push(element);
                    }
                } else {
                    // ToDo Remove ts-ignore
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const element = currentStep.attributes.subQuestions.find(
                        // ToDo Remove ts-ignore
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        (item) => item.value === resultDoorData[stepName],
                    );
                    if (element) selectedElements.push(element);
                }
                if (!selectedElements.length) continue;
                result.push({
                    title: currentStep.attributes.fieldTitle,
                    list: selectedElements.map((item) => ({
                        label: item.mainTitle,
                        value: item.price,
                    })),
                });
            }

            return result;
        };

        const getTotal = (): number => {
            const list = getParamsByValue();

            return list.reduce((accumulator, currentValue) => {
                const fieldPrice = currentValue.list.reduce(
                    (acc, cur) => acc + Number(cur.value),
                    0,
                );
                return accumulator + fieldPrice;
            }, 0);
        };

        // const additionalServicesOptions: TAdditionalServicesOption[] = [
        //     { label: "Additional charges", value: "$111.00" },
        // ];

        const additionalServicesTotalOption: TAdditionalServicesOption = {
            label: "Grand Total",
            value: `$${getTotal()}`,
        };

        return (
            <div className={cn(`${classPrefix}__wrapper`)}>
                <div className={cn(`${classPrefix}__inner-wrapper`)}>
                    <AddedOptionsList optionsList={getParamsByValue()} />
                    <AdditionalServices
                        options={[]}
                        // options={additionalServicesOptions}
                        totalOption={additionalServicesTotalOption}
                    />
                </div>
            </div>
        );
    }),
);

export default BuilderRightSide;
