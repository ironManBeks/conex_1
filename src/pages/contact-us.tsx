import React from "react";

import HeadMeta from "@components/segments/HeadMeta";
import ContactUsPage from "@components/pages/ContactUsPage";

const ContactUsPageLayout: React.FC = () => {
    return (
        <>
            <HeadMeta title="Contact us" />
            <ContactUsPage />
        </>
    );
};

export default ContactUsPageLayout;
