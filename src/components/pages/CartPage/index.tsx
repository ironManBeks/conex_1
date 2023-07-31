import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import CartList from "./components/CartList";
import CartCheckout from "./components/CartCheckout";

const CartPage: FC = () => {
    const classPrefix = "cart-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <CartList pageClassPrefix={classPrefix} />
                <CartCheckout pageClassPrefix={classPrefix} />
            </Container>
        </Layout>
    );
};

export default CartPage;
