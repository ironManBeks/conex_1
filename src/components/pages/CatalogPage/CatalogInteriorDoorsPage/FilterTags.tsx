import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import Tag from "@components/Tag";

import { tags } from "./FiltersMockUp";
import { tagsFormDefaultValues } from "./const";
import { addSearchQueryParams } from "./helper/addSearchQueryParams";
import { TTagsFormDefaultValues } from "./types";

interface FilterTagsProps {
    pageClassPrefix: string;
}

function FilterTags({ pageClassPrefix }: FilterTagsProps) {
    const router = useRouter();
    const methods = useForm<TTagsFormDefaultValues>({
        defaultValues: tagsFormDefaultValues,
    });
    const {
        control,
        watch,
        setValue,
        formState: { isDirty },
    } = methods;
    const defaultTags = router.query.tags as string;

    const formTagsValue = watch("tags");

    useEffect(() => {
        if (isDirty) {
            const filteredTags = formTagsValue.filter(Boolean);

            addSearchQueryParams(router, {
                tags: filteredTags.length ? filteredTags.join(",") : undefined,
            });
        }
    }, [formTagsValue.join(","), isDirty]);

    useEffect(() => {
        const modifedDefaultTags = tags.map(({ value }) => {
            const isInArray = defaultTags
                ?.split(",")
                .find((queryTag) => queryTag === value);

            if (isInArray) return value;

            return null;
        });

        if (defaultTags) setValue("tags", modifedDefaultTags);
    }, [defaultTags]);

    return (
        <FormProvider {...methods}>
            <div className={`${pageClassPrefix}_filter-tags`}>
                {tags.map(({ text, value: tagValue }, index) => (
                    <Controller
                        control={control}
                        name={`tags.${index}`}
                        key={tagValue}
                        render={({ field: { onChange, value } }) => {
                            const onClick = () => onChange(tagValue);
                            const onCloseIconClick = () => onChange(null);
                            const isActive = tagValue === value;
                            return (
                                <Tag
                                    size="small"
                                    onClick={onClick}
                                    isCloseIcon={isActive}
                                    onCloseIconClick={onCloseIconClick}
                                    isActive={isActive}
                                >
                                    {text}
                                </Tag>
                            );
                        }}
                    />
                ))}
            </div>
        </FormProvider>
    );
}

export default FilterTags;
