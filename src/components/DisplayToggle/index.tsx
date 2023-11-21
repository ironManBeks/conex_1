import { FC } from "react";
import cn from "classnames";

import { commonDisplayToggleClassPrefix, displayIcons } from "./const";
import Image from "next/image";
import { TDisplayIcon } from "./types";

interface DisplayToggleProps extends React.HTMLAttributes<HTMLDivElement> {
    display: "row" | "grid";
    onIconClick: (value: string | number) => void;
    icons?: TDisplayIcon[];
}

const DisplayToggle: FC<DisplayToggleProps> = ({
    display,
    onIconClick,
    className,
    icons = displayIcons,
    ...props
}) => {
    return (
        <div
            className={cn(commonDisplayToggleClassPrefix, className)}
            {...props}
        >
            {icons.map(({ imgAlt, imgSrc, value }) => (
                <div
                    className={cn(
                        `${commonDisplayToggleClassPrefix}__icon-container`,
                        { active: display === value },
                    )}
                    onClick={() => onIconClick(value)}
                >
                    <Image alt={imgAlt} src={imgSrc} width={24} height={24} />
                </div>
            ))}
        </div>
    );
};

export default DisplayToggle;
