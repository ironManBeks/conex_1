import { FC, useRef, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Carousel from "@components/globalComponents/Carousel";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TSingleProductCarouselProps } from "../types";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";
import {
    IconArrowSingle,
    IconCross,
    IconZoomIn,
    IconZoomOut,
} from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";
import { COLOR_WHITE } from "@assets/theme/colorTheme";

const SingleProductCarousel: FC<TSingleProductCarouselProps> = ({
    pageClassPrefix,
    images,
}) => {
    const classPrefix = `${pageClassPrefix}_carousel`;
    const thumbnailsRef = useRef(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [activeSlide, setActiveSlide] = useState<number>(0);

    const iconProps = {
        color: COLOR_WHITE,
        width: 36,
        height: 36,
    };

    return (
        <div className={`${classPrefix}__wrapper`}>
            <Carousel
                onSwiper={setThumbsSwiper}
                breakpoints={{
                    [mediaBreakpoints.xsMediaEnd]: {
                        slidesPerView: 4,
                    },
                    [mediaBreakpoints.smMediaEnd]: {
                        slidesPerView: 6,
                    },
                    [mediaBreakpoints.lgMediaEnd]: {
                        slidesPerView: 8,
                    },
                }}
                spaceBetween={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                wrapperClassName={`${classPrefix}__thumb`}
                navigation={true}
                initialSlide={2}
                onSlideChange={(state) => setActiveSlide(state.activeIndex)}
                direction={"vertical"}
                slidesPerView={"auto"}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ImgWrapper src={item.src} alt={"Product image"} />
                    </SwiperSlide>
                ))}
            </Carousel>
            <Carousel
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                wrapperClassName={`${classPrefix}__main`}
            >
                {images.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <ImgWrapper src={item.src} alt={"Product image"} />
                    </SwiperSlide>
                ))}
            </Carousel>
            <Lightbox
                plugins={[Thumbnails, Zoom]}
                thumbnails={{ ref: thumbnailsRef }}
                open={isLightboxOpen}
                close={() => setIsLightboxOpen(false)}
                index={activeSlide}
                render={{
                    iconPrev: () => (
                        <IconArrowSingle
                            direction={EArrowDirection.left}
                            {...iconProps}
                        />
                    ),
                    iconNext: () => (
                        <IconArrowSingle
                            direction={EArrowDirection.right}
                            {...iconProps}
                        />
                    ),
                    iconClose: () => <IconCross {...iconProps} />,
                    iconZoomIn: () => (
                        <IconZoomIn {...iconProps} width={24} height={24} />
                    ),
                    iconZoomOut: () => (
                        <IconZoomOut {...iconProps} width={24} height={24} />
                    ),
                }}
                slides={images.map((item) => ({
                    src: item.src,
                }))}
                zoom={{
                    maxZoomPixelRatio: 3,
                }}
                className={"lightbox_wrapper"}
            />
        </div>
    );
};

export default SingleProductCarousel;
