import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetUser } from "../features/authentication/useGetUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
        height: 100vh;
        background-color: var(--color-grey-50);
        display: flex;
        align-items: center;
        justify-content: center;
`;

function ProtectedRoute({ children }) {
        const navigate = useNavigate();

        // 1. Load the authenticated user
        const { user, isLoading, isAuthenticated } = useGetUser();

        // 3. If there is NO authenticated user, redirect to the /login
        useEffect(
                function () {
                        if (!isAuthenticated && !isLoading) navigate("/login");
                },
                [isAuthenticated, isLoading, navigate]
        );

        // 2. While loading, show a spinner
        if (isLoading)
                return (
                        <FullPage>
                                <Spinner />
                        </FullPage>
                );

        // 4 If there is a user, render the app

        if (isAuthenticated) return children;
}

export default ProtectedRoute;
