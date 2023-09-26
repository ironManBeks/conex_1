import { FC } from "react";
import { Spin } from "antd";

import { TSectionTypes } from "@globalTypes/sectionTypes";

const AccountLoader: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}_loader`}>
            <Spin size="large" />
        </div>
    );
};

export default AccountLoader;
