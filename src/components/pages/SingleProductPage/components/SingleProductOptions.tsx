import { FC, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { H4 } from "@components/Text";
import FieldRadioButtonArrayController from "@components/form/formControllers/FieldRadioButtonArrayController";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import {
    ESingleProductOptionTypes,
    TSingleProductOptions,
} from "@store/products/types";
import { TSingleProductOptionsProps } from "../types";
import { ERadioButtonRenderStyles } from "@components/form/formControllers/FieldRadioButtonArrayController/types";

const SingleProductOptions: FC<TSingleProductOptionsProps> = ({
    pageClassPrefix,
    options,
}) => {
    const classPrefix = `${pageClassPrefix}_options`;

    if (options?.length) {
        return (
            <div className={`${classPrefix}__wrapper`}>
                <div className={`${classPrefix}__form`}>
                    {options.map((item) => (
                        <OptionRow {...item} />
                    ))}
                </div>
            </div>
        );
    } else return null;
};

export default SingleProductOptions;

const OptionRow = ({
    title,
    type,
    list,
    optionsName,
}: TSingleProductOptions) => {
    const className = "option-row";
    const { watch } = useFormContext();

    const selectedOption = list.find(
        (element) => element.value === watch(optionsName),
    );

    const renderField = useMemo(() => {
        switch (type) {
            case ESingleProductOptionTypes.radio:
                return (
                    <FieldRadioButtonArrayController
                        name={optionsName}
                        renderStyle={ERadioButtonRenderStyles.reduced}
                        options={list}
                    />
                );
            case ESingleProductOptionTypes.colorPicker:
                return (
                    <FieldRadioButtonArrayController
                        name={optionsName}
                        renderStyle={ERadioButtonRenderStyles.colorpicker}
                        options={list.map((item) => ({
                            ...item,
                            label: (
                                <>
                                    <span className={"color_wrapper"}>
                                        <span
                                            className={"color_inner-wrapper"}
                                            style={{ background: item.color }}
                                        />
                                    </span>
                                    {item.label}
                                </>
                            ),
                        }))}
                    />
                );
            case ESingleProductOptionTypes.radioImage:
                return (
                    <FieldRadioButtonArrayController
                        name={optionsName}
                        renderStyle={ERadioButtonRenderStyles.imagepicker}
                        options={list.map((item) => ({
                            ...item,
                            label: (
                                <ImgWrapper
                                    src={item.src}
                                    alt={`Image: ${item.label}`}
                                    objectFit={"cover"}
                                />
                            ),
                        }))}
                    />
                );
            default:
                return <div>Options not found</div>;
        }
    }, [type, list]);

    return (
        <div className={`${className}_wrapper`}>
            <H4 className={`${className}_title`}>
                {title}: {selectedOption?.label}
            </H4>
            {renderField}
        </div>
    );
};
