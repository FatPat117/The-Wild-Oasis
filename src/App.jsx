import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";
const StyledApp = styled.div`
        /* background-color: orangered; */
        padding: 20px;
`;

function App() {
        return (
                <>
                        <GlobalStyle />
                        <StyledApp>
                                <Row type="vertical">
                                        <Row type="horizontal">
                                                <Heading as="h1">The Wild Oasis</Heading>
                                                <div>
                                                        <Heading as="h2">Check in and out</Heading>
                                                        <Button
                                                                variation="primary"
                                                                size="medium"
                                                                onClick={() => alert("Check in")}
                                                        >
                                                                Check in
                                                        </Button>
                                                        <Button
                                                                variation="secondary"
                                                                size="small"
                                                                onClick={() => alert("Check out")}
                                                        >
                                                                Check out
                                                        </Button>
                                                </div>
                                        </Row>
                                        <Row type="vertical">
                                                <Heading as="h3">Form</Heading>
                                                <form>
                                                        <Input type="number" placeholder="Number of guests"></Input>
                                                        <Input type="number" placeholder="Number of guests"></Input>
                                                </form>
                                        </Row>
                                </Row>
                        </StyledApp>
                </>
        );
}

export default App;
