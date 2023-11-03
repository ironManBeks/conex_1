import Spin from "@components/globalComponents/Spin";

import { ACCOUNT_CLASSPREFIX } from "../consts";

const AccountLoader = () => {
    return (
        <div className={`${ACCOUNT_CLASSPREFIX}_loader`}>
            <Spin size="large" />
        </div>
    );
};

export default AccountLoader;
