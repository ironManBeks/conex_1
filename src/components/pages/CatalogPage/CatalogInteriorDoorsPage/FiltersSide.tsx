import { Collapse, Slider } from "antd";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import Image from "next/image";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";

import FormFieldInputWithText from "@components/form/formFields/FormFieldInputWithText";
import { H4 } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import { EDirection } from "@globalTypes/commonTypes";
import { TStore } from "@globalTypes/storeTypes";

import {
    collapseItems,
    doorModification,
    eyeletIncluded,
} from "./FiltersMockUp";
import { formatFilterData } from "./helper/formatFilter";

interface FilterSideProps extends TStore {
    pageClassPrefix: string;
}

const FilterSide: FC<FilterSideProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const methods = useForm();
        const modifiedDoorsFilter = formatFilterData(doorModification);
        const eyeletIncludedFilter = formatFilterData(eyeletIncluded);

        return (
            <div>
                <FormProvider {...methods}>
                    <div className={`${pageClassPrefix}__filters-container`}>
                        <div
                            className={`${pageClassPrefix}__doors-filters-wrapper`}
                        >
                            <Collapse
                                defaultActiveKey={["1"]}
                                ghost
                                items={collapseItems(pageClassPrefix)}
                                expandIcon={({ isActive }) => (
                                    <Image
                                        alt="plus curcle icon"
                                        src="/icons/chevron-left.svg"
                                        width={16}
                                        height={16}
                                        className={cn({
                                            "arrow-icon_active": isActive,
                                        })}
                                    />
                                )}
                            />
                        </div>
                        <div className={`${pageClassPrefix}__filters-wrapper`}>
                            <H4
                                className={`${pageClassPrefix}__checkbox-filter_title`}
                            >
                                Price
                            </H4>
                            <div className="">
                                <div
                                    className={`${pageClassPrefix}__price-inputs-container`}
                                >
                                    <FormFieldInputWithText
                                        name="from_1"
                                        errorMessage=""
                                        placeholder="$345"
                                        type="number"
                                        min={0}
                                    />
                                    <FormFieldInputWithText
                                        name="from_2"
                                        errorMessage=""
                                        placeholder="$1 345"
                                        type="number"
                                        min={0}
                                    />
                                </div>
                                <div>
                                    <Slider
                                        range
                                        step={10}
                                        defaultValue={[20, 50]}
                                        className="common-slider"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={`${pageClassPrefix}__filters-wrapper`}>
                            <H4
                                className={`${pageClassPrefix}__checkbox-filter_title`}
                            >
                                Door modification
                            </H4>
                            <FieldCheckboxArrayController
                                name={"door_modification"}
                                shownOptions={4}
                                direction={EDirection.vertical}
                                showContentClassName={`${pageClassPrefix}__show-content-btn`}
                                options={modifiedDoorsFilter}
                            />
                        </div>
                        <div className={`${pageClassPrefix}__filters-wrapper`}>
                            <H4
                                className={`${pageClassPrefix}__checkbox-filter_title`}
                            >
                                Eyelet included
                            </H4>
                            <FieldCheckboxArrayController
                                name={"eyelet_included"}
                                direction={EDirection.vertical}
                                showContentClassName={`${pageClassPrefix}__show-content-btn`}
                                options={eyeletIncludedFilter}
                            />
                        </div>
                    </div>
                </FormProvider>
            </div>
        );
    }),
);

export default FilterSide;
