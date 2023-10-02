import { FC } from "react";
import { observer } from "mobx-react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import { H2 } from "@components/Text";
import SearchList from "./components/SearchList";
import SearchRequest from "./components/SearchRequest";

const SearchPage: FC = observer(() => {
    const classPrefix = "search-page";

    return (
        <Layout pageClassPrefix={classPrefix}>
            <div className={`${classPrefix}_wrapper`}>
                <div className={`${classPrefix}_inner-wrapper`}>
                    <Container flexDirection="column">
                        <H2 className={`${classPrefix}_title`}>
                            Search results
                        </H2>
                        <SearchList pageClassPrefix={classPrefix} />
                        <SearchRequest pageClassPrefix={classPrefix} />
                    </Container>
                </div>
            </div>
        </Layout>
    );
});
export default SearchPage;
