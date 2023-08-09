import React, { FC } from "react";

import { H4, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { THowItWorksItem } from "@components/pages/HomePage/types";

const HowItWorksItem: FC<THowItWorksItem> = ({
    title,
    description,
    src,
    classPrefix,
    imgWidth,
    imgHeight,
}) => {
    return (
        <div className={`${classPrefix}_item__wrapper`}>
            <div className={`${classPrefix}_item__content`}>
                <H4>{title}</H4>
                {description && <P>{description}</P>}
            </div>
            {src && (
                <ImgWrapper
                    src={src}
                    alt={title}
                    width={imgWidth ?? 256}
                    height={imgHeight ?? 164}
                />
            )}
        </div>
    );
};

export default HowItWorksItem;
