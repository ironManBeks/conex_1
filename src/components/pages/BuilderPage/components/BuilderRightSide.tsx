import { FC, useCallback } from "react";
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
        const { resultDoorData } = builderStore;
        const classPrefix = `${pageClassPrefix}_right-side`;

        const resultDataToOptionsList = useCallback(
            () => renderResultDataToOptionsList(resultDoorData),
            [resultDoorData],
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

        return (
            <div className={cn(`${classPrefix}__wrapper`)}>
                <div className={cn(`${classPrefix}__inner-wrapper`)}>
                    <AddedOptionsList optionsList={resultDataToOptionsList()} />
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
