import { FC, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";
import { isArray } from "lodash";

import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";
import SingleProductInner from "./components/SingleProductInner";
import ProductsCarousel from "@components/globalComponents/ProductsCarousel";
import ErrorPage from "@components/pages/ErrorPage";
import Spin from "@components/globalComponents/Spin";

import { TStore } from "@globalTypes/storeTypes";
import { IRoot } from "@store/store";

const SingleProductPage: FC<TStore> = inject("store")(
    observer(({ store }) => {
        const { productsStore } = store as IRoot;
        const {
            getSingleProduct,
            singleProduct,
            singleProductFetching,
            getAdditionalProductList,
            additionalProductList,
            setSingleProduct,
            setAdditionalProductList,
        } = productsStore;
        const classPrefix = "single-product-page";
        const router = useRouter();

        const routerId = router.query.id;

        useEffect(() => {
            if (routerId) {
                const id = isArray(routerId) ? routerId[0] : routerId;
                getSingleProduct(id).finally(() => {
                    getAdditionalProductList(id);
                });
            }
            return () => {
                setSingleProduct(null);
                setAdditionalProductList(null);
            };
        }, [routerId]);

        if (singleProductFetching) {
            return (
                <Layout pageClassPrefix={classPrefix}>
                    <Container flexJustifyContent={"center"}>
                        <div
                            style={{
                                minHeight: "50vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Spin size="large" />
                        </div>
                    </Container>
                </Layout>
            );
        }

        if (!singleProduct) {
            return <ErrorPage />;
        }

        return (
            <Layout pageClassPrefix={classPrefix}>
                <Container flexDirection={"column"}>
                    <SingleProductInner
                        pageClassPrefix={classPrefix}
                        singleProduct={singleProduct}
                    />
                    {additionalProductList && (
                        <ProductsCarousel
                            title="Related Products"
                            list={additionalProductList}
                        />
                    )}
                    {additionalProductList && (
                        <ProductsCarousel
                            title="With this product buy"
                            list={additionalProductList}
                        />
                    )}
                </Container>
            </Layout>
        );
    }),
);

export default SingleProductPage;
