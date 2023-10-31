import { MutableRefObject, useEffect, useMemo, useState } from "react";

interface IElementSize {
    width: number | undefined;
    height: number | undefined;
}

type TResponse = {
    size: IElementSize;
};

interface IElementSizeConfig {
    ref: MutableRefObject<HTMLElement | null>;
}

export const useElementSize = (config: IElementSizeConfig): TResponse => {
    const [size, setSize] = useState<IElementSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        if (config?.ref?.current && document.body) {
            const values = config?.ref.current.getBoundingClientRect();
            setSize({
                width: values.width,
                height: values.height,
            });
        }
    }, [config.ref]);

    return useMemo(() => ({ size }), [size]);
};
