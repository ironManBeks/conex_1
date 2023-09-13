import { FC, useEffect, useState } from "react";
import { Empty } from "antd";

import { H2 } from "@components/Text";
import ProductCartCard from "@components/cards/ProductCartCard";
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
                    checkoutList.map((item) => (
                        <ProductCartCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            material={item.material}
                            size={item.size}
                            color={item.color}
                            description={item.description}
                            priceOld={item.priceOld}
                            priceNew={item.priceNew}
                            src={item.src}
                            quantity={item.quantity}
                        />
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
