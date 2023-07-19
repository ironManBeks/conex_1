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
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <Image
                {...rest}
                className={cn("img-custom_image", imageClassName)}
                layout="fill"
                width={width}
                height={height}
            />
        </div>
    );
};

export default ImgWrapper;
