import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import { H2, H3, P } from "@components/Text";
import ButtonLink from "@components/buttons/ButtonLink";

import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import { EButtonColor } from "@components/buttons/types";
import Container from "@components/globalComponents/Container";

const ErrorPage: FC = () => {
    const classPrefix = "error-page";

    return (
        <Layout pageClassPrefix="error-page">
            <div className={`${classPrefix}_wrapper`}>
                <div className={`${classPrefix}_inner-wrapper`}>
                    <Container flexJustifyContent="center">
                        <div className={`${classPrefix}_content__wrapper`}>
                            <H2>404</H2>
                            <H3>Page not found</H3>
                            <P>
                                You may have used an invalid link or the page
                                has been removed. You can return to the main
                                page.
                            </P>
                            <div className={`${classPrefix}_content__actions`}>
                                <ButtonLink
                                    href={PATH_HOME_PAGE}
                                    color={EButtonColor.primary}
                                >
                                    Home page
                                </ButtonLink>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </Layout>
    );
};

export default ErrorPage;
