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
import {
    BUILDER_UNAUTHORIZED_CART_ID,
    BUILDER_UNAUTHORIZED_DOORS_IDS,
} from "@consts/storageNamesContsts";
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
                doorsDataFetching,
                createDoorRequestFetching,
                createDoorRequest,
                getDoorsData,
                createOrderCart,
                orderCart,
                getOrderCart,
            } = orderStore;
            const { builderCartData, setElementsToBuilderCard } = builderStore;
            const { userDataFetching, isAuthorized, userData, setUserData } =
                authStore;

            useEffect(() => {
                if (builderCartData?.elements.length) {
                    createDoorRequest(
                        convertDoorDataToCreateDoorRequest(
                            builderCartData?.elements[0],
                        ),
                    ).then(({ data }) => {
                        setElementsToBuilderCard(undefined, "clear");
                        if (!isAuthorized) {
                            // INFO(unauthorized user): add doorId to doors ids in storage
                            const unauthorizedCartId = getStorage(
                                BUILDER_UNAUTHORIZED_CART_ID,
                            ) as string | undefined;

                            const unauthorizedDoorsIds =
                                (getStorage(
                                    BUILDER_UNAUTHORIZED_DOORS_IDS,
                                ) as TNullable<number[]>) || [];

                            setStorage(BUILDER_UNAUTHORIZED_DOORS_IDS, [
                                ...unauthorizedDoorsIds,
                                data.id,
                            ]);

                            const idsAsParams = [
                                ...unauthorizedDoorsIds,
                                data.id,
                            ].join(",");

                            getDoorsData({
                                ids: idsAsParams,
                            }).then(({ data: doorsData }) => {
                                createOrderCart({
                                    items: doorsData.map(({ id }) => ({
                                        id,
                                        quantity: 1,
                                    })),
                                    // INFO(unauthorized user): if userId doesn't exist then send undefined it will create new cart in back end
                                    cartId: unauthorizedCartId
                                        ? Number(unauthorizedCartId)
                                        : undefined,
                                }).then(({ data }) => {
                                    // INFO(unauthorized user): after cart is created or updated, create cartId in storage (if it doesn't exist) then make request for cart with cartId
                                    if (!unauthorizedCartId)
                                        setStorage(
                                            BUILDER_UNAUTHORIZED_CART_ID,
                                            data.cartId,
                                        );

                                    getOrderCart(data.cartId);
                                });
                            });
                        } else {
                            getDoorsData().then(({ data: doorsData }) => {
                                createOrderCart({
                                    items: doorsData.map(({ id }) => ({
                                        id,
                                        quantity:
                                            orderCart?.items.find(
                                                (item) => item.id === id,
                                            )?.quantity || 1,
                                    })),
                                    cartId: userData?.cartId,
                                }).then(({ data }) => {
                                    if (userData) {
                                        setUserData({
                                            ...userData,
                                            cartId: data.cartId,
                                        });

                                        getOrderCart(data.cartId);
                                    }
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
