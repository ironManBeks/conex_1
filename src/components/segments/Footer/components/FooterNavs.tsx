import { FC } from "react";
import Link from "next/link";

import { H3, P } from "@components/Text";

import {
    PATH_BUILDER_PAGE,
    PATH_CART_PAGE,
    PATH_CATALOG_PAGE,
    PATH_CONTACT_US_PAGE,
    PATH_HOME_PAGE,
    PATH_SEARCH_PAGE,
} from "@consts/pathsConsts";

const FooterNavs: FC<{ wrapperClassPrefix: string }> = ({
    wrapperClassPrefix,
}) => {
    const classPrefix = `${wrapperClassPrefix}_navs`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H3 className={`${classPrefix}__title`}>Navigate</H3>
            <div className={`${classPrefix}__list`}>
                <P>
                    <Link href={PATH_HOME_PAGE}>Home</Link>
                </P>
                <P>
                    <Link href={PATH_CONTACT_US_PAGE}>Contact us</Link>
                </P>
                <P>
                    <Link href={PATH_BUILDER_PAGE}>Builder</Link>
                </P>
                <P>
                    <Link href={PATH_CATALOG_PAGE}>Catalog</Link>
                </P>
                <P>
                    <Link href={PATH_CART_PAGE}>Cart</Link>
                </P>
                <P>
                    <Link href={PATH_SEARCH_PAGE}>Search</Link>
                </P>
            </div>
        </div>
    );
};

export default FooterNavs;
