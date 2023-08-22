import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    IBuilderFieldDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { FieldValues } from "react-hook-form";
import { isArray, isEmpty, isNumber } from "lodash";
import { toJS } from "mobx";

export type TGetNextStepResult = number | number[] | "end" | null;
export type TBuilderDefaultValue = string | string[] | number | number[] | null;
export type TGetDefaultValuesResult =
    | Record<string, TBuilderDefaultValue>
    | undefined;

export const getNextStep = (
    currentStep: TBuilderStepDataDTO | null,
    fieldsList: FieldValues,
): TGetNextStepResult => {
    if (isEmpty(currentStep) || isEmpty(fieldsList)) {
        return null;
    }
    const stepType = currentStep?.attributes.fieldType;

    for (const fieldKey in fieldsList) {
        const fieldValue = fieldsList[fieldKey];
        const isValueArray = isArray(fieldValue);

        if (stepType === EBuilderFieldTypes.multiple) {
            return currentStep.attributes.nextQuestion;
        } else {
            if (isValueArray) {
                const steps: number[] = [];
                for (let i = 0; i < fieldValue.length; i++) {
                    const selectedElement =
                        // ToDo Remove ts-ignore
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        currentStep?.attributes.subQuestions.find(
                            (item: IBuilderElementDataDTO) =>
                                item.value === fieldValue[i],
                        );
                    if (selectedElement?.nextQuestion) {
                        steps.push(selectedElement.nextQuestion);
                    }
                }
                return steps;
            } else {
                const selectedElement =
                    // ToDo Remove ts-ignore
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    currentStep?.attributes.subQuestions.find(
                        (item: IBuilderElementDataDTO) =>
                            item.value === fieldValue,
                    );
                if (!isEmpty(selectedElement)) {
                    if (isNumber(selectedElement.nextQuestion)) {
                        return selectedElement.nextQuestion;
                    } else return "end";
                }
            }
        }
    }

    return null;
};

const convertBuilderDefaultValues = (
    value: string[],
    fieldType: EBuilderFieldTypes,
) => {
    switch (fieldType) {
        case EBuilderFieldTypes.card:
        case EBuilderFieldTypes.radio:
        case EBuilderFieldTypes.colorPicker:
        case EBuilderFieldTypes.radioButton:
            return value[0];
        case EBuilderFieldTypes.checkbox:
            return value;
        default:
            return value;
    }
};

export const getBuilderStepDefaultValues = (
    attributes: TBuilderStepDataDTO["attributes"],
): TGetDefaultValuesResult => {
    if (isEmpty(attributes)) {
        return undefined;
    }
    const isMultiStep = attributes.fieldType === EBuilderFieldTypes.multiple;

    const result: TGetDefaultValuesResult = {};

    // return { ["is_default"]: "Interior" };
    if (isMultiStep) {
        for (let i = 0; i < attributes.subQuestions.length; i++) {
            // ToDo Remove ts-ignore
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const fieldsList: IBuilderFieldDataDTO[] = attributes.subQuestions;
            if (fieldsList.length) {
                for (let j = 0; j < fieldsList.length; j++) {
                    const defaultValues: string[] = [];
                    const elementsList = fieldsList[j].questions;
                    for (let el = 0; el < elementsList.length; el++) {
                        const element = elementsList[el];
                        if (element.default) {
                            // console.log("element.value", element.value);
                            defaultValues.push(element.value);
                        }
                    }
                    if (
                        !isEmpty(fieldsList[j]) &&
                        fieldsList[j].subfieldName &&
                        defaultValues.length
                    ) {
                        // ToDo Remove ts-ignore
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        result[fieldsList[j].subfieldName] =
                            convertBuilderDefaultValues(
                                defaultValues,
                                fieldsList[j].fieldType,
                            );
                    }
                }
            }
        }
    } else {
        return undefined;
    }

    return isEmpty(result) ? undefined : result;
};
