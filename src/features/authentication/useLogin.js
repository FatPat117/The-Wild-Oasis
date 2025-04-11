import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";
export function useLogin() {
        const queryClient = useQueryClient();
        const navigate = useNavigate();

        const { mutate: login, isLoading } = useMutation({
                mutationFn: ({ email, password }) => loginAPI({ email, password }),
                onSuccess: (user) => {
                        toast.success("Login successfully");
                        queryClient.setQueryData(["user"], user.user);
                        navigate("/", { replace: true });
                },
                onError: (err) => {
                        toast.error("Login failed");
                },
        });
        return { login, isLoading };
}
