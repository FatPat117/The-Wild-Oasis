import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
const StyledApp = styled.div`
        background-color: orangered;
        padding: 20px;
`;

function App() {
        return (
                <>
                        <GlobalStyle />
                        <StyledApp>
                                <Heading as="h1">The Wild Oasis</Heading>
                                <Heading as="h2">Check in and out</Heading>
                                <Button onClick={() => alert("Check in")}>Check in</Button>
                                <Button onClick={() => alert("Check out")}>Check out</Button>

                                <Heading as="h3">Form</Heading>
                                <Input type="number" placeholder="Number of guests"></Input>
                        </StyledApp>
                </>
        );
}

export default App;
