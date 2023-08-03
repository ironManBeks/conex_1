import { FC, useState } from "react";
import cn from "classnames";

import { H2, P } from "@components/Text";
import BuilderFormActions from "./BuilderStepActions";

import { TBuilderStepLayout } from "../types";
import { notImplemented } from "@helpers/notImplemented";

const BuilderStepLayout: FC<TBuilderStepLayout> = ({ pageClassPrefix }) => {
    const classPrefix = `builder-step`;

    const handleNext = () => {
        notImplemented();
    };

    const handleBack = () => {
        notImplemented();
    };

    return (
        <>
            <div className={cn(`${classPrefix}_layout`)}>
                {/*{title && <H2 className={`${classPrefix}_title`}>{title}</H2>}*/}
                {/*<div className={`${classPrefix}_content`}>*/}
                {/*    {JSON.stringify(fields)}*/}
                {/*</div>*/}
                {/*{description && (*/}
                {/*    <div className={`${classPrefix}_info`}>*/}
                {/*        <P>{description}</P>*/}
                {/*    </div>*/}
                {/*)}*/}
                {builderFieldsGenerator()}
            </div>
            <BuilderFormActions
                pageClassPrefix={classPrefix}
                onBackClick={handleBack}
                onNextClick={handleNext}
            />
        </>
    );
};

export default BuilderStepLayout;

const builderFieldsGenerator = () => {
    return <div>123123123123</div>;
};
