import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { observer } from "mobx-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

const getBuilderDefaultValue = (
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

const builderDefaultValuesGenerator = (
    fields?: TBuilderFieldBase[],
): Record<string, TBuilderDefaultValue> => {
    const result: Record<string, TBuilderDefaultValue> = {};
    if (!fields?.length) return result;
    for (let i = 0; i < fields.length; i++) {
        result[fields[i].value] = getBuilderDefaultValue(fields[i].type);
    }
    return result;
};

const getBuilderFiledValidation = ({
    fieldType,
    fieldTitle,
    stepTitle,
}: {
    fieldType: EBuilderFieldTypes;
    fieldTitle?: string;
    stepTitle?: string;
}): any => {
    const requiredText = `Field "${
        fieldTitle ? fieldTitle : stepTitle ?? ""
    }" is required`;
    const oneFieldRequiredText = "At least one field must be filled";

    switch (fieldType) {
        case EBuilderFieldTypes.card:
        case EBuilderFieldTypes.radio:
        case EBuilderFieldTypes.colorPicker:
        case EBuilderFieldTypes.radioButton:
            return yup.string().required(requiredText);
        case EBuilderFieldTypes.checkbox:
            return yup
                .array()
                .min(1, oneFieldRequiredText)
                .of(yup.string().required(requiredText))
                .required(requiredText);
        default:
            return null;
    }
};

const builderFormResolver = ({
    fields,
    stepTitle,
}: {
    fields?: TBuilderFieldBase[];
    stepTitle?: string;
}): any => {
    if (!fields?.length) return undefined;

    const validations: any = {};

    for (let i = 0; i < fields.length; i++) {
        if (fields[i].isRequired) {
            validations[fields[i].value] = getBuilderFiledValidation({
                fieldType: fields[i].type,
                fieldTitle: fields[i].title,
                stepTitle: stepTitle,
            });
        }
    }

    return yupResolver(yup.object().shape(validations));
};

const BuilderForm: FC<TBuilderCompProps> = observer(({ pageClassPrefix }) => {
    const { builderStore } = useRootStore();
    const { builderData, passedSteps, currentStepData, updateCurrentStepData } =
        builderStore;

    const methods = useForm({
        resolver: builderFormResolver({
            fields: currentStepData?.fields,
            stepTitle: currentStepData?.stepTitle,
        }),
        defaultValues: builderDefaultValuesGenerator(currentStepData?.fields),
    });

    const {
        formState: { defaultValues },
    } = methods;

    useEffect(() => {
        updateCurrentStepData("start");
    }, []);

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
