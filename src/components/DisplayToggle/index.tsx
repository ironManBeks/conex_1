import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { commonDisplayToggleClassPrefix, displayIcons } from "./const";
import Image from "next/image";
import { TDisplayIcon, TDisplayValue } from "./types";

interface DisplayToggleProps extends React.HTMLAttributes<HTMLDivElement> {
    onIconClick: (value: TDisplayValue) => void;
    display?: TDisplayValue;
    icons?: TDisplayIcon[];
}

const DisplayToggle: FC<DisplayToggleProps> = ({
    display,
    onIconClick,
    className,
    icons = displayIcons,
    ...props
}) => {
    const [currentDisplay, setCurrentDisplay] = useState(icons[0].value);

    const onIconContainerClick = (value: TDisplayValue) => {
        onIconClick(value);
        setCurrentDisplay(String(value));
    };

    useEffect(() => {
        if (display) setCurrentDisplay(display);
    }, [display]);

    return (
        <div
            className={cn(commonDisplayToggleClassPrefix, className)}
            {...props}
        >
            {icons.map(({ imgAlt, imgSrc, value }) => (
                <div
                    className={cn(
                        `${commonDisplayToggleClassPrefix}__icon-container`,
                        { active: currentDisplay === value },
                    )}
                    onClick={() => onIconContainerClick(value)}
                >
                    <Image alt={imgAlt} src={imgSrc} width={24} height={24} />
                </div>
            ))}
        </div>
    );
};

export default DisplayToggle;
