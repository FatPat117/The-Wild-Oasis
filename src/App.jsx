import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import GlobalStyle from "./styles/GlobalStyle";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";

const queryCilent = new QueryClient({
        defaultOptions: {
                queries: {
                        staleTime: 60 * 1000,
                },
        },
});

function App() {
        return (
                <QueryClientProvider client={queryCilent}>
                        <ReactQueryDevtools initialIsOpen={false} />
                        <GlobalStyle />
                        <BrowserRouter>
                                <Routes>
                                        <Route element={<AppLayout />}>
                                                <Route index element={<Navigate replace to="dashboard" />} />
                                                <Route path="dashboard" element={<Dashboard />} />
                                                <Route path="bookings" element={<Bookings />} />
                                                <Route path="account" element={<Account />} />
                                                <Route path="cabins" element={<Cabins />} />
                                                <Route path="settings" element={<Settings />} />
                                                <Route path="users" element={<Users />} />
                                        </Route>
                                        <Route path="login" element={<Login />} />
                                        <Route path="*" element={<PageNotFound />} />
                                </Routes>
                        </BrowserRouter>
                </QueryClientProvider>
        );
}

export default App;
