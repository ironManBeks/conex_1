import { FC } from "react";

import ButtonLink from "@components/buttons/ButtonLink";
import { H3, P } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";

const CartEmpty: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_empty`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__content`}>
                <H3>Shopping cart's empty</H3>
                <P>Go to the catalog to add your desired products</P>
            </div>
            <div className={`${classPrefix}__actions`}>
                <ButtonLink
                    color={EButtonColor.secondary}
                    href={PATH_BUILDER_PAGE}
                >
                    Go to catalog
                </ButtonLink>
            </div>
        </div>
    );
};

export default CartEmpty;
