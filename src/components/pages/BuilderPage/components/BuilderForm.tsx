import { CSSProperties, FC, useState } from "react";
import { TBuilderForm } from "../types";
import { H2, P } from "@components/Text";
import BuilderFormCard from "@components/pages/BuilderPage/components/BuilderFormCard";

const BuilderForm: FC<TBuilderForm> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_form`;
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    const length = 3;

    const styles: CSSProperties = {
        width: length >= 4 ? "25%" : "33%",
    };

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2 className={`${classPrefix}__title`}>Choose Door Type</H2>
            <div className={`${classPrefix}__content`}>
                {builderMockupData.map((item, index) => (
                    <BuilderFormCard
                        key={index}
                        wrapperClassPrefix={classPrefix}
                        wrapperStyles={styles}
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
        title: "qwe",
        subTitle: "qwe",
        subInfo: "qwe",
        src: "/images/png/door-test.png",
    },
    {
        value: "2",
        title: "qwe qwe qwe",
        subTitle: "qwe qwe qwe",
        subInfo: "qwe qwe qwe",
        src: "/images/png/door-test.png",
    },
    {
        value: "3",
        title: "qwe qwe qwe qwe qwe qwe qwe qwe qwe",
        subTitle: "qwe qwe qwe qwe qwe qwe qwe qwe qwe",
        subInfo: "qwe qwe qwe qwe qwe qwe qwe qwe qwe",
    },
    {
        value: "4",
        title: "qweqweqweqweqweqweqweqweqweqweqwe",
        subTitle: "qweqweqweqweqweqweqweqweqweqweqwe",
        subInfo: "qweqweqweqweqweqweqweqweqweqweqwe",
    },
    {
        value: "5",
        title: "qweqweqweqweqweqweqweqweqweqweqwe",
        subTitle: "qweqweqweqweqweqweqweqweqweqweqwe",
        subInfo: "qweqweqweqweqweqweqweqweqweqweqwe",
    },
];
