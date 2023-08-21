import {
    EBuilderFieldTypes,
    IBuilderElementDataDTO,
    TBuilderStepDataDTO,
} from "@store/builder/types";
import { FieldValues } from "react-hook-form";
import { isArray, isEmpty, isNumber } from "lodash";
import { notImplemented } from "@helpers/notImplemented";

export type TGetNextStepResult = number | number[] | "end" | null;

export const getNextStep = (
    currentStep: TBuilderStepDataDTO | null,
    fieldsList: FieldValues,
): TGetNextStepResult => {
    if (isEmpty(currentStep) || isEmpty(fieldsList)) {
        return null;
    }
    const stepType = currentStep?.attributes.fieldType;

    // console.log("step", currentStep);

    console.log("fieldValues", fieldsList);

    for (const fieldKey in fieldsList) {
        const fieldValue = fieldsList[fieldKey];
        const isValueArray = isArray(fieldValue);

        if (stepType === EBuilderFieldTypes.multiple) {
            if (isValueArray) {
                console.log("multiple____isValueArray", fieldValue);
                notImplemented("No logic on this page");
            } else {
                notImplemented("No logic on this page");
            }
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

// if (isArray(selectedValue)) {
//     const pages: number[] = [];
//     for (let i = 0; i < selectedValue.length; i++) {
//         const selectedElement = step?.attributes.fieldElements.find(
//             (item) => item.value === selectedValue[i],
//         );
//         if (selectedElement?.nextQuestion) {
//             pages.push(selectedElement.nextQuestion);
//         }
//     }
//     return pages;
// } else {
//     const selectedElement = step?.attributes.fieldElements.find(
//         (item) => item.value === selectedValue,
//     );
//     if (!isEmpty(selectedElement)) {
//         if (isNumber(selectedElement.nextQuestion)) {
//             return selectedElement.nextQuestion;
//         } else return "end";
//     }
// }
