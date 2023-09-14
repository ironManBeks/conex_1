import { FC } from "react";

import { Layout } from "@components/segments/Layout";
import { H4 } from "@components/Text";
import Container from "@components/globalComponents/Container";
import ContactUsForm from "./components/ContactUsForm";
import ContactUsContacts from "./components/ContactUsContacts";
import ContactUsHead from "./components/ContactUsHead";
import ContactUsMap from "@components/pages/ContactUsPage/components/ContactUsMap";

const ContactUsPage: FC = () => {
    const classPrefix = "contact-us-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container flexDirection="column">
                <ContactUsHead pageClassPrefix={classPrefix} />
                <div className={`${classPrefix}_content`}>
                    <ContactUsMap pageClassPrefix={classPrefix} />
                    <ContactUsForm pageClassPrefix={classPrefix} />
                </div>
                <ContactUsContacts pageClassPrefix={classPrefix} />
            </Container>
        </Layout>
    );
};

export default ContactUsPage;
