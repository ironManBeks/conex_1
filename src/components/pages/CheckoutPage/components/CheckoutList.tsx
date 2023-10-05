import { FC, useEffect, useState } from "react";
import { Empty } from "antd";

import { H2 } from "@components/Text";
import ModalConfirm from "@components/modals/components/ModalConfirm";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TProductCartData } from "@store/products/types";
import { EButtonColor } from "@components/buttons/types";
import { notImplemented } from "@helpers/notImplemented";
import { ProductCartListDataMockup } from "../../../../mockups/ProductCartListDataMockup";

const CheckoutList: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_list`;
    const [checkoutList, seCheckoutList] = useState<TProductCartData[]>();

    useEffect(() => {
        seCheckoutList(ProductCartListDataMockup);
    }, []);

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2>Cart</H2>
            <div className={`${classPrefix}__content`}>
                {checkoutList?.length ? (
                    checkoutList.map((_, index) => (
                        <div>Product cart {index}</div>
                    ))
                ) : (
                    <Empty />
                )}
            </div>
            <ModalConfirm
                title="Do you want to remove the door from the cart?"
                confirmColor={EButtonColor.danger}
                onConfirm={() => notImplemented()}
            />
        </div>
    );
};

export default CheckoutList;
