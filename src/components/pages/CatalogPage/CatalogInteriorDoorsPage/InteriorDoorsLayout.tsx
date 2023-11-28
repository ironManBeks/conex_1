import { H2 } from "@components/Text";
import Breadcrumb from "@components/globalComponents/Breadcrumb";
import { TStore } from "@globalTypes/storeTypes";
import { inject, observer } from "mobx-react";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Tag from "@components/Tag";

import LeftSide from "./FiltersSide";
import RightSide from "./ContentSide";
import { addSearchQueryParams } from "./helper/addSearchQueryParams";
import { TTagsFormDefaultValues } from "./types";
import { tagsFormDefaultValues } from "./const";
import { tags } from "./FiltersMockUp";

interface InteriorDoorsLayoutProps extends TStore {
    pageClassPrefix: string;
}

const InteriorDoorsLayout: FC<
    {
        leftSideContent?: ReactNode;
        rightSideContent?: ReactNode;
        title?: ReactNode;
    } & InteriorDoorsLayoutProps
> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const router = useRouter();
        const defaultTags = router.query.tags as string;
        const methods = useForm<TTagsFormDefaultValues>({
            defaultValues: tagsFormDefaultValues,
        });
        const {
            control,
            watch,
            setValue,
            formState: { isDirty },
        } = methods;

        const formTagsValue = watch("tags");

        useEffect(() => {
            if (isDirty) {
                const filteredTags = formTagsValue.filter(Boolean);

                addSearchQueryParams(router, {
                    tags: filteredTags.length
                        ? filteredTags.join(",")
                        : undefined,
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
            <div>
                <Breadcrumb />
                <H2>
                    Interior doors
                    <span className={`${pageClassPrefix}_header-sub-text`}>
                        91 goods
                    </span>
                </H2>
                <FormProvider {...methods}>
                    <div className={`${pageClassPrefix}_filter-tags`}>
                        {tags.map(({ text, value: tagValue }, index) => (
                            <Controller
                                control={control}
                                name={`tags.${index}`}
                                key={tagValue}
                                render={({ field: { onChange, value } }) => {
                                    const onClick = () => onChange(tagValue);
                                    const onCloseIconClick = () =>
                                        onChange(null);
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

                <div className={`${pageClassPrefix}_content`}>
                    <div className={`${pageClassPrefix}_left-side`}>
                        <LeftSide pageClassPrefix={pageClassPrefix} />
                    </div>
                    <div className={`${pageClassPrefix}_right-side`}>
                        <RightSide pageClassPrefix={pageClassPrefix} />
                    </div>
                </div>
            </div>
        );
    }),
);

export default InteriorDoorsLayout;
