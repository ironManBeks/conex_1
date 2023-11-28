import { Slider } from "antd";
import { clamp, debounce } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { H4 } from "@components/Text";
import FormFieldInputWithText from "@components/form/formFields/FormFieldInputWithText";

import { MAX_PRICE, MIN_PRICE, SLIDER_STEPS } from "./const";
import { addSearchQueryParams } from "./helper/addSearchQueryParams";
import { TPriceForm } from "./types";

interface FiltersSidePriceProps {
    pageClassPrefix: string;
}

function FiltersSidePrice({ pageClassPrefix }: FiltersSidePriceProps) {
    const router = useRouter();
    const methods = useForm<TPriceForm>({
        defaultValues: {
            price: [MIN_PRICE, MAX_PRICE],
        },
    });
    const {
        control,
        watch,
        setValue,
        formState: { isDirty },
    } = methods;
    const defaultPrice = router.query.price as string;

    const formPriceValue = watch("price");

    const priceQueryDebounce = useCallback(
        debounce((value: [number, number]) => {
            addSearchQueryParams(router, {
                price: value.join(","),
            });
        }, 1000),
        [router.query],
    );

    useEffect(() => {
        if (isDirty) priceQueryDebounce(formPriceValue);
    }, [formPriceValue]);

    useEffect(() => {
        if (!isDirty && defaultPrice) {
            const [start, end] = defaultPrice.split(",");

            setValue("price", [Number(start), Number(end)]);
        }
    }, [isDirty, defaultPrice]);

    return (
        <FormProvider {...methods}>
            <div className={`${pageClassPrefix}__filters-wrapper`}>
                <H4 className={`${pageClassPrefix}__checkbox-filter_title`}>
                    Price
                </H4>
                <div className="">
                    <div
                        className={`${pageClassPrefix}__price-inputs-container`}
                    >
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { onChange, value } }) => {
                                const onBlur = (changeValue: string) =>
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
                                            onChange([e.target.value, value[1]])
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
                            render={({ field: { onChange, value } }) => {
                                const onBlur = (changeValue: string) =>
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
                                            onChange([value[0], e.target.value])
                                        }
                                        onBlur={(e) => onBlur(e.target.value)}
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
                            render={({ field: { onChange, value } }) => (
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
        </FormProvider>
    );
}

export default FiltersSidePrice;
