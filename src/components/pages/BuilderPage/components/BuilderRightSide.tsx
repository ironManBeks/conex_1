import { FC } from "react";
import cn from "classnames";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import { AddedOptionsListMockup } from "../../../../mockups/AddedOptionsListMockup";
import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { TBuilderRightSide } from "../types";

const BuilderRightSide: FC<TBuilderRightSide> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_right-side`;

    const additionalServicesOptions: TAdditionalServicesOption[] = [
        { label: "Additional charges", value: "$23.00" },
    ];

    const additionalServicesTotalOption: TAdditionalServicesOption = {
        label: "Grand Total",
        value: "$2,323.00",
    };

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <div className={cn(`${classPrefix}__inner-wrapper`)}>
                <AddedOptionsList
                    optionsList={AddedOptionsListMockup}
                    className={`${classPrefix}_added-options__wrapper`}
                />
                <AdditionalServices
                    className={`${classPrefix}_total__wrapper`}
                    options={additionalServicesOptions}
                    totalOption={additionalServicesTotalOption}
                />
            </div>
        </div>
    );
};

export default BuilderRightSide;
