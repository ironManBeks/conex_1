import { MutableRefObject, useEffect, useMemo, useState } from "react";

interface IElementPosition {
    left: number | undefined;
    right: number | undefined;
    top: number | undefined;
    bottom: number | undefined;
}

type TResponse = {
    position: IElementPosition;
};

interface IElementSizeConfig {
    ref: MutableRefObject<HTMLElement | null>;
}

export const useElementPosition = (config: IElementSizeConfig): TResponse => {
    const [position, setPosition] = useState<IElementPosition>({
        left: undefined,
        right: undefined,
        top: undefined,
        bottom: undefined,
    });

    useEffect(() => {
        if (config?.ref?.current && document.body) {
            const values = config?.ref.current.getBoundingClientRect();
            setPosition({
                top: values.top,
                bottom: values.bottom,
                left: values.left,
                right: values.right,
            });
        }
    }, [config.ref]);

    return useMemo(() => ({ position }), [position]);
};
