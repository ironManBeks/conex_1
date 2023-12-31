import { FC, memo } from "react";

import { H3, P } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";

import { EButtonColor } from "@components/buttons/types";
import { PATH_CATALOG_PAGE } from "@consts/pathsConsts";
import { ORDER_PAGE_CLASSPREFIX } from "./consts";

const OrderEmpty: FC = () => {
    const classPrefix = `${ORDER_PAGE_CLASSPREFIX}_empty`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__content`}>
                <H3>Shopping cart's empty</H3>
                <P>Go to the catalog to add your desired products</P>
            </div>
            <div className={`${classPrefix}__actions`}>
                <ButtonLink
                    color={EButtonColor.secondary}
                    href={PATH_CATALOG_PAGE}
                >
                    Go to catalog
                </ButtonLink>
            </div>
        </div>
    );
};

export default memo(OrderEmpty);
