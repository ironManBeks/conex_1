import { FC } from "react";
import cn from "classnames";

import AddedOptionsList from "@components/globalComponents/AddedOptionsList";
import AdditionalServices from "@components/globalComponents/AdditionalServices";

import { BuilderAddedOptionsListMockup } from "../../../../mockups/AddedOptionsListMockup";
import { TAdditionalServicesOption } from "@components/globalComponents/types";
import { TBuilderCompProps } from "../types";

const BuilderRightSide: FC<TBuilderCompProps> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_right-side`;

    const additionalServicesOptions: TAdditionalServicesOption[] = [
        { label: "Additional charges", value: "$111.00" },
    ];

    const additionalServicesTotalOption: TAdditionalServicesOption = {
        label: "Grand Total",
        value: "$123.00",
    };

    return (
        <div className={cn(`${classPrefix}__wrapper`)}>
            <div className={cn(`${classPrefix}__inner-wrapper`)}>
                <AddedOptionsList
                    optionsList={[
                        {
                            title: "qwe",
                            list: [
                                { label: "111", value: 111 },
                                { label: "123", value: 123 },
                            ],
                        },
                    ]}
                />
                <AdditionalServices
                    options={additionalServicesOptions}
                    totalOption={additionalServicesTotalOption}
                />
            </div>
        </div>
    );
};

export default BuilderRightSide;
