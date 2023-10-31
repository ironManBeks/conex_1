import { FC, useRef } from "react";
import { inject, observer } from "mobx-react";
import cn from "classnames";

import Container from "@components/globalComponents/Container";
import SingleProductPrice from "./SingleProductPrice";
import ImgWrapper from "@components/globalComponents/ImgWrapper";
import { H3 } from "@components/Text";

import { TSingleProductHeaderProps } from "@components/pages/SingleProductPage/types";
import { IRoot } from "@store/store";
import { EButtonSize } from "@components/buttons/types";
import { useElementSize } from "@hooks/useElementSize";
import { isNil } from "lodash";

const SingleProductHeader: FC<TSingleProductHeaderProps> = inject("store")(
    observer(
        ({
            store,
            pageClassPrefix,
            title,
            images,
            price,
            priceOld,
            priceDiscount,
            isAvailable,
        }) => {
            const { commonStore } = store as IRoot;
            const { headerVisible } = commonStore;
            const classPrefix = `${pageClassPrefix}_sub-header`;
            const subHeaderRef = useRef<HTMLDivElement>(null);
            const { size } = useElementSize({ ref: subHeaderRef });

            return (
                <div
                    ref={subHeaderRef}
                    className={cn(`${classPrefix}__wrapper`, {
                        _visible: !headerVisible,
                    })}
                    style={{
                        top:
                            headerVisible && !isNil(size.height)
                                ? -size.height
                                : 0,
                    }}
                >
                    <Container
                        flexJustifyContent="space-between"
                        flexAlignItems="center"
                    >
                        <div className={`${classPrefix}__main-info`}>
                            <ImgWrapper
                                src={images[0].src}
                                alt={"Image: Product"}
                            />
                            <H3>{title}</H3>
                        </div>
                        <div className={`${classPrefix}__actions`}>
                            <SingleProductPrice
                                pageClassPrefix={pageClassPrefix}
                                price={price}
                                priceOld={priceOld}
                                priceDiscount={priceDiscount}
                                isAvailable={isAvailable}
                                wrapperClassName={`${classPrefix}__price`}
                                mainButtonSize={EButtonSize.lg}
                            />
                        </div>
                    </Container>
                </div>
            );
        },
    ),
);

export default SingleProductHeader;
