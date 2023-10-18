import { FC, ReactNode, useEffect } from "react";
import { inject, observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import { H2 } from "@components/Text";
import Spin from "@components/globalComponents/Spin";
import OrderEmpty from "./OrderEmpty";
import { ORDER_PAGE_CLASSPREFIX } from "@components/order/consts";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { ProductPriceParamsMockup } from "../../mockups/ProductPriceMockup";

const OrderLayout: FC<
    {
        leftSideContent: ReactNode;
        rightSideContent: ReactNode;
        title: ReactNode;
    } & TSectionTypes
> = inject("store")(
    observer(
        ({
            store,
            title,
            pageClassPrefix,
            leftSideContent,
            rightSideContent,
        }) => {
            const { builderStore, authStore, productsStore, orderStore } =
                store as IRoot;
            const { builderCartData } = builderStore;
            const { getDoorsData } = orderStore;
            const { getProductPriceRequest } = productsStore;
            const {
                userDataFetching,
                userCartDataFetching,
                isAuthorized,
                getUserCartData,
            } = authStore;

            useEffect(() => {
                if (isAuthorized) {
                    getDoorsData();
                    getUserCartData();
                }
            }, [isAuthorized]);

            useEffect(() => {
                getProductPriceRequest(ProductPriceParamsMockup);
            }, []);

            const content = (
                <Container flexDirection="column">
                    {builderCartData?.elements.length ? (
                        <>
                            <H2>{title}</H2>
                            <div
                                className={`${ORDER_PAGE_CLASSPREFIX}_content`}
                            >
                                <div
                                    className={`${ORDER_PAGE_CLASSPREFIX}_left-side`}
                                >
                                    {leftSideContent}
                                </div>
                                <div
                                    className={`${ORDER_PAGE_CLASSPREFIX}_right-side`}
                                >
                                    {rightSideContent}
                                </div>
                            </div>
                        </>
                    ) : (
                        <OrderEmpty />
                    )}
                </Container>
            );

            return (
                <Layout
                    pageClassPrefix={pageClassPrefix}
                    layoutClassName={ORDER_PAGE_CLASSPREFIX}
                >
                    {userDataFetching || userCartDataFetching ? (
                        <Container flexJustifyContent="center">
                            <Spin size="large" />
                        </Container>
                    ) : (
                        content
                    )}
                </Layout>
            );
        },
    ),
);

export default OrderLayout;
