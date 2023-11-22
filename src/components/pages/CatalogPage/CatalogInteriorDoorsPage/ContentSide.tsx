import { inject, observer } from "mobx-react";
import ContentSideHeader from "./ContentSideHeader";
import { TStore } from "@globalTypes/storeTypes";
import { FC } from "react";
import Banner from "./Banner";
import ProductCartCard from "@components/cards/ProductCartCard";
import ProductGridCard from "@components/cards/ProductGridCard";
import ProductPagination from "@components/ProductPagination";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { EButtonColor, EButtonSize } from "@components/buttons/types";

interface ContentSideProps extends TStore {
    pageClassPrefix: string;
}

const ContentSide: FC<ContentSideProps> = inject("store")(
    observer(({ pageClassPrefix }) => {
        return (
            <div>
                <ContentSideHeader pageClassPrefix={pageClassPrefix} />
                <div className={`${pageClassPrefix}__card-container`}>
                    {Array.from({ length: 3 })
                        .fill(null)
                        .map((_, index) => (
                            <ProductGridCard
                                key={index}
                                imageSrc="/images/png/door-test.png"
                                price={345}
                                text="2 panel interior door with frame"
                            />
                        ))}
                </div>
                <div className={`${pageClassPrefix}__banner-container`}>
                    <Banner pageClassPrefix={pageClassPrefix} />
                </div>
                <div className={`${pageClassPrefix}__card-container`}>
                    {Array.from({ length: 12 })
                        .fill(null)
                        .map((_, index) => (
                            <ProductGridCard
                                key={index}
                                imageSrc="/images/png/door-test.png"
                                price={345}
                                text="2 panel interior door with frame"
                            />
                        ))}
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
                {/* <ProductCartCard
                    count={1}
                    id={1}
                    img=""
                    options={[{ title: "title", value: "value" }]}
                    price={234}
                    title="title"
                /> */}
            </div>
        );
    }),
);

export default ContentSide;
