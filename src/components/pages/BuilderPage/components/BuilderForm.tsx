import { FC, useState } from "react";

import { H2, P } from "@components/Text";
import BuilderFormCard from "./BuilderFormCard";

import { TBuilderForm } from "../types";

const BuilderForm: FC<TBuilderForm> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2 className={`${classPrefix}__title`}>Choose Door Type</H2>
            <div className={`${classPrefix}__content`}>
                {builderMockupData.map((item, index) => (
                    <BuilderFormCard
                        key={index}
                        wrapperClassPrefix={classPrefix}
                        value={item.value}
                        onClick={(value) => setSelectedValue(value)}
                        title={item.title}
                        subInfo={item.subInfo}
                        subTitle={item.subTitle}
                        src={item.src}
                        isActive={selectedValue === item.value}
                    />
                ))}
            </div>
            <div className={`${classPrefix}__info`}>
                <P>
                    leo et aliquam blandit. Pellentesque aliquet eget orci ut
                    iaculis. Praesent purus erat, varius et libero sed, aliquet
                    malesuada sapien. Etiam tempor p
                </P>
            </div>
        </div>
    );
};

export default BuilderForm;

const builderMockupData = [
    {
        value: "1",
        title: "Metal Door",
        subTitle: "Interior and Exterior Use",
        subInfo: "$345.00",
        src: "/images/png/door-test.png",
    },
    {
        value: "2",
        title: "Wood Door",
        subTitle: "Interior Use Only",
        subInfo: "$345.00",
        src: "/images/png/door-test.png",
    },
    {
        value: "3",
        title: "Metal Building Door",
        subTitle: "Preengeniered steel",
        subInfo: "$345.00",
        src: "/images/png/door-test.png",
    },
    {
        value: "4",
        title: "Metal Frame Only",
        subTitle: "Frame only No door",
        subInfo: "$3456.00",
        src: "/images/png/door-test.png",
    },
];
