import Container from "@components/globalComponents/Container";
import { Layout } from "@components/segments/Layout";

const TermsPage = () => {
    const classPrefix = "terms-page";
    return (
        <Layout pageClassPrefix={classPrefix}>
            <Container>
                <div style={{ padding: "10vh 0" }}>
                    <h1>Heading 1</h1>
                    <h2>Heading 2</h2>
                    <h3>Heading 3</h3>
                    <h4>Heading 4</h4>
                    <h5>Heading 5</h5>
                    <h6>Heading 6</h6>
                    <p>paragraph</p>
                    <div>
                        <b>bold</b> <i>italics</i>
                    </div>
                    <ul>
                        <li>List item 1</li>
                        <li>List item 2</li>
                        <li>List item 3</li>
                    </ul>
                    <ol>
                        <li>List item 1</li>
                        <li>List item 2</li>
                        <li>List item 3</li>
                    </ol>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Asperiores dolore, eaque, excepturi
                        exercitationem, fuga minima quae repudiandae saepe sint
                        soluta totam unde. Cupiditate dignissimos eius in n
                    </p>
                    <p>
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
                    </p>
                </div>
            </Container>
        </Layout>
    );
};

export default TermsPage;
