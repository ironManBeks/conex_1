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
    textArea = "TextArea",
    inputNumber = "InputNumber",
    slider = "Slider",
}

export type TFormFields = {
    [EFieldNames.input]: string;
    [EFieldNames.select]: string;
    [EFieldNames.radioArray]: string;
    [EFieldNames.radioButtonArray]: string;
    [EFieldNames.checkbox]: boolean;
    [EFieldNames.textArea]: string;
    [EFieldNames.inputNumber]: number;
    [EFieldNames.checkboxArray]: string[];
    [EFieldNames.slider]: number;
};

export const formResolver = (): Resolver<TFormFields> => {
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
            [EFieldNames.textArea]: yup.string().required(requiredText),
            [EFieldNames.inputNumber]: yup
                .number()
                .max(100, "Max count 99")
                .required(requiredText),
            [EFieldNames.checkboxArray]: yup
                .array()
                .min(1, oneFieldRequiredText)
                .of(yup.string().required())
                .required(requiredText),
            [EFieldNames.slider]: yup.number().required(requiredText),
        }),
    );
};

export const formDefaultValues = {
    [EFieldNames.input]: "",
    [EFieldNames.select]: "",
    [EFieldNames.radioArray]: "",
    [EFieldNames.radioButtonArray]: "",
    [EFieldNames.checkbox]: false,
    [EFieldNames.textArea]: "",
    [EFieldNames.inputNumber]: null,
    [EFieldNames.checkboxArray]: [],
    [EFieldNames.slider]: 0,
};

export const optionsMockup = [
    { label: "label1", value: "label1" },
    {
        label: "label2 label2  label2 label2 label2 label2 ",
        value: "label2",
    },
    {
        label: "label3label3label3label3label3label3label3",
        value: "label3",
    },
    {
        label: "disabled",
        value: "disabled",
        disabled: true,
    },
];
