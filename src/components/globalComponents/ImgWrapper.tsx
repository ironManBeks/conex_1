import { FC } from "react";
import cn from "classnames";
import Image from "next/image";
import { isFunction } from "lodash";

import { TImgWrapper } from "./types";

const ImgWrapper: FC<TImgWrapper> = (props) => {
    const {
        imageClassName,
        onWrapperClick,
        wrapperClassName,
        width,
        height,
        isTypeWebp,
        ...rest
    } = props;
    return (
        <div
            className={cn("img-custom_wrapper", wrapperClassName)}
            onClick={(e) => {
                if (isFunction(onWrapperClick)) {
                    onWrapperClick(e);
                }
            }}
            style={{
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
            }}
        >
            <Image
                {...rest}
                className={cn("img-custom_image", imageClassName)}
                layout="fill"
                width={isTypeWebp ? undefined : width}
                height={isTypeWebp ? undefined : height}
            />
        </div>
    );
};

export default ImgWrapper;
