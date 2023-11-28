import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { H4 } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import { EDirection } from "@globalTypes/commonTypes";

import { eyeletIncluded } from "./FiltersMockUp";
import { formatFilterData } from "./helper/formatFilter";
import { listenToFormValue } from "./helper/listenToFormValues";
import { TEyeletIncludedForm } from "./types";

interface FiltersSideEyeletProps {
    pageClassPrefix: string;
}

function FiltersSideEyelet({ pageClassPrefix }: FiltersSideEyeletProps) {
    const router = useRouter();
    const methods = useForm<TEyeletIncludedForm>();
    const {
        watch,
        setValue,
        formState: { isDirty },
    } = methods;
    const defaultEyeletIncluded = router.query.eyelet_included as string;
    const eyeletIncludedFilter = formatFilterData(eyeletIncluded);
    const formEyeletIncludedValue = watch("eyelet_included");

    listenToFormValue(
        "eyelet_included",
        router,
        formEyeletIncludedValue,
        isDirty,
    );

    useEffect(() => {
        if (!isDirty && defaultEyeletIncluded)
            setValue("eyelet_included", defaultEyeletIncluded.split(","));
    }, [isDirty, defaultEyeletIncluded]);

    return (
        <FormProvider {...methods}>
            <div className={`${pageClassPrefix}__filters-wrapper`}>
                <H4 className={`${pageClassPrefix}__checkbox-filter_title`}>
                    Eyelet included
                </H4>
                <FieldCheckboxArrayController
                    name={"eyelet_included"}
                    direction={EDirection.vertical}
                    showContentClassName={`${pageClassPrefix}__show-content-btn`}
                    options={eyeletIncludedFilter}
                />
            </div>
        </FormProvider>
    );
}

export default FiltersSideEyelet;
