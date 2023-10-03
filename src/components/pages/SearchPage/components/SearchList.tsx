import { FC, useEffect, useMemo } from "react";
import { inject, observer } from "mobx-react";
import { Empty } from "antd";
import { isString } from "lodash";
import { useRouter } from "next/router";

import ProductSearchCard from "@components/cards/ProductSearchCard";
import ProductSearchCardSkeleton from "@components/skeletons/ProductSearchCardSkeleton";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { IRoot } from "@store/store";
import { SEARCH_QUERY } from "@consts/queryNamesConsts";

const SearchList: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { productsStore } = store as IRoot;
        const {
            productList,
            productListFetching,
            getProductListRequest,
            setSearchParams,
            searchParams,
        } = productsStore;
        const classPrefix = `${pageClassPrefix}_list`;
        const router = useRouter();

        useEffect(() => {
            const searchText = router.query[SEARCH_QUERY];

            if (isString(searchText) && searchText) {
                setSearchParams({ ...searchParams, text: searchText });
                getProductListRequest({
                    text: searchText,
                });
            }
        }, [router.query]);

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

            if (!productList?.length) {
                return <Empty />;
            }

            return (
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
                            deliveryStatus={item.deliveryStatus}
                            priceCurrency={item.priceCurrency}
                        />
                    ))}
                </div>
            );
        }, [productList, productListFetching]);

        return <div className={`${classPrefix}__wrapper`}>{listContent}</div>;
    }),
);

export default SearchList;
