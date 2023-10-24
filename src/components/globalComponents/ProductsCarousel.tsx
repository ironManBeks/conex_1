import { FC, memo } from "react";
import { isDate } from "lodash";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import cn from "classnames";

import { H2 } from "@components/Text";
import Carousel from "@components/globalComponents/Carousel";

import { TProductsCarousel } from "@components/globalComponents/types";
import ProductCarouselCard from "@components/cards/ProductCarouselCard";
import { notImplemented } from "@helpers/notImplemented";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";

const ProductsCarousel: FC<TProductsCarousel> = ({
    title,
    wrapperClassName,
    list,
}) => {
    const classPrefix = "products-carousel";

    return (
        <div className={cn(`${classPrefix}_wrapper`, wrapperClassName)}>
            <H2>{title}</H2>
            <Carousel
                breakpoints={{
                    [mediaBreakpoints.xsMediaEnd]: {
                        slidesPerView: 2,
                    },
                    [mediaBreakpoints.smMediaEnd]: {
                        slidesPerView: 3,
                    },
                    [mediaBreakpoints.lgMediaEnd]: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                    },
                }}
                navigation={true}
                modules={[Navigation]}
            >
                {list.map((item) => (
                    <SwiperSlide key={item.id}>
                        <ProductCarouselCard
                            id={item.id}
                            src={item.img}
                            title={item.title}
                            price={item.price}
                            onButtonClick={() => notImplemented()}
                            deliveryStatus={
                                isDate(item.deliveryTime)
                                    ? item.deliveryTime
                                    : item.deliveryTime
                            }
                        />
                    </SwiperSlide>
                ))}
            </Carousel>
        </div>
    );
};

export default memo(ProductsCarousel);
