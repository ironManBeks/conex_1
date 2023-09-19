import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";
import { H1, H2, P } from "@components/Text";

const PolicyPage = () => {
    const classPrefix = "policy-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <div style={{ padding: "10vh 0" }}>
                    <H1 style={{ marginBottom: "30px" }}>PolicyPage</H1>
                    <H2 style={{ marginBottom: "30px" }}>Subtitle</H2>
                    <P>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores dolore, eaque, excepturi
                        exercitationem, fuga minima quae repudiandae saepe sint
                        soluta totam unde. Cupiditate dignissimos eius in n
                    </P>
                    <P>
                        ecessitatibus officiis quibusdam quis tempore
                        voluptatibus? Accusamus aliquam, at dicta dolor ea
                        eligendi fugiat fugit illo impedit in laudantium,
                        molestiae nulla, officiis quae quam temporibus totam
                        voluptatem. Ab accusamus aliquid architecto aut,
                        consectetur corporis dolorem enim eos illum maxime modi
                        molestias natus nisi nulla numquam, perspiciatis quae
                        quia quos rem reprehenderit repudiandae saepe sint?
                        Adipisci dicta, dolor eligendi est eveniet, ipsum modi
                        molestias natus nemo non nostrum obcaecati omnis
                        pariatur, porro quaerat quas sunt.
                    </P>
                </div>
            </Container>
        </Layout>
    );
};

export default PolicyPage;
