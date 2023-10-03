import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { inject, observer } from "mobx-react";

import Container from "@components/globalComponents/Container";
import { P } from "@components/Text";

import { PATH_POLICY_PAGE, PATH_TERMS_PAGE } from "@consts/pathsConsts";
import { TFooter } from "./types";

const Footer: FC<TFooter> = inject("store")(
    observer(({ pageClassPrefix, className }) => {
        const classPrefix = `footer`;

        return (
            <footer
                className={cn(
                    `${classPrefix}_wrapper`,
                    `${pageClassPrefix}_${classPrefix}__wrapper`,
                    className,
                )}
            >
                <div className={cn(`${classPrefix}_inner-wrapper`)}>
                    <Container
                        flexDirection="row"
                        flexJustifyContent="space-between"
                    >
                        <div>
                            <P>
                                <Link href={PATH_POLICY_PAGE}>
                                    Privacy Policy
                                </Link>
                            </P>
                            <P>
                                <Link href={PATH_TERMS_PAGE}>
                                    Terms and conditions for purchasing services
                                    on the website
                                </Link>
                            </P>
                        </div>
                    </Container>
                </div>
            </footer>
        );
    }),
);

export default Footer;
