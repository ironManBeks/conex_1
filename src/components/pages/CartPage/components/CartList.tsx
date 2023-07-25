import { FC, useEffect, useState } from "react";
import { Empty } from "antd";

import { H2 } from "@components/Text";
import ProductCartCard from "@components/cards/ProductCartCard";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { TProductCartData } from "@store/stores/products/types";
import { ProductCartListDataMockup } from "../../../../mockups/ProductCartListDataMockup";

const CartOrders: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_orders`;
    const [cartList, setCartList] = useState<TProductCartData[]>();

    useEffect(() => {
        setCartList(ProductCartListDataMockup);
    }, []);

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2>Orders</H2>
            <div className={`${classPrefix}__content`}>
                {cartList?.length ? (
                    <div className={`${classPrefix}__list`}>
                        {cartList.map((item) => (
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
                        ))}
                    </div>
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    );
};

export default CartOrders;
