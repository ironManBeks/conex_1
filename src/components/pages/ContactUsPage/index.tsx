import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import Container from "@components/globalComponents/Container";
import { H2, P } from "@components/Text";
import ContactUsForm from "@components/pages/ContactUsPage/components/ContactUsForm";
import ContactUsContacts from "@components/pages/ContactUsPage/components/ContactUsContacts";

const ContactUsPage: FC = () => {
    const classPrefix = "contact-us-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">
                <div className={`${classPrefix}_content`}>
                    <ContactUsContacts pageClassPrefix={classPrefix} />
                    <ContactUsForm pageClassPrefix={classPrefix} />
                </div>
            </Container>
        </Layout>
    );
};

export default ContactUsPage;
