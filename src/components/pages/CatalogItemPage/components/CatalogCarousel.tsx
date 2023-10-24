import { FC, useEffect, useRef, useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import Carousel from "@components/globalComponents/Carousel";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

import { TCatalogCarousel } from "../types";
import { mediaBreakpoints } from "@assets/theme/mediaBreakpointsTheme";
import {
    IconArrowSingle,
    IconCross,
    IconZoomIn,
    IconZoomOut,
} from "@components/Icons";
import { EArrowDirection } from "@components/Icons/types";
import { COLOR_WHITE } from "@assets/theme/colorTheme";

const CatalogCarousel: FC<TCatalogCarousel> = ({ pageClassPrefix, images }) => {
    const classPrefix = `${pageClassPrefix}_carousel`;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const thumbnailsRef = useRef(null);

    useEffect(() => {
        console.log("thumbsSwiper", thumbsSwiper);
    }, [thumbsSwiper]);

    return (
        <div className={`${classPrefix}__wrapper`}>
            <Carousel
                onSwiper={setThumbsSwiper}
                breakpoints={{
                    [mediaBreakpoints.xsMediaEnd]: {
                        slidesPerView: 4,
                    },
                    [mediaBreakpoints.smMediaEnd]: {
                        slidesPerView: 5,
                    },
                    [mediaBreakpoints.lgMediaEnd]: {
                        slidesPerView: 6,
                    },
                }}
                spaceBetween={12}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`${classPrefix}__thumb`}
                navigation={true}
                direction={"vertical"}
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <ImgWrapper src={item} alt={"Product image"} />
                    </SwiperSlide>
                ))}
            </Carousel>
            <Carousel
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                className={`${classPrefix}__main`}
            >
                {images.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <ImgWrapper src={item} alt={"Product image"} />
                    </SwiperSlide>
                ))}
            </Carousel>
            <Lightbox
                plugins={[Thumbnails, Zoom]}
                thumbnails={{ ref: thumbnailsRef }}
                open={isLightboxOpen}
                index={3}
                close={() => setIsLightboxOpen(false)}
                render={{
                    iconPrev: () => (
                        <IconArrowSingle
                            direction={EArrowDirection.left}
                            color={COLOR_WHITE}
                            width={36}
                            height={36}
                        />
                    ),
                    iconNext: () => (
                        <IconArrowSingle
                            direction={EArrowDirection.right}
                            color={COLOR_WHITE}
                            width={36}
                            height={36}
                        />
                    ),
                    iconClose: () => (
                        <IconCross color={COLOR_WHITE} width={36} height={36} />
                    ),
                    iconZoomIn: () => (
                        <IconZoomIn
                            color={COLOR_WHITE}
                            width={24}
                            height={24}
                        />
                    ),
                    iconZoomOut: () => (
                        <IconZoomOut
                            color={COLOR_WHITE}
                            width={24}
                            height={24}
                        />
                    ),
                }}
                slides={images.map((item) => ({
                    src: item,
                }))}
                zoom={{
                    maxZoomPixelRatio: 2,
                }}
                className={"lightbox_wrapper"}
            />
        </div>
    );
};

export default CatalogCarousel;
