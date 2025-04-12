import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupAPI } from "../../services/apiAuth";

export function useSignup() {
        const { mutate: signup, isLoading } = useMutation({
                mutationFn: ({ fullName, email, password }) => signupAPI({ fullName, email, password }),
                onSuccess: (user) => {
                        toast.success(
                                "Sign up successfully, Please verify the new account from the user's email address"
                        );
                },
                onError: (err) => {
                        toast.error(err.message);
                },
        });
        return { signup, isLoading };
}
