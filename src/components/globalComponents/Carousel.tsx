import { FC, PropsWithChildren, Ref, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

import { TCarousel } from "./types";
import { IconArrowSingle } from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";

const useSwiperRef = <T extends HTMLElement>(): [T | null, Ref<T>] => {
    const [wrapper, setWrapper] = useState<T | null>(null);
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            setWrapper(ref.current);
        }
    }, []);

    return [wrapper, ref];
};

const Carousel: FC<PropsWithChildren<TCarousel>> = ({
    children,
    className,
    wrapperClassName,
    navigation,
    direction,
    ...rest
}) => {
    const classPrefix = "carousel";
    const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();
    const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();

    return (
        <div
            className={cn(`${classPrefix}_main-wrapper`, wrapperClassName, {
                _vertical: direction === "vertical",
            })}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl,
                    nextEl,
                }}
                direction={direction}
                {...rest}
                className={cn(`${classPrefix}_wrapper`, className)}
            >
                {children}
            </Swiper>
            {navigation && (
                <>
                    <button
                        className={cn(`${classPrefix}_arrow _prev`)}
                        ref={prevElRef}
                    >
                        <IconArrowSingle
                            direction={
                                direction === "vertical"
                                    ? EArrowDirection.top
                                    : EArrowDirection.left
                            }
                        />
                    </button>
                    <button
                        className={cn(`${classPrefix}_arrow _next`)}
                        ref={nextElRef}
                    >
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
        </div>
    );
};

export default Carousel;
