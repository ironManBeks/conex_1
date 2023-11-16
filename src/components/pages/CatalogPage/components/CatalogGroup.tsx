import { FC } from "react";
import cn from "classnames";

import { H3 } from "@components/Text";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TCatalogGroupProps } from "@components/pages/CatalogPage/types";
import Link from "next/link";
import { toSingleProductPageId } from "@consts/pathsConsts";
import CollapsibleBlockWithTitle from "@components/globalComponents/CollapsibleBlockWithTitle";

const CatalogGroup: FC<TCatalogGroupProps> = ({
    pageClassPrefix,
    wrapperClassName,
    image,
    title,
    links,
}) => {
    const classPrefix = `${pageClassPrefix}_group`;
    const shownLinks = links.slice(0, 3);
    const hiddenLinks = links.slice(3);

    if (!links.length) return null;

    return (
        <div className={cn(`${classPrefix}__wrapper`, wrapperClassName)}>
            {image.src && <ImgWrapper src={image.src} alt={image.alt} />}
            {title && <H3>{title}</H3>}
            <ul className={`${classPrefix}__list`}>
                {shownLinks.map((item, index) => (
                    <li key={index}>
                        <Link
                            href={toSingleProductPageId("single-product-page")}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            {hiddenLinks.length ? (
                <div className={`${classPrefix}__list_container`}>
                    <CollapsibleBlockWithTitle
                        expandTitle={`${hiddenLinks.length} more`}
                        closeTitle="Hide"
                        defaultOpen={false}
                        wrapperClassName={"_list"}
                        titlePosition={"bottom"}
                    >
                        <ul className={`${classPrefix}__list`}>
                            {hiddenLinks.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={toSingleProductPageId(
                                            "single-product-page",
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CollapsibleBlockWithTitle>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default CatalogGroup;
