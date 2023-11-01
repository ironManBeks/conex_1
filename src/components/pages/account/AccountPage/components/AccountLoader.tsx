import { FC } from "react";

import Spin from "@components/globalComponents/Spin";

import { TSectionTypes } from "@globalTypes/sectionTypes";

const AccountLoader: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    return (
        <div className={`${pageClassPrefix}_loader`}>
            <Spin size="large" />
        </div>
    );
};

export default AccountLoader;
