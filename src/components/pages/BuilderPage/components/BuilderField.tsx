import { FC, ReactElement, useState } from "react";
import cn from "classnames";

import { H2, P } from "@components/Text";

import { EBuilderFieldTypes, TBuilderElements, TBuilderField } from "../types";

const BuilderField: FC<TBuilderField> = ({
    className,
    id,
    type,
    title,
    titleSize,
    value,
    elements,
    opportunity,
}) => {
    const classPrefix = `builder-field`;

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            {title && <H2 className={`${classPrefix}_title`}>{title}</H2>}
            <div className={`${classPrefix}_content`}>
                {builderElementsGenerator({ elements, type, value })}
            </div>
        </div>
    );
};

export default BuilderField;

const builderElementsGenerator = ({
    elements,
    type,
}: {
    type: EBuilderFieldTypes;
    value: string;
} & TBuilderElements): ReactElement => {
    return <div>123123123</div>;
};
