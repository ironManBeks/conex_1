import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { observer } from "mobx-react";

import BuilderProgress from "./BuilderProgress";
import BuilderStepLayout from "./BuilderStepLayout";
import BuilderRightSide from "./BuilderRightSide";
import BuilderFormActions from "./BuilderStepActions";

import {
    EBuilderFieldTypes,
    TBuilderCompProps,
    TBuilderFieldBase,
} from "../types";
import { useRootStore } from "@store";

type TBuilderDefaultValue = string | string[] | number | number[] | null;

const getBuilderDefaultValueByType = (
    fieldType: EBuilderFieldTypes,
): TBuilderDefaultValue => {
    switch (fieldType) {
        case EBuilderFieldTypes.card:
        case EBuilderFieldTypes.radio:
        case EBuilderFieldTypes.colorPicker:
        case EBuilderFieldTypes.radioButton:
            return "";
        case EBuilderFieldTypes.checkbox:
            return [];
        default:
            return null;
    }
};

const builderDefaultValuesGenerator = (fields?: TBuilderFieldBase[]) => {
    const result: Record<string, TBuilderDefaultValue> = {};
    if (!fields?.length) return result;

    for (let i = 0; i < fields.length; i++) {
        result[fields[i].value] = getBuilderDefaultValueByType(fields[i].type);
    }

    return result;
};

const BuilderForm: FC<TBuilderCompProps> = observer(({ pageClassPrefix }) => {
    const { builderStore } = useRootStore();
    const { builderData, passedSteps, getCurrentStepData } = builderStore;

    const methods = useForm({
        defaultValues: builderDefaultValuesGenerator(
            getCurrentStepData()?.fields,
        ),
    });

    const {
        formState: { defaultValues },
    } = methods;

    useEffect(() => {
        console.log("defaultValues", defaultValues);
    }, [defaultValues]);

    return (
        <FormProvider {...methods}>
            <form action="">
                <BuilderProgress pageClassPrefix={pageClassPrefix} />
                <div className={`${pageClassPrefix}_content__wrapper`}>
                    <div className={`${pageClassPrefix}_left-side__wrapper`}>
                        <BuilderStepLayout pageClassPrefix={pageClassPrefix} />
                    </div>
                    <BuilderRightSide pageClassPrefix={pageClassPrefix} />
                </div>
                <BuilderFormActions pageClassPrefix={pageClassPrefix} />
            </form>
        </FormProvider>
    );
});

export default BuilderForm;
