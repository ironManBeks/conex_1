import { useForm } from "react-hook-form";
import { Controller, FormProvider } from "react-hook-form";
import { FC, useEffect } from "react";

import SortBy from "@components/SortBy";
import DisplayToggle from "@components/DisplayToggle";
import { useRouter } from "next/router";
import { ITEMS_DISPLAY } from "@consts/queryNamesConsts";

import { sortFormDefaultValues, sortTypes } from "./const";
import { changeSortChange } from "../helper/changeSortChange";
import { addSearchQueryParams } from "../helper/addSearchQueryParams";
import { TSortFormDefaultValues } from "../types";

interface ContentSideHeaderProps {
    pageClassPrefix: string;
}

const ContentSideHeader: FC<ContentSideHeaderProps> = ({ pageClassPrefix }) => {
    const router = useRouter();
    const additionalClassName = "content-header";
    const classNameBase = `${pageClassPrefix}__${additionalClassName}`;

    const defaultDisplay = router.query[ITEMS_DISPLAY] as string;
    const defaultSort = router.query.sort as string;

    const methods = useForm<TSortFormDefaultValues>({
        defaultValues: sortFormDefaultValues,
    });
    const { control, watch, setValue } = methods;
    const formSortValue = watch("sort");

    const onDisplayToggle = (value: string | number) => {
        addSearchQueryParams(router, { [ITEMS_DISPLAY]: value });
    };

    useEffect(() => {
        if (formSortValue)
            addSearchQueryParams(router, { sort: formSortValue });
    }, [formSortValue]);

    useEffect(() => {
        if (defaultSort) setValue("sort", defaultSort);
    }, [defaultSort]);

    return (
        <div className={classNameBase}>
            <div className={`${classNameBase}__sorters`}>
                <span className={`${classNameBase}__sort-text`}>Sort by</span>
                <FormProvider {...methods}>
                    {sortTypes.map(
                        ({ text, icon, descIcon, value: valueType }) => (
                            <Controller
                                control={control}
                                name="sort"
                                key={text}
                                render={({ field: { onChange, value } }) => {
                                    const isActive = value?.includes(valueType);
                                    const isDesc =
                                        value === `${valueType}_desc`;
                                    const onClick = () =>
                                        onChange(
                                            changeSortChange(valueType, value),
                                        );

                                    return (
                                        <SortBy
                                            text={text}
                                            icon={isDesc ? descIcon : icon}
                                            isActive={isActive}
                                            isDesc={isDesc}
                                            onClick={onClick}
                                        />
                                    );
                                }}
                            />
                        ),
                    )}
                </FormProvider>
            </div>

            <div className={`${classNameBase}__display`}>
                <DisplayToggle
                    onIconClick={onDisplayToggle}
                    display={defaultDisplay || "grid"}
                    className={`${classNameBase}__display-toggle`}
                />
            </div>
        </div>
    );
};

export default ContentSideHeader;
