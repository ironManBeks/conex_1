import { FC } from "react";
import { observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import SearchList from "./components/SearchList";
import SearchFilter from "./components/SearchFilter";

const SearchPage: FC = observer(() => {
    const classPrefix = "search-page";

    return (
        <Layout pageClassPrefix={classPrefix}>
            <div className={`${classPrefix}_wrapper`}>
                <div className={`${classPrefix}_inner-wrapper`}>
                    <Container>
                        <SearchList pageClassPrefix={classPrefix} />
                        <SearchFilter pageClassPrefix={classPrefix} />
                    </Container>
                </div>
            </div>
        </Layout>
    );
});
export default SearchPage;
