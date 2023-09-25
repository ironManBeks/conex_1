import { FC } from "react";
import { Empty } from "antd";

import ButtonLink from "@components/buttons/ButtonLink";
import { P } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor } from "@components/buttons/types";
import { PATH_BUILDER_PAGE } from "@consts/pathsConsts";

const CartEmpty: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_empty`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__content`}>
                <Empty description="Your cart is empty" />
                <P>Go to the link to add a door</P>
            </div>
            <div className={`${classPrefix}__actions`}>
                <ButtonLink
                    color={EButtonColor.primary}
                    href={PATH_BUILDER_PAGE}
                >
                    Door builder
                </ButtonLink>
            </div>
        </div>
    );
};

export default CartEmpty;
