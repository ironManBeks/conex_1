import { FC } from "react";
import cn from "classnames";

import { H3, P } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TCatalogGroupProps } from "@components/pages/CatalogPage/types";
import Link from "next/link";
import { toSingleProductPageId } from "@consts/pathsConsts";

const CatalogGroup: FC<TCatalogGroupProps> = ({
    pageClassPrefix,
    wrapperClassName,
    image,
    title,
    links,
}) => {
    const classPrefix = `${pageClassPrefix}_group`;

    if (!links.length) return null;

    return (
        <div className={cn(`${classPrefix}__wrapper`, wrapperClassName)}>
            {image.src && <ImgWrapper src={image.src} alt={image.alt} />}
            {title && <H3>{title}</H3>}
            <div className={`${classPrefix}__list`}>
                {links.map((item, index) => (
                    <P key={index}>
                        {/*<a href={item.href} key={key}>*/}
                        {/*    {item.title}*/}
                        {/*</a>*/}
                        <Link
                            href={toSingleProductPageId("single-product-page")}
                        >
                            {item.title}
                        </Link>
                    </P>
                ))}
            </div>
        </div>
    );
};

export default CatalogGroup;
