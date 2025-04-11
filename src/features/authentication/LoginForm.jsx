import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
function LoginForm() {
        const [email, setEmail] = useState("phat@gmail.com");
        const [password, setPassword] = useState("123456");
        const { login, isLoading } = useLogin();

        if (isLoading) return <Spinner />;
        function handleSubmit(e) {
                e.preventDefault();
                if (!email || !password) return;
                login({ email, password });
        }

        return (
                <Form onSubmit={handleSubmit}>
                        <FormRowVertical label="Email address">
                                <Input
                                        type="email"
                                        id="email"
                                        // This makes this form better for password managers
                                        autoComplete="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                />
                        </FormRowVertical>
                        <FormRowVertical label="Password">
                                <Input
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                />
                        </FormRowVertical>
                        <FormRowVertical>
                                <Button size="large" disabled={isLoading}>
                                        {!isLoading ? "Login" : <SpinnerMini />}
                                </Button>
                        </FormRowVertical>
                </Form>
        );
}

export default LoginForm;
