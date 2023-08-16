import { FC, useEffect } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { observer } from "mobx-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BuilderProgress from "./BuilderProgress";
import BuilderStepLayout from "./BuilderStepLayout";
import BuilderRightSide from "./BuilderRightSide";
import BuilderFormActions from "./BuilderStepActions";

import { TBuilderCompProps, TBuilderFieldBase } from "../types";
import { useRootStore } from "@store";
import { isEmpty } from "lodash";
import {
    EBuilderFieldTypes,
    TBuilderStepDataDTO,
} from "@store/stores/builder/types";
import { toJS } from "mobx";

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

// const builderDefaultValuesGenerator = (
//     fields?: TBuilderFieldBase[],
// ): Record<string, TBuilderDefaultValue> => {
//     const result: Record<string, TBuilderDefaultValue> = {};
//     if (!fields?.length) return result;
//     for (let i = 0; i < fields.length; i++) {
//         result[fields[i].attributes.fieldName] = getBuilderDefaultValue(
//             fields[i].attributes.fieldType,
//         );
//     }
//     return result;
// };
//
// // ToDo remove type any
const getBuilderFiledValidation = ({
    fieldType,
    fieldTitle,
    stepTitle,
}: {
    fieldType: EBuilderFieldTypes;
    fieldTitle?: string;
    stepTitle?: string;
}): any => {
    const currentFieldName = fieldTitle ? fieldTitle : stepTitle ?? "";
    const requiredText = `Field "${currentFieldName}" is required`;
    const oneFieldRequiredText = `At least one value in field "${currentFieldName}" must be filled`;

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

const builderFormResolver = (
    attributes?: TBuilderStepDataDTO["attributes"],
): Resolver | undefined => {
    if (isEmpty(attributes)) return undefined;

    // ToDo remove type any
    const validation = {
        [attributes.fieldName]: getBuilderFiledValidation({
            fieldType: attributes.fieldType,
            fieldTitle: attributes.fieldTitle,
            stepTitle: "",
        }),
    };

    return yupResolver(yup.object().shape(validation));
};

const BuilderForm: FC<TBuilderCompProps> = observer(({ pageClassPrefix }) => {
    const { builderStore } = useRootStore();
    const { currentStepData, updateCurrentStepData, stepHistory } =
        builderStore;

    const methods = useForm({
        resolver: builderFormResolver(currentStepData?.attributes),
        defaultValues: undefined,
    });

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
