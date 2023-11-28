import { Collapse, Slider } from "antd";
import cn from "classnames";
import { inject, observer } from "mobx-react";
import Image from "next/image";
import { FC, useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

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
import { TCategoriesFormDefaultValues } from "./types";
import {
    MAX_PRICE,
    MIN_PRICE,
    SLIDER_STEPS,
    categoriesFormDefaultValues,
} from "./const";
import { useRouter } from "next/router";
import { listenToFormValue } from "./helper/listenToFormValues";
import { clamp, debounce } from "lodash";
import { addSearchQueryParams } from "./helper/addSearchQueryParams";
import { joinArr } from "./helper/joinArray";

interface FilterSideProps extends TStore {
    pageClassPrefix: string;
}

const FilterSide: FC<FilterSideProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const methods = useForm<TCategoriesFormDefaultValues>({
            defaultValues: categoriesFormDefaultValues,
        });
        const modifiedDoorsFilter = formatFilterData(doorModification);
        const eyeletIncludedFilter = formatFilterData(eyeletIncluded);
        const router = useRouter();
        const {
            control,
            watch,
            setValue,
            formState: { isDirty },
        } = methods;
        const defaultCategoryDoors = router.query.category_doors as string;
        const defaultCategoryInteriorDoors = router.query
            .category_interior_doors as string;
        const defaultCategoryPanelHeader = router.query
            .category_panel_header_3 as string;
        const defaultPrice = router.query.price as string;
        const defaultEyeletIncluded = router.query.eyelet_included as string;
        const defaultDoorModification = router.query
            .door_modification as string;

        const formPriceValue = watch("price");
        const formEyeletIncludedValue = watch("eyelet_included");
        const formDoorModificationValue = watch("door_modification");
        const formCategoriesDoorsValue = watch("categories");
        const formCategoriesInteriorDoorsValue = watch(
            "categories.interior_doors",
        );
        const formCategoriesPanelHeader3Value = watch(
            "categories.panel_header_3",
        );

        const addListenerToValue = (queryKey: string, arr: string[]) =>
            listenToFormValue(queryKey, router, arr, isDirty);

        useEffect(() => {
            if (isDirty)
                addSearchQueryParams(router, {
                    ["category_doors"]: joinArr(formCategoriesDoorsValue.doors),
                });
        }, [isDirty, formCategoriesDoorsValue.doors?.length]);
        addListenerToValue(
            "category_interior_doors",
            formCategoriesInteriorDoorsValue,
        );
        addListenerToValue(
            "category_panel_header_3",
            formCategoriesPanelHeader3Value,
        );
        addListenerToValue("eyelet_included", formEyeletIncludedValue);
        addListenerToValue("door_modification", formDoorModificationValue);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const checkAndSetValue = (name: any, values?: string) => {
            if (values) setValue(name, values.split(","));
        };

        useEffect(() => {
            if (!isDirty) {
                checkAndSetValue("categories.doors", defaultCategoryDoors);
                checkAndSetValue(
                    "categories.interior_doors",
                    defaultCategoryInteriorDoors,
                );
                checkAndSetValue(
                    "categories.panel_header_3",
                    defaultCategoryPanelHeader,
                );
                checkAndSetValue("eyelet_included", defaultEyeletIncluded);
                checkAndSetValue("door_modification", defaultDoorModification);
                checkAndSetValue("price", defaultPrice);
            }
        }, [
            isDirty,
            defaultCategoryDoors,
            defaultCategoryInteriorDoors,
            defaultCategoryPanelHeader,
            defaultEyeletIncluded,
            defaultDoorModification,
            defaultPrice,
        ]);

        const priceQueryDebounce = useCallback(
            debounce((value: [number, number]) => {
                addSearchQueryParams(router, {
                    price: value.join(","),
                });
            }, 1000),
            [],
        );

        useEffect(() => {
            if (isDirty) priceQueryDebounce(formPriceValue);
        }, [formPriceValue]);

        return (
            <div>
                <FormProvider {...methods}>
                    <div className={`${pageClassPrefix}__filters-container`}>
                        <div
                            className={`${pageClassPrefix}__doors-filters-wrapper`}
                        >
                            <Controller
                                control={control}
                                name="categories"
                                render={({ field: { onChange, value } }) => {
                                    const onListClick = (category: object) => {
                                        onChange({
                                            ...value,
                                            ...category,
                                        });
                                    };

                                    return (
                                        <Collapse
                                            ghost
                                            items={collapseItems(
                                                pageClassPrefix,
                                                value,
                                                onListClick,
                                            )}
                                            expandIcon={({ isActive }) => (
                                                <Image
                                                    alt="chevron left icon"
                                                    src="/icons/chevron-left.svg"
                                                    width={16}
                                                    height={16}
                                                    className={cn({
                                                        "arrow-icon_active":
                                                            isActive,
                                                    })}
                                                />
                                            )}
                                        />
                                    );
                                }}
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
                                    <Controller
                                        control={control}
                                        name="price"
                                        render={({
                                            field: { onChange, value },
                                        }) => {
                                            const onBlur = (
                                                changeValue: string,
                                            ) =>
                                                onChange([
                                                    clamp(
                                                        Number(changeValue),
                                                        MIN_PRICE,
                                                        value[1] - 10,
                                                    ),
                                                    value[1],
                                                ]);

                                            return (
                                                <FormFieldInputWithText
                                                    name="start_price"
                                                    errorMessage=""
                                                    placeholder="$345"
                                                    type="number"
                                                    onChange={(e) =>
                                                        onChange([
                                                            e.target.value,
                                                            value[1],
                                                        ])
                                                    }
                                                    onBlur={(e) => {
                                                        onBlur(e.target.value);
                                                    }}
                                                    value={value[0]}
                                                    min={0}
                                                    max={value[1] - 10}
                                                />
                                            );
                                        }}
                                    />
                                    <Controller
                                        control={control}
                                        name="price"
                                        render={({
                                            field: { onChange, value },
                                        }) => {
                                            const onBlur = (
                                                changeValue: string,
                                            ) =>
                                                onChange([
                                                    value[0],
                                                    clamp(
                                                        Number(changeValue),
                                                        value[0] + 10,
                                                        MAX_PRICE,
                                                    ),
                                                ]);

                                            return (
                                                <FormFieldInputWithText
                                                    name="end_price"
                                                    errorMessage=""
                                                    placeholder="$1 345"
                                                    type="number"
                                                    onChange={(e) =>
                                                        onChange([
                                                            value[0],
                                                            e.target.value,
                                                        ])
                                                    }
                                                    onBlur={(e) =>
                                                        onBlur(e.target.value)
                                                    }
                                                    value={value[1]}
                                                    min={value[0] + 10}
                                                    max={2000}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name="price"
                                        render={({
                                            field: { onChange, value },
                                        }) => (
                                            <Slider
                                                range
                                                step={SLIDER_STEPS}
                                                max={MAX_PRICE}
                                                onChange={onChange}
                                                value={value}
                                                className="common-slider"
                                            />
                                        )}
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
