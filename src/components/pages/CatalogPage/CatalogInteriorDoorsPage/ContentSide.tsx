import ProductPagination from "@components/ProductPagination";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import ProductCartCard from "@components/cards/ProductCartCard";
import ProductGridCard from "@components/cards/ProductGridCard";
import { ITEMS_DISPLAY } from "@consts/queryNamesConsts";
import { TStore } from "@globalTypes/storeTypes";
import { inject, observer } from "mobx-react";
import { useRouter } from "next/router";
import { FC } from "react";

import Banner from "./Banner";
import ContentSideHeader from "./ContentSideHeader";
import { productGridData, productRowData } from "./FiltersMockUp";

interface ContentSideProps extends TStore {
    pageClassPrefix: string;
}

const ContentSide: FC<ContentSideProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        const router = useRouter();
        const isDisplayGrid = router.query[ITEMS_DISPLAY] === "grid";

        const productsArray = (amount: number) =>
            Array.from({ length: amount })
                .fill(null)
                .map((_, index) => (
                    <>
                        {isDisplayGrid ? (
                            <ProductGridCard key={index} {...productGridData} />
                        ) : (
                            <ProductCartCard key={index} {...productRowData} />
                        )}
                    </>
                ));

        return (
            <div>
                <ContentSideHeader pageClassPrefix={pageClassPrefix} />
                <div className={`${pageClassPrefix}__card-container`}>
                    {productsArray(3)}
                </div>
                <div className={`${pageClassPrefix}__banner-container`}>
                    <Banner pageClassPrefix={pageClassPrefix} />
                </div>
                <div className={`${pageClassPrefix}__card-container`}>
                    {productsArray(12)}
                </div>
                <div className={`${pageClassPrefix}__pagination-container`}>
                    <ProductPagination />
                    <div>
                        <ButtonPrimary
                            size={EButtonSize.md}
                            color={EButtonColor.primary}
                            type="submit"
                        >
                            Upload more
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        );
    }),
);

export default ContentSide;
