import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Resolver } from "react-hook-form";

export enum EFieldNames {
    input = "Input",
    select = "Select",
    radioArray = "RadioArray",
    radioButtonArray = "RadioButtonArray",
    checkbox = "Checkbox",
    checkboxArray = "CheckboxArray",
}

export type TFormFields = {
    [EFieldNames.input]: string;
    [EFieldNames.select]: string;
    [EFieldNames.radioArray]: string;
    [EFieldNames.radioButtonArray]: string;
    [EFieldNames.checkbox]: boolean;
    [EFieldNames.checkboxArray]: Record<string, boolean>; // { label1: true, label2: false }
};

export const formCreateResolver = (): Resolver<TFormFields> => {
    const requiredText = "This field is required";
    const oneFieldRequiredText = "At least one field must be filled";
    const mustBeActiveText = "This field must be active";
    return yupResolver(
        yup.object().shape({
            [EFieldNames.input]: yup.string().required(requiredText),
            [EFieldNames.select]: yup.string().required(requiredText),
            [EFieldNames.radioArray]: yup.string().required(requiredText),
            [EFieldNames.radioButtonArray]: yup.string().required(requiredText),
            [EFieldNames.checkbox]: yup
                .boolean()
                .oneOf([true], mustBeActiveText)
                .required(requiredText),
            [EFieldNames.checkboxArray]: yup
                .object<Record<string, boolean>>()
                .required(requiredText),
            // [EFieldNames.checkboxArray]: yup
            //     .array()
            //     .of(
            //         yup.object().shape({
            //             string: yup.string().required(requiredText),
            //             boolean: yup
            //                 .boolean()
            //                 .oneOf([true], mustBeActiveText)
            //                 .required(requiredText),
            //         }),
            //     )
            //     .min(1, oneFieldRequiredText)
            //     .required(requiredText),
        }),
    );
};

export const formDefaultValues: TFormFields = {
    [EFieldNames.input]: "",
    [EFieldNames.select]: "",
    [EFieldNames.radioArray]: "",
    [EFieldNames.radioButtonArray]: "",
    [EFieldNames.checkbox]: false,
    [EFieldNames.checkboxArray]: {},
};

export const optionsMockup = [
    { label: "label1", value: "label1" },
    {
        label: "label2 label2  label2 label2 label2 label2 ",
        value: "label2",
    },
    // {
    //     label: "label3label3label3label3label3label3label3",
    //     value: "label3",
    // },
    // {
    //     label: "disabled",
    //     value: "disabled",
    //     disabled: true,
    // },
];
