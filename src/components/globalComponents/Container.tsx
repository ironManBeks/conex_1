import { FC } from "react";
import cn from "classnames";

import { TContainer } from "./types";

const Container: FC<TContainer> = ({
    children,
    className,
    innerIndent = false,
    flexWrap,
    flexDirection,
    flexJustifyContent,
    flexAlignItems,
}) => {
    const containerStyles = {
        flexWrap: flexWrap,
        flexDirection: flexDirection,
        justifyContent: flexJustifyContent,
        alignItems: flexAlignItems,
    };

    return (
        <div
            className={cn("container", className)}
            style={innerIndent ? undefined : containerStyles}
        >
            {innerIndent ? (
                <div className="row" style={containerStyles}>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Container;
