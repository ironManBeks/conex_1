import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import CheckoutList from "./components/CheckoutList";
import CheckoutSettings from "./components/CheckoutSettings";

const CheckoutPage: FC = () => {
    const classPrefix = "checkout-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <CheckoutList pageClassPrefix={classPrefix} />
                <CheckoutSettings pageClassPrefix={classPrefix} />
            </Container>
        </Layout>
    );
};

export default CheckoutPage;
