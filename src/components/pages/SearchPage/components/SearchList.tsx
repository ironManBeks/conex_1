import { FC, useEffect, useMemo } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@store";
import { Spin, Empty } from "antd";

import ProductSearchCard from "@components/cards/ProductSearchCard";
import ButtonLink from "@components/buttons/ButtonLink";
import { H2 } from "@components/Text";

import { PATH_CUSTOM_QUOTE_PAGE } from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import ProductSearchCardSkeleton from "@components/skeletons/ProductSearchCardSkeleton";

const SearchList: FC<TSectionTypes> = observer(({ pageClassPrefix }) => {
    const { productsStore } = useRootStore();
    const { productList, productListFetching, getProductListRequest } =
        productsStore;
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
        <div className={`${classPrefix}__wrapper`}>
            {listContent}
            <div className={`${pageClassPrefix}_request__wrapper`}>
                <H2>Didn’t find what you were looking for?</H2>
                <ButtonLink
                    color={EButtonColor.primary}
                    href={PATH_CUSTOM_QUOTE_PAGE}
                >
                    Request quote
                </ButtonLink>
            </div>
        </div>
    );
});

export default SearchList;
