import { Collapse } from "antd";
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { collapseItems } from "./FiltersMockUp";
import { listenToFormValue } from "./helper/listenToFormValues";
import { TCategoryForm } from "./types";

interface FiltersSideCategoriesProps {
    pageClassPrefix: string;
}

function FiltersSideCategories({
    pageClassPrefix,
}: FiltersSideCategoriesProps) {
    const router = useRouter();
    const methods = useForm<TCategoryForm>();

    const {
        watch,
        setValue,
        getValues,
        formState: { isDirty },
    } = methods;

    const defaultCategoryDoors = router.query.category_doors as string;
    const defaultCategoryInteriorDoors = router.query
        .category_interior_doors as string;
    const defaultCategoryPanelHeader = router.query
        .category_panel_header_3 as string;

    const formDoorsValue = watch("doors");
    const formInteriorDoorsValue = watch("interior_doors");
    const formPanelHeader3Value = watch("panel_header_3");

    const addListenerToValue = (queryKey: string, arr: string[]) =>
        listenToFormValue(queryKey, router, arr, isDirty);

    addListenerToValue("doors", formDoorsValue);
    addListenerToValue("category_interior_doors", formInteriorDoorsValue);
    addListenerToValue("category_panel_header_3", formPanelHeader3Value);

    const checkAndSetValue = (name: keyof TCategoryForm, values?: string) => {
        if (values) setValue(name, values.split(","));
    };
    useEffect(() => {
        if (!isDirty) {
            checkAndSetValue("doors", defaultCategoryDoors);
            checkAndSetValue("interior_doors", defaultCategoryInteriorDoors);
            checkAndSetValue("panel_header_3", defaultCategoryPanelHeader);
        }
    }, [
        isDirty,
        defaultCategoryDoors,
        defaultCategoryInteriorDoors,
        defaultCategoryPanelHeader,
    ]);

    const onListClick = (name: keyof TCategoryForm, filters: string[]) =>
        setValue(name, filters, { shouldDirty: true });

    return (
        <FormProvider {...methods}>
            <div className={`${pageClassPrefix}__doors-filters-wrapper`}>
                <Collapse
                    ghost
                    items={collapseItems(
                        pageClassPrefix,
                        {
                            interior_doors: getValues().doors || [],
                            doors: getValues().interior_doors || [],
                            panel_header_3: getValues().panel_header_3 || [],
                        },
                        onListClick,
                    )}
                    expandIcon={({ isActive }) => (
                        <Image
                            alt="chevron left icon"
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
        </FormProvider>
    );
}

export default FiltersSideCategories;
