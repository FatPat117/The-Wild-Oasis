import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";
export function useLogout() {
        const queryClient = useQueryClient();
        const navigate = useNavigate();

        const { mutate: logout, isLoading } = useMutation({
                mutationFn: () => logoutAPI(),
                onSuccess: () => {
                        toast.success("Logout successfully");
                        queryClient.removeQueries();
                        navigate("/login", { replace: true });
                },
                onError: (err) => {
                        toast.error(err);
                },
        });
        return { logout, isLoading };
}
