import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { H4 } from "@components/Text";
import FieldCheckboxArrayController from "@components/form/formControllers/FieldCheckboxArrayController";
import { EDirection } from "@globalTypes/commonTypes";

import { doorModification } from "./FiltersMockUp";
import { formatFilterData } from "../helper/formatFilter";
import { listenToFormValue } from "../helper/listenToFormValues";
import { TDoorModificationForm } from "../types";

interface FiltersSideDoorModificationProps {
    pageClassPrefix: string;
}

function FiltersSideDoorModification({
    pageClassPrefix,
}: FiltersSideDoorModificationProps) {
    const router = useRouter();
    const methods = useForm<TDoorModificationForm>();
    const {
        watch,
        setValue,
        formState: { isDirty },
    } = methods;

    const defaultDoorModification = router.query.door_modification as string;
    const modifiedDoorsFilter = formatFilterData(doorModification);
    const formDoorModificationValue = watch("door_modification");

    listenToFormValue(
        "door_modification",
        router,
        formDoorModificationValue,
        isDirty,
    );

    useEffect(() => {
        if (!isDirty && defaultDoorModification)
            setValue("door_modification", defaultDoorModification.split(","));
    }, [isDirty, defaultDoorModification]);

    return (
        <FormProvider {...methods}>
            <div className={`${pageClassPrefix}__filters-wrapper`}>
                <H4 className={`${pageClassPrefix}__checkbox-filter_title`}>
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
        </FormProvider>
    );
}

export default FiltersSideDoorModification;
