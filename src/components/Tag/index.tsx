import cn from "classnames";
import Image from "next/image";
import { FC, PropsWithChildren } from "react";

interface TagProps {
    size?: "small";
    isActive?: boolean;
    isPlusIcon?: boolean;
    isCloseIcon?: boolean;
    containerClassName?: boolean;
    onPlusIconClick?: () => void;
    onCloseIconClick?: () => void;
}

const Tag: FC<PropsWithChildren<TagProps>> = ({
    children,
    size,
    isActive,
    isCloseIcon,
    isPlusIcon,
    containerClassName,
    onPlusIconClick,
    onCloseIconClick,
}) => {
    const classPrefix = size ? `tag_${size}` : "tag";

    return (
        <div
            className={cn(classPrefix, containerClassName, {
                active: isActive,
            })}
        >
            {isPlusIcon && (
                <div
                    onClick={onPlusIconClick}
                    className={`${classPrefix}__icon-container plus-icon`}
                >
                    <Image
                        alt="plus curcle icon"
                        src="/icons/plus-circle.svg"
                        fill
                    />
                </div>
            )}
            <div>{children}</div>
            {isCloseIcon && (
                <div
                    onClick={onCloseIconClick}
                    className={`${classPrefix}__icon-container close-icon`}
                >
                    <Image alt="plus circle icon" src="/icons/close.svg" fill />
                </div>
            )}
        </div>
    );
};

export default Tag;
