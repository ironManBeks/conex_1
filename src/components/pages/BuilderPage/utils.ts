import * as yup from "yup";
import { Schema } from "yup";
import { Resolver } from "react-hook-form";
import { isEmpty } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";

import { convertBuilderFieldName } from "@helpers/builderHelper";
import {
    EBuilderFieldTypes,
    IBuilderFieldDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { removeStorage } from "@services/storage.service";
import {
    BUILDER_CURRENT_STEP_ID,
    BUILDER_HISTORY,
    BUILDER_PARENT_ID,
    BUILDER_QUEUE,
    BUILDER_RESUlT_DATA,
} from "@consts/storageNamesContsts";

export const getBuilderFiledValidation = ({
    fieldType,
    fieldTitle,
    stepTitle,
}: {
    fieldType: EBuilderFieldTypes;
    fieldTitle?: string;
    stepTitle?: string;
}): Schema => {
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
            return yup.string();
    }
};

export const builderFormResolver = (
    pageId: number | null,
    attributes?: TBuilderStepDataDTO["attributes"],
): Resolver | undefined => {
    if (isEmpty(attributes) || !pageId) return undefined;
    const isMulti = attributes?.fieldType === EBuilderFieldTypes.multiple;

    const validation: Record<string, Schema> = {};

    if (isMulti) {
        for (let i = 0; i < attributes?.subQuestions.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const field: IBuilderFieldDataDTO = attributes?.subQuestions[i];
            if (field.required && field.subfieldName) {
                validation[
                    convertBuilderFieldName(pageId, field.subfieldName)
                ] = getBuilderFiledValidation({
                    fieldType: field.fieldType,
                    fieldTitle: field.fieldTitle,
                    stepTitle: "",
                });
            }
        }
    } else {
        validation[convertBuilderFieldName(pageId, attributes.fieldName)] =
            getBuilderFiledValidation({
                fieldType: attributes.fieldType,
                fieldTitle: attributes.fieldTitle,
                stepTitle: "",
            });
    }

    return yupResolver(yup.object().shape(validation));
};

export const handleClearBuilderStorage = (): void => {
    removeStorage(BUILDER_HISTORY);
    removeStorage(BUILDER_QUEUE);
    removeStorage(BUILDER_RESUlT_DATA);
    removeStorage(BUILDER_CURRENT_STEP_ID);
    removeStorage(BUILDER_PARENT_ID);
};
