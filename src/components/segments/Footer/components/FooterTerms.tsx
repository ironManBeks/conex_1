import { FC } from "react";
import Link from "next/link";

import { P } from "@components/Text";
import Container from "@components/globalComponents/Container";

import { PATH_POLICY_PAGE, PATH_TERMS_PAGE } from "@consts/pathsConsts";

const FooterTerms: FC<{ wrapperClassPrefix: string }> = ({
    wrapperClassPrefix,
}) => {
    const classPrefix = `${wrapperClassPrefix}_terms`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <Container>
                <P>
                    <Link href={PATH_POLICY_PAGE}>Privacy Policy</Link>
                </P>
                <P>
                    <Link href={PATH_TERMS_PAGE}>
                        Terms and conditions for purchasing services on the
                        website
                    </Link>
                </P>
            </Container>
        </div>
    );
};

export default FooterTerms;
