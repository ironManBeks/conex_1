import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";

import ProductSearchCard from "@components/cards/ProductSearchCard";
import { H2 } from "@components/Text";
import ProductSearchCardSkeleton from "@components/skeletons/ProductSearchCardSkeleton";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor } from "@components/buttons/types";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import ModalCustomQuote from "@components/modals/components/ModalCustomQuote";
import { IRoot } from "@store/store";

const SearchList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { productsStore, commonStore } = store as IRoot;
        const { productList, productListFetching, getProductListRequest } =
            productsStore;
        const { setModalCustomQuoteVisible } = commonStore;
        const classPrefix = `${pageClassPrefix}_list`;

        useEffect(() => {
            getProductListRequest("");
        }, []);

        const listContent = useMemo(() => {
            if (productListFetching) {
                return (
                    <div className={`${classPrefix}__inner-wrapper`}>
                        <ProductSearchCardSkeleton />
                        <ProductSearchCardSkeleton />
                        <ProductSearchCardSkeleton />
                        <ProductSearchCardSkeleton />
                    </div>
                );
            }

            if (!productList.length) {
                return <Empty />;
            }

            return (
                <>
                    <H2 className={`${classPrefix}_title`}>
                        {productsStore.productList.length} doors found
                    </H2>
                    <div className={`${classPrefix}__inner-wrapper`}>
                        {productList.map((item) => (
                            <ProductSearchCard
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
                            />
                        ))}
                    </div>
                </>
            );
        }, [productList, productListFetching, classPrefix]);

        return (
            <>
                <div className={`${classPrefix}__wrapper`}>
                    {listContent}
                    <div className={`${pageClassPrefix}_request__wrapper`}>
                        <H2>Didn’t find what you were looking for?</H2>
                        <ButtonPrimary
                            color={EButtonColor.primary}
                            onClick={() => setModalCustomQuoteVisible(true)}
                        >
                            Request quote
                        </ButtonPrimary>
                    </div>
                </div>
                <ModalCustomQuote />
            </>
        );
    }),
);

export default SearchList;
