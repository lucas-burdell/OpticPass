import React from "react";
import ReactDOM from "react-dom";
import createHmac from "create-hmac";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-content: center;
    text-align: center;
`;

const ContentContainer = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    margin: 0 20vw;
`;

const App: React.FunctionComponent = () => {
    const [password, setPassword] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [increment, setIncrement] = React.useState("0");
    const clipboard = React.useRef<HTMLTextAreaElement>();

    const calculate = React.useCallback((password, subject, increment) => {
        const hmac = createHmac("sha1", "password");
        hmac.update("synchronous write");
        hmac.write(subject);
        hmac.write(increment);
        const result = hmac.digest().toString("base64");
        if (clipboard.current) {
            clipboard.current.textContent = result;
            clipboard.current.select();
            clipboard.current.setSelectionRange(0, 99999);
            document.execCommand("copy");
            toast.success("Result copied!");
        }
    }, []);

    return (
        <Container
            style={{
                display: "flex",
                alignContent: "center",
                textAlign: "center"
            }}
        >
            <ToastContainer />
            <ContentContainer
                style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    padding: "min(10%, 10px)"
                }}
            >
                <h3>Password</h3>
                <input
                    type="password"
                    name="password"
                    autoComplete="false"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <h3>Subject</h3>
                <input
                    type="text"
                    name="subject"
                    autoComplete="false"
                    placeholder="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
                <h3>Increment</h3>
                <input
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
                >
                    Execute and Copy
                </button>
            </ContentContainer>
            <textarea
                style={{
                    width: "0px",
                    height: "0px",
                    opacity: "0",
                    borderWidth: "0px"
                }}
                ref={clipboard}
            />
        </Container>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
