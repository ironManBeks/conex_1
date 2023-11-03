import { FC } from "react";
import cn from "classnames";
import { inject, observer } from "mobx-react";

import Container from "@components/globalComponents/Container";
import FooterTerms from "./components/FooterTerms";

import NewsSubscription from "@components/globalComponents/NewsSubscription";
import FooterContacts from "./components/FooterContacts";
import FooterNavs from "./components/FooterNavs";

import { TFooterProps } from "./types";

const Footer: FC<TFooterProps> = inject("store")(
    observer(({ pageClassPrefix, className, isFullFooter = false }) => {
        const classPrefix = `footer`;

        return (
            <footer
                className={cn(
                    `${classPrefix}_wrapper`,
                    `${pageClassPrefix}_${classPrefix}__wrapper`,
                    className,
                )}
            >
                {isFullFooter && (
                    <>
                        <NewsSubscription />
                        <div className={cn(`${classPrefix}_content__wrapper`)}>
                            <Container
                                flexDirection="row"
                                flexJustifyContent="space-between"
                            >
                                <FooterContacts
                                    wrapperClassPrefix={classPrefix}
                                />
                                <FooterNavs wrapperClassPrefix={classPrefix} />
                            </Container>
                        </div>
                    </>
                )}
                <FooterTerms wrapperClassPrefix={classPrefix} />
            </footer>
        );
    }),
);

export default Footer;
