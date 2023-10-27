import { FC } from "react";

import { H2, H3 } from "@components/Text";

import { TSingleProductCharacteristicsProps } from "@components/pages/SingleProductPage/types";
import { TSingleProductCharacteristics } from "@store/products/types";
import RowInfo from "@components/globalComponents/RowInfo";

const SingleProductCharacteristics: FC<TSingleProductCharacteristicsProps> = ({
    pageClassPrefix,
    characteristics,
}) => {
    const classPrefix = `${pageClassPrefix}_characteristics`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                <H2>Characteristics</H2>
                <div className={`${classPrefix}__list`}>
                    {characteristics.map((item, index) => (
                        <CharacteristicsRow
                            key={index}
                            title={item.title}
                            list={item.list}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SingleProductCharacteristics;

const CharacteristicsRow = ({ title, list }: TSingleProductCharacteristics) => {
    const classPrefix = "characteristics";
    return (
        <div className={`${classPrefix}_wrapper`}>
            <H3 className={`${classPrefix}_title`}>{title}</H3>
            <div className={`${classPrefix}_list`}>
                {list.map((item, index) => (
                    <RowInfo
                        key={index}
                        label={item.title}
                        value={item.value}
                    />
                ))}
            </div>
        </div>
    );
};
