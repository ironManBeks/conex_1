import { FC, ReactNode } from "react";
import { inject, observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import { H2 } from "@components/Text";
import OrderEmpty from "./OrderEmpty";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { ORDER_PAGE_CLASSPREFIX } from "@components/order/consts";
import Spin from "@components/globalComponents/Spin";

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
            const { builderStore, authStore } = store as IRoot;
            const { builderCartData } = builderStore;
            const { userDataFetching } = authStore;

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
                    {userDataFetching ? (
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
