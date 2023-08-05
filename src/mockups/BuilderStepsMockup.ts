import {
    EBuilderFieldTypes,
    IBuilderElementBase,
    IBuilderElementCardProps,
    IBuilderElementCheckboxProps,
    TBuilderStep,
} from "@components/pages/BuilderPage/types";

const BuilderElementsCardMockup: IBuilderElementCardProps[] = [
    {
        id: "element_card_id_1",
        value: "element_value_card_option_1",
        title: "card title 1",
        popular: false,
        disabled: false,
        subTitle: "card subTitle 1",
        imgSrc: "https://picsum.photos/id/1/200/300",
        price: "1",
        currency: "₽",
    },
    {
        id: "element_card_id_2",
        value: "element_value_card_option_2",
        title: "card title 2",
        popular: true,
        subTitle: "card subTitle 2",
        imgSrc: "https://picsum.photos/id/2/200/300",
        price: "22",
        currency: "€",
    },
    {
        id: "element_card_id_3",
        value: "element_value_card_option_3",
        title: "card title 3",
        disabled: true,
        subTitle: "card subTitle 3",
        imgSrc: "https://picsum.photos/id/3/200/300",
        price: "333",
        currency: "$",
    },
];

const BuilderElementsCheckboxMockup: IBuilderElementCheckboxProps[] = [
    {
        id: "element_checkbox_id_1",
        value: "element_value_checkbox_option_1",
        title: "Checkbox title 1",
        popular: false,
        disabled: false,
    },
    {
        id: "element_checkbox_id_2",
        value: "element_value_checkbox_option_2",
        title: "Checkbox title 2",
        popular: true,
    },
    {
        id: "element_checkbox_id_3",
        value: "element_value_checkbox_option_3",
        title: "Checkbox title 3",
        disabled: true,
    },
];

const BuilderElementsRadioMockup: IBuilderElementBase[] = [
    {
        id: "element_checkbox_id_1",
        value: "element_value_radio_option_1",
        title: "Radio title 1",
        popular: false,
        disabled: false,
    },
    {
        id: "element_checkbox_id_2",
        value: "element_value_radio_option_2",
        title: "Radio title 2",
        popular: true,
    },
    {
        id: "element_checkbox_id_3",
        value: "element_value_radio_option_3",
        title: "Radio title 3",
        disabled: true,
    },
];

const BuilderElementsRadioButtonMockup: IBuilderElementBase[] = [
    {
        id: "element_radioButton_id_1",
        value: "element_value_radioButton_option_1",
        title: "RadioButton title 1",
        popular: false,
        disabled: false,
    },
    {
        id: "element_radioButton_id_2",
        value: "element_value_radioButton_option_2",
        title: "RadioButton title 2",
        popular: true,
    },
    {
        id: "element_radioButton_id_3",
        value: "element_value_radioButton_option_3",
        title: "RadioButton title 3",
        disabled: true,
    },
];

export const BuilderDataMockup: TBuilderStep[] = [
    {
        stepId: "stepId_1",
        stepTitle: "Главный заголовок первого шага",
        stepDescription:
            "leo et aliquam blandit. Pellentesque aliquet eget orci ut iaculis. Praesent purus erat, varius et libero sed, aliquet malesuada sapien. Etiam tempor p.",
        fields: [
            {
                id: "BuilderField_1",
                type: EBuilderFieldTypes.card,
                value: "filed_value_card",
                title: "Cards field",
                elements: BuilderElementsCardMockup,
            },
            {
                id: "BuilderField_2",
                type: EBuilderFieldTypes.checkbox,
                value: "filed_value_checkbox",
                title: "Checkbox field",
                elements: BuilderElementsCheckboxMockup,
            },
        ],
    },
    {
        stepId: "stepId_2",
        stepTitle: "Главный заголовок 2",
        fields: [
            {
                id: "BuilderField_3",
                type: EBuilderFieldTypes.radio,
                value: "filed_value_radio",
                title: "Radio field",
                titleSize: "small",
                elements: BuilderElementsRadioMockup,
            },
            {
                id: "BuilderField_4",
                type: EBuilderFieldTypes.radioButton,
                value: "filed_value_radioButton",
                title: "RadioButton field",
                titleSize: "small",
                elements: BuilderElementsRadioButtonMockup,
            },
        ],
    },
];
