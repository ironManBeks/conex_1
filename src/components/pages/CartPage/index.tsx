import { FC } from "react";
import { inject, observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import CartList from "./components/CartList";
import { H2 } from "@components/Text";
import CartEmpty from "@components/pages/CartPage/components/CartEmpty";
import CartCheckout from "./components/CartCheckout";

import { TStore } from "@globalTypes/storeTypes";
import { IRoot } from "@store/store";

const CartPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const classPrefix = "cart-page";
        const { builderStore } = store as IRoot;
        const { builderCartData } = builderStore;

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container flexDirection="column">
                    {builderCartData?.elements.length ? (
                        <>
                            <H2>Cart</H2>
                            <div className={`${classPrefix}_content`}>
                                <CartList pageClassPrefix={classPrefix} />
                                <CartCheckout pageClassPrefix={classPrefix} />
                            </div>
                        </>
                    ) : (
                        <CartEmpty pageClassPrefix={classPrefix} />
                    )}
                </Container>
            </Layout>
        );
    }),
);

export default CartPage;
