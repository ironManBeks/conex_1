import { FC } from "react";

import { H2 } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";

const CartPayment: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_checkout`;
    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                123123123 123123123 123123123 123123123 123123123 123123123
                123123123 123123123 123123123
            </div>
        </div>
    );
};

export default CartPayment;
