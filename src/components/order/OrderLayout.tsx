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
import { convertDoorDataToCreateDoorRequest } from "@helpers/orderHelper";
import { getStorage, setStorage } from "@services/storage.service";
import { BUILDER_UNAUTHORIZED_CART } from "@consts/storageNamesContsts";
import { TNullable } from "@globalTypes/commonTypes";

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
            const { authStore, orderStore, builderStore } = store as IRoot;
            const {
                doorsData,
                setPriceParams,
                priceParams,
                doorsDataFetching,
                createDoorRequestFetching,
                createDoorRequest,
                getDoorsData,
            } = orderStore;
            const { builderCartData, setElementsToBuilderCard } = builderStore;
            const { userDataFetching, isAuthorized } = authStore;

            useEffect(() => {
                if (doorsData?.length && !priceParams) {
                    setPriceParams({
                        items: doorsData.map((item) => ({
                            id: item.id,
                            quantity: 1,
                        })),
                    });
                }
            }, [doorsData, priceParams]);

            useEffect(() => {
                if (builderCartData?.elements.length) {
                    createDoorRequest(
                        convertDoorDataToCreateDoorRequest(
                            builderCartData?.elements[0],
                        ),
                    ).then(({ data }) => {
                        setElementsToBuilderCard(undefined, "clear");
                        if (!isAuthorized) {
                            const unauthorizedCart =
                                (getStorage(
                                    BUILDER_UNAUTHORIZED_CART,
                                ) as TNullable<number[]>) || [];

                            setStorage(BUILDER_UNAUTHORIZED_CART, [
                                ...unauthorizedCart,
                                data.id,
                            ]);
                            getDoorsData().then(({ data }) => {
                                setPriceParams({
                                    ...priceParams,
                                    items: data.map((item) => ({
                                        id: item.id,
                                        quantity: 1,
                                    })),
                                });
                            });
                        } else {
                            getDoorsData().then(({ data }) => {
                                setPriceParams({
                                    ...priceParams,
                                    items: data.map((item) => ({
                                        id: item.id,
                                        quantity: 1,
                                    })),
                                });
                            });
                        }
                    });
                }
            }, [builderCartData]);

            const content = (
                <Container flexDirection="column">
                    {doorsData?.length ? (
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
                    {userDataFetching ||
                    doorsDataFetching ||
                    createDoorRequestFetching ? (
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
