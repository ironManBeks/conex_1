import cn from "classnames";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import AccountInfo from "./components/AccountInfo";
import AccountOrder from "./components/AccountOrder";


const AccountPage = () => {
    const classPrefix = "account-page";

    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <div className={cn(`${classPrefix}_content__wrapper`)}>
                    <AccountInfo pageClassPrefix={classPrefix} />
                    <AccountOrder pageClassPrefix={classPrefix} />
                </div>
            </Container>
        </Layout>
    );
};

export default AccountPage;
