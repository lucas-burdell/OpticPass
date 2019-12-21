import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { createGlobalStyle } from "styled-components";
import { Hash } from "./Hash";
import { useClipboard } from "Clipboard";
import { RegisterWorker } from "./RegisterWorker";
RegisterWorker();

const Container = styled.div`
    display: flex;
    align-content: center;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: min(25em, 50vw);
    padding: min(10%, 10px);
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0px;
    }
    * {
        box-sizing: border-box;
    }
`;

const Label = styled.h4`
    margin: 0px;
    margin-top: 0.5em;
`;

const Input = styled.input`
    min-width: 10em;
    max-width: 25em;
`;

const App: React.FunctionComponent = () => {
    const [password, setPassword] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [increment, setIncrement] = React.useState("");
    const [ClipboardArea, copy] = useClipboard({
        resize: "none",
        maxWidth: "25em"
    });

    const calculate = React.useCallback((password, subject, increment) => {
        const result = Hash(password, subject, increment);
        copy(result);
        toast.success("Result copied!");
    }, []);

    return (
        <Container>
            <GlobalStyle />
            <ToastContainer />
            <ContentContainer>
                <Label>Password</Label>
                <Input
                    type="password"
                    name="password"
                    autoComplete="false"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Label>Subject</Label>
                <Input
                    type="text"
                    name="subject"
                    autoComplete="false"
                    placeholder="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <Label>Increment</Label>
                <Input
                    type="text"
                    name="increment"
                    autoComplete="false"
                    placeholder="increment"
                    value={increment}
                    onChange={(e) => setIncrement(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => calculate(password, subject, increment)}
                    style={{
                        minWidth: "10em",
                        maxWidth: "25em",
                        borderRadius: "5px",
                        backgroundColor: "#0072bd",
                        color: "white",
                        border: "none",
                        margin: "1em 0px",
                        padding: "1em 1em"
                    }}
                >
                    Execute and Copy
                </button>
                <Label>Result</Label>
                <ClipboardArea />
            </ContentContainer>
        </Container>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
