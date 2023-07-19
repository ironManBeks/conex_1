import React, { FC } from "react";

import { H4, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { THowItWorksItem } from "@components/pages/HomePage/types";

const HowItWorksItem: FC<THowItWorksItem> = ({
    title,
    secondTitle,
    description,
    src,
    classPrefix,
}) => {
    return (
        <div className={`${classPrefix}_item__wrapper`}>
            <H4>{title}</H4>
            {description && <P>{description}</P>}
            {secondTitle && <H4>{secondTitle}</H4>}
            {src && (
                <ImgWrapper
                    src={src}
                    alt={secondTitle ?? title}
                    width="256"
                    height="164"
                />
            )}
        </div>
    );
};

export default HowItWorksItem;
