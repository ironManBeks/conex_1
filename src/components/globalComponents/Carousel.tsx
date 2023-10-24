import { FC, PropsWithChildren, useCallback, useRef } from "react";
import cn from "classnames";
import { Swiper } from "swiper/react";

import { TCarousel } from "./types";
import { SwiperRef } from "swiper/swiper-react";
import { IconArrowSingle } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";

const Carousel: FC<PropsWithChildren<TCarousel>> = ({
    children,
    className,
    navigation,
    direction,
    ...rest
}) => {
    const classPrefix = "carousel";
    const sliderRef = useRef<SwiperRef>(null);

    return (
        <Swiper
            ref={sliderRef}
            slidesPerView={1}
            spaceBetween={10}
            pagination={{
                clickable: true,
            }}
            navigation={
                navigation
                    ? {
                          nextEl: `.${classPrefix}_arrow._next`,
                          prevEl: `.${classPrefix}_arrow._prev`,
                      }
                    : false
            }
            direction={direction}
            {...rest}
            className={cn(`${classPrefix}_wrapper`, className)}
        >
            {children}
            {navigation && (
                <>
                    <button className={cn(`${classPrefix}_arrow _prev`)}>
                        <IconArrowSingle
                            direction={
                                direction === "vertical"
                                    ? EArrowDirection.top
                                    : EArrowDirection.left
                            }
                        />
                    </button>
                    <button className={cn(`${classPrefix}_arrow _next`)}>
                        <IconArrowSingle
                            direction={
                                direction === "vertical"
                                    ? EArrowDirection.bottom
                                    : EArrowDirection.right
                            }
                        />
                    </button>
                </>
            )}
        </Swiper>
    );
};

export default Carousel;
