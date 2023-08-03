import { FC } from "react";
import { Progress } from "antd";
import cn from "classnames";

import { TProgressWrapper } from "./types";

const ProgressWrapper: FC<TProgressWrapper> = (props) => {
    const { wrapperClassPrefix, showInfo = false, ...rest } = props;
    const content = (
        <Progress
            {...rest}
            showInfo={showInfo}
            className={cn(props.className, "common-progress")}
        />
    );

    return wrapperClassPrefix ? (
        <div className={cn(`${wrapperClassPrefix}_progress__wrapper`)}>
            {content}
        </div>
    ) : (
        content
    );
};

export default ProgressWrapper;
